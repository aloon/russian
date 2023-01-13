import conn from "../../../lib/db";
import { getAuthUserId, AuthError } from "../../../lib/auth";
import { Role } from "../../../lib/constants";

export default function handler(req, res) {
    const accessTo = Role.Admin;
    const query = `select * from categories where id = $1`;
    const catId = req.query.cat;
    getAuthUserId(req.headers.token, accessTo)
        .then(() => conn.query(query, [catId]))
        .then(result => res.status(200).json({ data: result.rows[0].name }))
        .catch(err => {
            if (err instanceof AuthError) {
                return res.status(401).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        });
}