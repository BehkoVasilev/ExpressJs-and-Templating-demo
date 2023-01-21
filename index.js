const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send(`
    <h1 style="color: pink">Hello May!</h1>
    <button type="button"><a href="/cats">Cats!</a></button>
    <button type="button"><a href="/dats">Dogs!</a></button>
    `);
});

app.get('/cats', (req, res) => {
    res.send('This is cats page!')
});

app.get('dogs', (req,res) =>{
    res.send('This is dogs page!')
})
app.get('*', (req, res) => {
    res.send('404');
})

app.listen(port, () => console.log("Server is runing on port 5000..."));