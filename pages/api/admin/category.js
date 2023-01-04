import conn from "../../../lib/db";

export default function handler(req, res) {
    const query = `select * from categories where id = $1`;
    const catId = req.query.cat;
    conn.query(query, [catId], (err, result) => {
        return res.status(200).json({data: result.rows[0].name});
    });
}