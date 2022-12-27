import conn from '../../lib/db';

export default function handler(req, res) {

    function getAppRootDir() {
        let currentDir = __dirname
        while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
            currentDir = path.join(currentDir, '..')
        }
        return currentDir
    }

    const path = require('path');
    const fs = require('fs');
    const directoryPath = path.join(getAppRootDir(), '../sql-migrations');

    const query = `
    create table if not exists sql_migrations (
        name varchar(255) primary key, 
        sql text not null,
        date timestamp NOT NULL DEFAULT NOW(),
        procesed boolean default false
    );`;
    conn.query(query, (err, result) => {
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }


            files.forEach(function (file) {
                //console.log(file);

                fs.readFile(directoryPath + '/../sql-migrations/' + file, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    //  console.log(data);
                    conn.query(`
                    insert into sql_migrations (name, sql) values ($1, $2) on conflict (name) do nothing;
                `, [file, data], (err, result) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        const sqls = conn.query(`select * from sql_migrations where procesed = false order by name`, (err, result) => {
                            //console.log(result);
                            result.rows.forEach((row) => {
                                conn.query(row.sql, (err, result) => {
                                    if (err) {
                                        console.error(err);
                                        return;
                                    }
                                    conn.query(`update sql_migrations set procesed = true, date=now() where name = $1`, [row.name], (err, result) => {
                                        if (err) {
                                            console.error(err);
                                            return;
                                        }
                                    });
                                });
                            });
                        });

                    });
                });


            });
            res.status(200).json(files)
        });
    });
}
