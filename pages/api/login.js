import conn from '../../lib/db';

export default function handler(req, res) {
    const jwt = require('jsonwebtoken');
    let jwtPassw = (process.env.NODE_ENV == "production") ? process.env["JWT_PASSW"] : "XXX"
    const sqlQuery = 'select * from users where email=$1 and passwd=md5($2)';

    conn.query(sqlQuery, [req.body.email, req.body.password], (err, result) => {
        if (result.rows.length == 0) {
            return res.status(200).json({ status: "error", message: "Wrong email or password" });
        } else {
            return res.status(200).json({ status: "success", userTypeId:result.rows[0].user_type_id,  token: jwt.sign({ email: result.rows[0].email }, jwtPassw) });
        }
    })
}