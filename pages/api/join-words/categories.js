import conn from "../../../lib/db";
import { getAuthUserId } from "../../../lib/auth";
import { Role } from "../../../lib/constants";
import { errorResponse } from "../../../lib/errorResponse";

export default function handler(req, res) {
    const accessTo = Role.Gamer;
    getAuthUserId(req.headers.token, accessTo)
        .then(() => conn.query("select * from categories where active=1"))
        .then(result => res.status(200).json(result.rows.map(w => ({ "id": w.id, "word": w.name }))))
        .catch(err => errorResponse(err, res));
}