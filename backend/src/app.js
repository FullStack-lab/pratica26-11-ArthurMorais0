const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});

const db = require('./database');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            price REAL,
            imageUrl TEXT
        )
    `);
});

const productRoutes = require('./routes/products');
app.use('/api', productRoutes);