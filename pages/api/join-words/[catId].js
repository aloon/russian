import conn from "../../../lib/db";
import { getAuthUserId, AuthError } from "../../../lib/auth";
import { Role } from "../../../lib/constants";

export default function handler(req, res) {
    const accessTo = Role.Gamer;
    const limit = 5;
    const queryWords = `
    select * from join_words
    where category_id=$1
    ORDER BY RANDOM ()
    limit ${limit}`;

    getAuthUserId(req.headers.token, accessTo)
        .then(() => conn.query(queryWords, [req.query.catId]))
        .then(result => [0, 1].map((i) => result.rows.map((w) => {
            return { "id": w.id, "word1": w.word1, "word2": w.word2 }
        }).map((w) => {
            return { "id": w.id, "word": i == 0 ? w.word1 : w.word2 }
        })))
        .then(results => res.status(200).json(results))
        .catch(err => {
            if (err instanceof AuthError) {
                return res.status(401).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        });
}