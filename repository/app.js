const { readFilePromisified, writeFilePromisified } = require('./utils');

const path = `${__dirname}\\oglasi.json`;

const getAll = async () => {
    return JSON.parse(await readFilePromisified(path));
}

const getOne = async (id) => {
    const data = await JSON.parse(await readFilePromisified(path));
    return data.find(oglas => oglas.id === id);
}

const deleteOne = async (id) => {
    try {
        const data = await getAll();
        const oglasi = data.filter(o => o.id !== id);
        await writeFilePromisified(path, JSON.stringify(oglasi));
    } catch (err) {
        throw new Error(err);
    }
}

const addOne = async (payload) => {
    try {
        const data = await getAll();

        let id = 1;
        if (data[data.length - 1] && data[data.length - 1].id)
            id = data[data.length - 1].id + 1;

        payload.id = id;

        data.push(payload);
        await writeFilePromisified(path, JSON.stringify(data));

        return payload;
    } catch (err) {
        throw new Error(err);
    }
}

const updateOne = async (id, payload) => {
    try {
        const data = await getAll();
    
        const oglas = data.find(o => o.id === Number.parseInt(id));
        // const content = req.body;
        //validate content...
        
        for (const [ key ] of Object.entries(payload)) {
            if (oglas[key])
                oglas[key] = payload[key];
        }
        const filtered = data.filter(o => o.id !== id);
        filtered.push(oglas);
        await writeFilePromisified(path, JSON.stringify(filtered));
    
        return payload;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getAll,
    getOne,
    deleteOne,
    addOne,
    updateOne
};