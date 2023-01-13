import conn from "../../../lib/db";
import { getAuthUserId, AuthError } from "../../../lib/auth";
import { Role } from "../../../lib/constants";

export default function handler(req, res) {
    const accessTo = Role.Admin;
    const queryAllCats = `select c.id,c.name, sum(case when jw.category_id is null then 0 else 1 end) as counts
from categories as c
left join join_words as jw 
on c.id=jw.category_id
group by c.id,c.name 
order by c.id `;
    getAuthUserId(req.headers.token, accessTo)
        .then(() => {
            if (req.method == "POST") {
                const query = `insert into categories (name) values ($1)`;
                return conn.query(query, [req.body.word])
            }
            return Promise.resolve();
        }).then(() => conn.query(queryAllCats))
        .then(result => res.status(200).json(result.rows.map((w) => { return { "id": w.id, "word": w.name, "counts": w.counts } })))
        .catch(err => {
            if (err instanceof AuthError) {
                return res.status(401).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        });
}
