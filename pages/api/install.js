export default function handler(req, res) {
    let dbUser = "postgres"
    let dbPasswd = "postgres"
    let dbHost = "localhost"
    if (process.env.NODE_ENV == "production") {
        dbUser = process.env["DB_USER"]
        dbPasswd = process.env["DB_PASSW"]
        dbHost = process.env["DB_HOST"]
    }

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

    //let filesR = [];
    

    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
      //  console.log(files)
        //filesR=files;
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
        //    console.log(file);
          //  filesR.push(file)
        });
        res.status(200).json(files)
    });


    
}
