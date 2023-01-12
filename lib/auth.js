import conn from "./db";

export class AuthError extends Error {
    constructor(message, options) {
        super(message, options);
    }
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

export const getAuthUserId = async function (token, role) {
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
            return userId;
        })
}

//export default checkAuth;