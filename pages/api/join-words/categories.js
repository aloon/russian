import conn from "../../../lib/db";
import { checkAuth, AuthError } from "../../../lib/auth";
import { Role } from "../../../lib/constants";

export default function handler(req, res) {
    const accessTo = Role.Gamer;
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