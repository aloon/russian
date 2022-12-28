import conn from "../../../lib/db";

export default function handler(req, res) {
    function allCategories() {
        const query = `select * from categories `;
        conn.query(query, (err, result) => {
            return result.rows.map((w) => w.name);
        })
    };

    if (req.method == "POST") {
        const query = `insert into categories (name) values ($1)`;
        conn.query(query, [req.body.word], (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            const query = `select * from categories `;
            conn.query(query, (err, result) => {
                return res.status(200).json(result.rows.map((w) => w.name));
            })
        });
    } else if (req.method == "GET") {
        const query = `select * from categories `;
        conn.query(query, (err, result) => {
            return res.status(200).json(result.rows.map((w) => w.name));
        })
    }
    else {
        res.status(405).json({ message: "Method not allowed" });
    }


}