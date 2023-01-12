import conn from '../../lib/db';
import jwtPassw from '../../lib/constants';

export default function handler(req, res) {
    const jwt = require('jsonwebtoken');
    const sqlQuery = 'select * from users where email=$1 and passwd=md5($2)';

    conn.query(sqlQuery, [req.body.email, req.body.password], (err, result) => {
        if (result.rows.length == 0) {
            return res.status(200).json({ status: "error", message: "Wrong email or password" });
        } else {
            const jwtPassw = (process.env.NODE_ENV == "production") ? process.env["JWT_PASSW"] : "XXX";
            return res.status(200).json({
                status: "success",
                userTypeId: result.rows[0].user_type_id,
                token: jwt.sign({ userId: result.rows[0].id, _r: Math.random() }, jwtPassw)                
            });
        }
    })
}