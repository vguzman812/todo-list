


import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs")

class Post {
    constructor(title, content) {
      this.title = title;
      this.content = content;
    };
};

var allPosts = [];

app.get('/', (req, res) => {
    res.render('index', {title: "Home", allPosts: allPosts});
});

app.get('/about', (req, res) => {
    res.render('about', {title: "About"});
});

app.get('/compose', (req, res) => {
    res.render('compose', {title: "Compose"});
}); 

app.post('/compose', (req, res) => {
    let data = req.body;
    let newPost = new Post(data.title, data.content);
    allPosts.push(newPost);
    console.log('New post added successfully');
    console.log(allPosts.length, allPosts);
    return res.redirect('/');
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: "Contact"});
}); 


app.listen(port, function() {
    console.log('http://localhost:3000');
});