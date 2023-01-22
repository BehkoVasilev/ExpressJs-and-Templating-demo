const express = require('express');
const handlebars = require('express-handlebars')

const loggerMiddleware = require('./loggerMiddleware');

const app = express();
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

const port = 5000;

const validateCatId = (req, res, next) => {
    let id = req.params.catId;

    if (!Number(id)) {
        return res.send('Invalid ID');
    }
    next();
};

//middleware for all endpoints
app.use(loggerMiddleware);

//Static files / static middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home')
});


app.get('/old', (req, res) => {
    res.send(`
    <head>
        <link rel="stylesheet" href="css/style.css"
    </head>
    <body>
        <h1 style="color: pink">Hello form ExpressJS!</h1>
        <button type="button"><a href="/cats">Cats!</a></button>
        <button type="button"><a href="/dogs">Dogs!</a></button>
    </body>
    `);
});

app.get('/cats', (req, res) => {
    res.render('cats')
});
//Middleware
app.get('/cats/:catId', validateCatId, (req, res) => {
    // res.send(`<h1>Individual Cat Page with ID: ${req.params.catId}</h1>`);
    res.render('cat', { id: req.params.catId })
});

app.get('/dogs', (req, res) => {
    const dogs = [
        { name: 'Fiona', breed: 'English bulldog', age: '7' },
        { name: 'Rex', breed: 'German Shepherd Dog', age: '3' },
        { name: 'Herra', breed: 'Corso', age: '4' },
    ]

    res.render('dogs', { dogs })
});

//download
app.get('/dogs/5', (req, res) => {
    res.download('./dog.jpg');
    // res.sendFile('./dog.jpg', { root: __dirname });
    // res.attachment('./dog.jpg');//there is no end()
});

app.get('/dogs/:dogId', (req, res) => {
    res.send(` with ID: ${req.params.dogId}</h1>`)
});

app.post('/cats', (req, res) => {
    res.send('Cat is recivied!');
});

app.delete('/cats', (req, res) => {
    res.send('Cat is deleted!')
});

app.put('/cats', (req, res) => {
    res.send("Cat is updated!")
});

app.get('/json', (req, res) => {
    res.json({ name: 'Rex', age: 4, food: 'chicken' });
});

app.get('/redirect', (req, res) => {
    res.redirect('/redirected');
});

app.get('/redirected', (req, res) => {
    res.send('This is redirected page!')
});

app.get('*', (req, res) => {
    res.send('404');
});

app.listen(port, () => console.log("Server is running on port 5000..."));