import conn from '../../lib/db';

export default function handler(req, res) {
    const url = (process.env.NODE_ENV == "production") ? process.env["SITE_URL"] : "http://localhost:3000";
    return res.status(200).json({ url });
}