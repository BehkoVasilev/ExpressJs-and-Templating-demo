const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send(`
    <h1 style="color: pink">Hello form ExpressJS!</h1>
    <button type="button"><a href="/cats">Cats!</a></button>
    <button type="button"><a href="/dats">Dogs!</a></button>
    `);
});

app.get('/cats', (req, res) => {
    res.send('This is cats page!')
});

app.get('/cats/:catId', (req, res) => {
    let id = req.params.catId;
    console.log(req.params)
    if (!Number(id)) {
        res.send('404')
    }
    else {
        res.send(`<h1>Individual Cat Page with ID: ${req.params.catId}</h1>`)
    }
});

app.get('/dogs', (req, res) => {
    res.send('This is dogs page!')
});

app.get('/dogs/5', (req, res) => {
    // res.download('./dog.jpg');
    res.sendFile('./dog.jpg', { root: __dirname })
    // res.attachment('./dog.jpg');//there is no end()
});

app.get('/dogs/:dogId', (req, res) => {
    res.send(`<h1>Individual Dog Page with ID: ${req.params.dogId}</h1>`)
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