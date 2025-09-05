const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

// Middlewars para parsear json
app.use(express.json());
// Servir archivos estaticos
app.use(express.static('interface'));

let data = {};//BD

// Endpoints

// Get
app.get('/api', (req,res) => {
    res.json(data);
});

app.get('/api/:key', (req, res) => {
    const {key} = req.params;
    res.json({[key]: data[key] || null});
});

// Post
app.post('/api/:key', (req,res) => {
    const {key} = req.params;
    const {value} = req.body;

    if(!value){
        return res.status(400).json({ error: 'Value is required' });
    }

    if(data[key]){
        return res.status(409).json({ error: 'Key already exists' });
    }

    data[key] = value;
    res.status(201).json({message: 'Data created successfully'});
});

// Put and Delete
app.put('/api/:key', (req,res) => {
    const {key} = req.params;
    const {value} = req.body;

    if(!value){
        return res.status(400).json({ error: 'Value is required' });
    }

    if(!data[key]){
        return res.status(404).json({ error: 'Key not found' });
    }

    data[key] = value;
    res.status(201).json({message: 'Data updated successfully'});
});

app.delete('/api/:key', (req,res) => {
    const {key} = req.params;

    if(!data[key]){
        return res.status(404).json({ error: 'Key not found' });
    }

    delete data[key];
    res.status(204).send();
});

// Ruta pagina principal
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'interface', 'index.html'));
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`WebDev Launchpad running at http://localhost:${port}`);
});