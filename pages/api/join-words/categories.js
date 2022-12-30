import conn from "../../../lib/db";

export default function handler(req, res) {
    const queryAllCats = `select * from categories `;
    if (req.method == "GET") {
        conn.query(queryAllCats, (err, result) => {
            return res.status(200).json(result.rows.map((w) => {return {"id": w.id, "word":w.name}}));
        })
    }
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}