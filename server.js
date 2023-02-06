const express = require('express');
const mongoose = require('mongoose'); 
const tasks = require('./routers/TaskRoute');

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/tasks',tasks);

mongoose.connect('mongodb+srv://idan:Idan05@cluster0.kvmtg7f.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));