import { Role } from "../../../lib/constants";
import { errorResponse } from "../../../lib/errorResponse";
import conn from "../../../lib/db";
import { getAuthUserId } from "../../../lib/auth";


export default function handler(req, res) {
    // const generateUID = (length) => window
    //     .btoa(String.fromCharCode(...window.crypto.getRandomValues(new Uint8Array(length * 2))))
    //     .replace(/[+/]/g, "")
    //     .substring(0, length);

    const accessTo = Role.Admin;
    const queryUsers = `select * from users where user_type_id=0`;
    getAuthUserId(req.headers.token, accessTo)
        .then(() => {
            if (req.method == "POST") {
                const queryInsert = `insert into users (email,passwd,user_type_id) values ($1,md5($2),0)`;
                return conn.query(queryInsert, [req.body.email, req.body.passwd])
            } else if (req.method == "DELETE") {
                const queryDelete = `delete from users where id=$1`;
                return conn.query(queryDelete, [req.query.id])
            }
            return Promise.resolve();
        })
        .then(() => conn.query(queryUsers))
        .then(result => res.status(200).json(result.rows.map((w) => { return { "email": w.email, "id": w.id } })))
        .catch(err => errorResponse(err, res));
}
