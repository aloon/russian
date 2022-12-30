import conn from "../../../lib/db";

export default function handler(req, res) {
    const queryAllCats = `select c.id,c.name, sum(case when jw.category_id is null then 0 else 1 end) as counts
    from categories as c
    left join join_words as jw 
    on c.id=jw.category_id
    group by c.id,c.name 
    order by c.id `;
    if (req.method == "POST") {
        const query = `insert into categories (name) values ($1)`;
        conn.query(query, [req.body.word], (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            conn.query(queryAllCats, (err, result) => {
                return res.status(200).json(result.rows.map((w) => {return {"id": w.id, "word":w.name, "counts":w.counts}}));
            })
        });
    } else if (req.method == "GET") {
        conn.query(queryAllCats, (err, result) => {
            return res.status(200).json(result.rows.map((w) => {return {"id": w.id, "word":w.name, "counts":w.counts}}));
        })
    }
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}