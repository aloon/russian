// excepciones: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

import conn from "../../../lib/db";

class AuthError extends Error {
    constructor(message, options) {
        super(message, options);
    }
}

const Role = {
    Gamer: 0,
    Admin: 1
}

async function getUserId(token) {
    return new Promise((resolve, rejection) => {
        const jwt = require('jsonwebtoken');
        const jwtPassw = (process.env.NODE_ENV == "production") ? process.env["JWT_PASSW"] : "XXX";
        jwt.verify(token, jwtPassw, function (err, decoded) {
            if (err) {
                rejection(new AuthError("Wrong token", { status: 401 }));
            }
            resolve(decoded.userId);
        });
    });
}

async function checkAuth(token, role) {
    const userId = await getUserId(token);
    const queryUser = `select * from users where id=$1`;
    return conn.query(queryUser, [userId])
        .then(result => {
            if (result.rows.length == 0) {
                throw new AuthError("Wrong password", { status: 401 });
            } else {
                const user_type_id = result.rows[0].user_type_id;
                if (user_type_id < role) {
                    throw new AuthError("Wrong role", { status: 401 });
                }
            }
        })
}

export default function handler(req, res) {
    const accessTo = Role.Admin;
    checkAuth(req.headers.token, accessTo)
        .then(() => conn.query("select * from categories"))
        .then(result => res.status(200).json(result.rows.map((w) => { return { "id": w.id, "word": w.name } })))
        .catch(err => {
            if (err instanceof AuthError) {
                return res.status(401).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        });
}