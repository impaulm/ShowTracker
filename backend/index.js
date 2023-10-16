import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Sequelize from 'sequelize';
import { Server } from 'socket.io';

// Initialisation serveur
const app = express();

// Sécurité
app.use(cors());

/* Partie Sequelizer */
const sequelize = new Sequelize('sqlite:database-shows.db');

sequelize.sync({
    force:true,
});

/* Routes Express */
// Route /
app.get('/', async (req, res) => {
    res.send('Server is OK');
})

/* Démarrage serveur */
const server = app.listen(3000, () => {
    console.log('Serveur backend démarré !')
})

const io = new Server(server, { cors: { origin:['http://localhost:5173', 'http://localhost:5173'] } });
io.on('connection', socket => console.log('Connection ' + socket.id));