import conn from "../../../lib/db";

export default function handler(req, res) {
    if (req.method == "POST" || req.method == "GET") {

        if (req.method == "POST") {
            const query = `insert into categories (name) values ($1)`;
            conn.query(query, [req.body.word], (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
        const query2 = `select * from categories `;
        conn.query(query2, (err, result) => {
            res.status(200).json(result.rows.map((w) => w.name))
        });
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}