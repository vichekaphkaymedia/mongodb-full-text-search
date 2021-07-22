const express = require('express');
const app = express();
const mongoose = require('mongoose');

let Todo = require('./Todo');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Connection
mongoose.connect("mongodb://localhost:27017/full-text-search", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to mongoDB');
});
db.on('error', (error) => {
    console.log(error)
})


app.post('/todo',async(req,res) => {
    try{
        let todo = await Todo.create(req.body);
        res.send(todo);
    }catch(e){
        res.send(e.message);
    }
});

app.get('/todo',async(req,res) => {
    const {q} = req.query
    let query = q
    ? {$text: {$search: q}}
    : {}
    try{
        let todos = await Todo.find(query);
        res.send(todos);
    }catch(e){
        res.send(e.message);
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});