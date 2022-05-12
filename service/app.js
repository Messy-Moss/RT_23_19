require('dotenv').config();
const express = require('express');
const cors = require('cors');
const repository = require('repository');

const app = express();

app.use(cors({
    origin: 'http://localhost:4000',
    methods: '*'
}));

app.use(express.json());

const PORT = process.env.PORT || 8080;

console.log(__dirname);

app.get('/oglasi', async (req, res) => {
    try {
        // const allowedQueries = ['kategorija', 'cena', 'oznaka', 'valuta'];
        let data = await repository.getAll();
        if ('kategorija' in req.query && req.query.kategorija != "") {
            // for (const [ key, value ] of Object.entries(req.query)) {
            data = data.filter(d => d['kategorija'].toLowerCase() === req.query.kategorija );
            // }
        }
        res.json(data);
    } 
    catch (err) {
        console.log(err);
        res.status(400).json("bad request");
    }
});


app.get('/oglasi/:id', async (req, res) => {
    try {
        const data = await repository.getOne(Number.parseInt(req.params.id));
        if (!data)
            return res.json({
                status: 'fail',
                content: {
                    msg: 'no data with given id'
                }
            });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json("bad request");
    }
});

app.post('/oglasi', async (req, res) => {
    try {
        const data = await repository.addOne(req.body);
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json("bad request");
    }
});

app.delete('/oglasi/:id', async (req, res) => {
    try {
        await repository.deleteOne(Number.parseInt(req.params.id));
        res.status(200).send({
            status: 'success',
            content: {
                msg: 'deleted successfuly'
            }
        });
    } catch (err) {
        res.status(400).json("bad request");
    }
});

app.patch('/oglasi/:id', async (req, res) => {
    try {
        console.log('here');
        const data = await repository.updateOne(Number.parseInt(req.params.id), req.body);
        console.log(data);
        res.status(200).json({
            status: "success",
            content: {
                msg: "resource updated successfuly"
            }
        });
    } catch (err) {
        res.status(400).json("bad request");
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
