import conn from "../../../lib/db";

export default function handler(req, res) {
    const limit = 5;
    const queryWords = `
    select * from join_words
    where category_id=44
    ORDER BY RANDOM ()
    limit ${limit}`;
    if (req.method == "GET") {
        conn.query(queryWords, (err, result) => {
            const results = Array.from({ length: 2 }, (x, i) => {
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