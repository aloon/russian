import conn from "../../../lib/db";

// export default function handler(req, res) {
//     const jwtPassw = (process.env.NODE_ENV == "production") ? process.env["JWT_PASSW"] : "XXX";
//     const jwt = require('jsonwebtoken');
//     const decoded = jwt.verify(req.headers.token, jwtPassw);
//     const queryUser = `select * from users where id=$1`;
//     conn.query(queryUser, [decoded.userId], (err, result) => {
//         if (result.rows.length == 0) {
//             return res.status(401).json({ status: "error", message: "Wrong password" });
//         } else {
//             const queryAllCats = `select * from categories `;
//             conn.query(queryAllCats, (err, result) => {
//                 return res.status(200).json(result.rows.map((w) => { return { "id": w.id, "word": w.name } }));
//             })
//         }
//     });
// }




export default function handler(req, res) {
    const jwtPassw = (process.env.NODE_ENV == "production") ? process.env["JWT_PASSW"] : "XXX";
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(req.headers.token, jwtPassw);
    const queryUser = `select * from users where id=$1`;
    conn.query(queryUser, [decoded.userId])
        .then(result => {
            if (result.rows.length == 0) {
                return res.status(401).json({ status: "error", message: "Wrong password" });
            } else {
                const queryAllCats = `select * from categories `;
                conn.query(queryAllCats)
                    .then(result => {
                        return res.status(200).json(result.rows.map((w) => { return { "id": w.id, "word": w.name } }));
                    })
            }
        })
}