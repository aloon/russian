import conn from "../../../lib/db";
import { getAuthUserId } from "../../../lib/auth";
import { Role } from "../../../lib/constants";
import { errorResponse } from "../../../lib/errorResponse";

export default function handler(req, res) {
    const accessTo = Role.Admin;
    const queryAll = `select * from conjugations `;
    getAuthUserId(req.headers.token, accessTo)
        .then(() => {
            if (req.method == "POST") {
                const query = `insert into conjugations (data) values ($1)`;
                return conn.query(query, [req.body])
            } 
            return Promise.resolve();
        })
        .then(() => conn.query(queryAll))
        .then(result => res.status(200).json(result.rows.map(w =>  w.data )))
        .catch(err => errorResponse(err, res));
}