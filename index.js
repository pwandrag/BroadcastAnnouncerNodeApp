var express = require('express')
var person_controller = require('./controllers/personController');
var fs = require('fs');
const { display } = require('./models/display');
const app = express()
const port = 8080

app.use(express.json());

app.get('/',(req,res)=>{
    fs.readFile('Index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
})

app.get('/admin',(req,res)=>{
    fs.readFile('admin.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
})

app.get('/logo.png',(req,res)=>{
    fs.readFile('logo.png', function(err, data) {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data);
        return res.end();
    })
})


app.get('/display',(req,res)=>{
    fs.readFile('./data/display.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data);
        return res.end();
    })
})

app.post('/display/:id',(req,res)=>{
    person_controller.get_person_object(req.params.id,(person)=>{
        var data = JSON.stringify(new display(person.name, person.title));
        
        fs.writeFile('./data/display.json', data, (err) => {
            if (err) throw err;
            console.log('Display Updated');
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data);
            return res.end();
        })
    });
})

app.get('/persons',person_controller.index);
app.get('/persons/:id',person_controller.get_person);
app.put('/persons/:id',person_controller.update_person);
app.post('/persons',person_controller.add_person);
app.delete('/persons/:id',person_controller.remove_person);

app.get('/campus',(req,res)=>{
    res.writeHead(202, {'Content-Type': 'text/plain'});
    res.write('{"campus":"PARKVIEW","chroma":"rgb(0,255,0)"}');
    return res.end();
})

app.listen(port, () => {
    console.log(`Broadcast Display on port ${port}!`)
})