var fs = require('fs')
const personFile = './data/persons.json';

exports.index = function(req, res) {
    getData((data)=>{
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        return res.end();
    });
};

exports.add_person = function(req, res) {
    getData((data)=>{
        var id = data.length;

        console.log(data);
        var newPerson = { name: req.body.name, title: req.body.title, id: id};
        console.log(newPerson);
        data.push(newPerson);
        console.log(data);

        fs.writeFile(personFile, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        return res.end();
    });
};

exports.get_person = function(req, res) {
    var personId = req.params.id;
    getData((data)=>{
        var found = false;
        data.forEach((person) => {
            if (person.id == personId) {
                found = true;
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(person));
                return res.end();
            };
        });

        if (!found){
            res.writeHead(404);
            return res.end();
        }
    });
};

exports.get_person_object = function(id,cb) {
    getData((data)=>{
        data.forEach((person) => {
            if (person.id == id) {
                cb(person);
                return;
            };
        });
    });
};

exports.remove_person = function(req, res) {
    var personId = req.params.id;
    getData((data)=>{
        var newPersons = [];
        data.forEach((person) => {
            if (person.id != personId) {
                newPersons.push(person);
            };
        });
        
        fs.writeFile(personFile, JSON.stringify(newPersons), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(newPersons));
        return res.end();
    });
};

exports.update_person = function(req, res) {
    var personId = req.params.id;
    getData((data)=>{
        var found = false;
        data.forEach((person) => {
            if (person.id == personId) {
                found=true;
                person.name = req.body.name;
                person.title = req.body.title;
            };
        });

        if (!found){
            res.writeHead(404);
            return res.end();
        }

        var newData = JSON.stringify(data);
        fs.writeFile(personFile, newData, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        return res.end();
    });
};

var getData = function(cb) {
    fs.readFile(personFile,  'utf8', (err, filecontents) => {
        if (err) throw err;
        var obj = JSON.parse(filecontents)
        return cb(obj);
    });
}