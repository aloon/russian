import conn from "../../../lib/db";

export default function handler(req, res) {
    const limit = 5;
    const queryWords = `
    select * from join_words
    where category_id=$1
    ORDER BY RANDOM ()
    limit ${limit}`;
    const catId = req.query.catId;
    if (req.method == "GET") {
        conn.query(queryWords, [catId], (err, result) => {
            const results = [0, 1].map((i) => {
                return result.rows.map((w) => {
                    return { "id": w.id, "word1": w.word1, "word2": w.word2 }
                }).map((w) => {
                    return { "id": w.id, "word": i == 0 ? w.word1 : w.word2 }
                })
            });

            return res.status(200).json(results);
        })
    }
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}