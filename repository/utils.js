const fs = require('fs');

module.exports.readFilePromisified = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

module.exports.writeFilePromisified = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err, success) => {
            if (err) reject(err);
            resolve(success);
        });
    });
}