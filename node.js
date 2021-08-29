const http = require ('http');
const express = require ('express');
const bodyParser = require ('body-parser');
const { Http2ServerRequest } = require('http2');
const { url } = require('inspector');
const { runInNewContext } = require('vm');
const array = [];
const workListArray = [];
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get('/',(req,res)=>{
    let currnetDay= new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = currnetDay.toLocaleDateString('en-Us',options);
    res.render('index',{kindOfDay:`Today is ${today}`,itemList:array,next:"next",ch:'/work'});
});

app.post('/',(req,res)=>{
    const item = req.body.name;
    if (item === '') {
        return;
    } else {        
    if (req.body.add === "WorkList") {
            workListArray.push(item);
            res.redirect('/work');
        }else{
            array.push(item);
            res.redirect('/');        
        }; 
    };     
});

app.get('/work',(req,res)=>{
    res.render('index',{kindOfDay:"WorkList",itemList:workListArray,next:"previous",ch:"/"});
});

app.listen(8000,()=>{
    console.log('Server is starting.....');
});