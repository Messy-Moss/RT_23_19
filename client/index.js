const express = require('express');
const ejs = require('ejs');
const axios = require('axios');

const PORT = 4000;

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const { data } = await axios.get(`http://localhost:8080/oglasi${req.url}`);
    res.render('index', { title: 'Svi Oglasi', data });
});

app.get('/dodaj-oglas', (req, res) => {
    res.render('dodaj-oglas', { title: 'dodaj oglas', message: false });
});

app.get('/oglasi/:id', async (req, res) => {
    const oglasId = req.params.id;
    const { data } = await axios.get(`http://localhost:8080/oglasi/${oglasId}`);
    res.render('oglas.ejs', { data });
});

app.post('/dodaj-oglas', async (req, res) => {

    const validOglas = {
        id: req.body.id,
        kategorija: req.body.kategorija,
        datumIsteka: req.body.datumIsteka,
        cena: {
            valuta: req.body.valuta,
            iznos: req.body.iznos
        },
        tekst: req.body.opis,
        oznake: req.body.oznake.split(','),
        email: req.body.email
    };

    //validate
    const response = await axios.post('http://localhost:8080/oglasi', validOglas);

    res.render('dodaj-oglas', { title: 'dodaj Oglas', message: true });

    // res.redirect('/');
});

app.delete('/oglas/:id', async (req, res) => {
    await axios.delete('http://localhost:8080/oglasi/' + req.params.id);
    res.send('delet succ');
});

app.listen(4000, () => {
    console.log(`App listening on port ${PORT}`);
});