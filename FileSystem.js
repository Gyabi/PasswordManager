const fs = require('fs');
class FileSystem{
    constructor(){
        this.filepath = './password/password.json'
    }

    readJson(){
        return JSON.parse(fs.readFileSync(this.filepath, 'utf8'));
    }
    saveJson(data){
        fs.writeFileSync(this.filepath, JSON.stringify(data));
    }
}

module.exports = FileSystem;