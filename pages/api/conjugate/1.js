import conn from "../../../lib/db";
import { getAuthUserId } from "../../../lib/auth";
import { Role } from "../../../lib/constants";
import { errorResponse } from "../../../lib/errorResponse";

export default function handler(req, res) {
    const accessTo = Role.Admin;
    const query = `select * from conjugations order by random() limit 1`;
    getAuthUserId(req.headers.token, accessTo)
        .then(() => conn.query(query))
        .then(result => res.status(200).json(result.rows[0].data))
        .catch(err => errorResponse(err, res));
}