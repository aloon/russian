import conn from "../../../lib/db";
import { getAuthUserId } from "../../../lib/auth";
import { Role } from "../../../lib/constants";
import { errorResponse } from "../../../lib/errorResponse";

export default function handler(req, res) {
    const accessTo = Role.Admin;
    const query = `select * from categories where id = $1`;
    const catId = req.query.cat;
    getAuthUserId(req.headers.token, accessTo)
        .then(() => conn.query(query, [catId]))
        .then(result => res.status(200).json({ data: result.rows[0].name }))
        .catch(err => errorResponse(err, res));
}