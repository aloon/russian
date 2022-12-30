import conn from "../../../lib/db";

export default function handler(req, res) {
    const queryAllWords = `select * from join_words where category_id=$1 `;
    const catId = req.query.cat;
    if (req.method == "POST") {
        const query = `insert into join_words (word1,word2,category_id) values ($1,$2,$3)`;
        conn.query(query, [req.body.word1, req.body.word2, catId], (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            conn.query(queryAllWords, [catId], (err, result) => {
                return res.status(200).json(result.rows.map((w) => { return { "word1": w.word1, "word2": w.word2 } }));
            })
        });
    } else if (req.method == "GET") {
        conn.query(queryAllWords, [catId], (err, result) => {
            return res.status(200).json(result.rows.map((w) => { return { "word1": w.word1, "word2": w.word2 } }));
        })
    }
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}