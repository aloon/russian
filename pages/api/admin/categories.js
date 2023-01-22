import conn from "../../../lib/db";
import { getAuthUserId } from "../../../lib/auth";
import { Role } from "../../../lib/constants";
import { errorResponse } from "../../../lib/errorResponse";

export default function handler(req, res) {
    const accessTo = Role.Admin;
    const queryAllCats = `select c.id,c.name,c.active, sum(case when jw.category_id is null then 0 else 1 end) as counts
from categories as c
left join join_words as jw 
on c.id=jw.category_id
group by c.id,c.name,c.active
order by c.id `;
    getAuthUserId(req.headers.token, accessTo)
        .then(() => {
            if (req.method == "POST") {
                const query = `insert into categories (name) values ($1)`;
                return conn.query(query, [req.body.word])
            } else if (req.method == "PUT") {
                const query = `update categories set active=$1 where id=$2`;
                return conn.query(query, [req.body.active ? 1 : 0, req.body.catId])
            }
            return Promise.resolve();
        }).then(() => conn.query(queryAllCats))
        .then(result => res.status(200).json(result.rows.map((w) => ({ id: w.id, word: w.name, counts: w.counts, active: w.active == 1 }))))
        .catch(err => errorResponse(err, res));
}
