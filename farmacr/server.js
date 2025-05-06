require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar a MySQL:', err);
        return;
    }
    console.log('✅ Conexión a MySQL establecida');
});

app.use(express.static('public'));

app.get('/api/prueba', (req, res) => {
    connection.query('SELECT * FROM prueba', (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(results);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});