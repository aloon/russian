import conn from "../../../lib/db";
import { getAuthUserId } from "../../../lib/auth";
import { Role } from "../../../lib/constants";
import { errorResponse } from "../../../lib/errorResponse";

export default function handler(req, res) {
    const accessTo = Role.Admin;
    const queryAllWords = `select * from join_words where category_id=$1 `;
    const catId = req.query.cat;
    getAuthUserId(req.headers.token, accessTo)
        .then(() => {
            if (req.method == "POST") {
                const query = `insert into join_words (word1,word2,category_id) values ($1,$2,$3)`;
                return conn.query(query, [req.body.word1, req.body.word2, catId])
            } else if (req.method == "DELETE") {
                const query = `delete from join_words where id=$1`;
                return conn.query(query, [req.query.id])
            }
            return Promise.resolve();
        })
        .then(() => conn.query(queryAllWords, [catId]))
        .then(result => res.status(200).json(result.rows.map((w) => { return { "word1": w.word1, "word2": w.word2, "id": w.id } })))
        .catch(err => errorResponse(err, res));
}