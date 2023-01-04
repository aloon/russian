import { Pool } from "pg";

let dbUser = "postgres"
let dbPasswd = "postgres"
let dbHost = "localhost"
const dbPort = 5432
const dbName = "postgres"
if (process.env.NODE_ENV == "production") {
    dbUser = process.env["DB_USER"]
    dbPasswd = process.env["DB_PASSW"]
    dbHost = process.env["DB_HOST"]
}

let conn;

if (!conn) {
    conn = new Pool({
        user: dbUser,
        password: dbPasswd,
        host: dbHost,
        port: dbPort,
        database: dbName,
    });
}

export default conn ;