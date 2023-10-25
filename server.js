const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const exp = require('constants');
const port = 5000;
const cors = require('cors');

app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*'
}));
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: "5mb"}))
const db = mysql.createConnection({
  host: 'data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com',
  user: 'testing',
  password: 'Pruebas%ALI%2020',
  database: 'testing_ali_fullstack',
});

// Conéctate a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error in db:', err);
    return;
  }
  console.log('Connection successfully!');
});

app.post('/api/add-data', (req, res) => {
  console.log("🚀 ~ file: server.js:44 ~ app.post ~ req.body:", req.body)
  const { nombre, segundoNombre, apellidoPaterno, apellidoMaterno, FechaNacimiento, email, telefono } = req.body;

  // Realiza una consulta para insertar los datos en la tabla user_test_claudiaganzolaraNew
  const query = 'INSERT INTO user_test_claudiaganzolaraNew (nombre, segundoNombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, email, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [nombre, segundoNombre, apellidoPaterno, apellidoMaterno, FechaNacimiento, email, telefono], (err, result) => {
    if (err) {
      console.error('Error al insertar datos en la base de datos:', err);
      res.status(500).send('Error al insertar datos en la base de datos');
    } else {
      res.json({ message: 'Datos insertados correctamente' });
    }
  });
});

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
