import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Sequelize from 'sequelize';
import fetch from 'node-fetch';
import { Server } from 'socket.io';
import { TMDB_API_KEY } from './env.js';
const TMDB_URL = 'https://api.themoviedb.org/3/'

// Initialisation serveur
const app = express();

// Sécurité
app.use(cors());

/* Partie Sequelizer */
const sequelize = new Sequelize('sqlite:database-shows.db');

// Modèle de la base de données Users
const Users = sequelize.define('user', {
    userID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
});

// Modèle de la base de données Films
const Films = sequelize.define('film', {
    filmID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
});

// Modèle de la base de données UsersActions
const UsersActions = sequelize.define('useraction', {
    watched: { type: Sequelize.BOOLEAN },
    liked: { type: Sequelize.BOOLEAN },
    towatch: { type: Sequelize.BOOLEAN },
    userID: { type: Sequelize.INTEGER },
    filmID: { type: Sequelize.INTEGER },
});

// Films.id et User.id doivent être clés étrangères primaires dans UsersActions
Users.hasMany(UsersActions, {
    foreignKey: 'userID',   
});
UsersActions.belongsTo(Users, {
    foreignKey: 'userID', 
});
// Relation entre Film et UsersActions (relation 1,n)
Films.hasMany(UsersActions, {
    foreignKey: 'filmID',    
});
UsersActions.belongsTo(Films, {
    foreignKey: 'filmID', 
});

// Création de la base de données
Users.sync({ force: true }).then(() => {
    console.log('Table Users créée');

    Users.create({
        email: 'a.b@gmail.com',
        password: '1234',
    });
});

Films.sync({ force: true }).then(() => console.log('Table Films créée'));

UsersActions.sync({ force: true }).then(() => console.log('Table UsersActions créée'));

/* Routes Express */
// Route /
app.get('/', async (req, res) => {
    res.send('Server is OK');
})

// Récupération des films populaires
app.get('/popularmovies', async (req, res) => {
    try {
        const response = await fetch(TMDB_URL+"/movie/popular?language=fr-FR&page=1", {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer '+TMDB_API_KEY
            }
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error with popularmovies');
    }
});

// Récupération du film avec son ID
app.get('/movie/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const response = await fetch(TMDB_URL+"/movie/"+id+"?language=fr-FR", {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer '+TMDB_API_KEY
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error with movie');
    }
});



/* Démarrage serveur */
const server = app.listen(3000, () => {
    console.log('Serveur backend démarré !')
})

const io = new Server(server, { cors: { origin:['http://localhost:5173', 'http://localhost:5173'] } });
io.on('connection', socket => console.log('Connection ' + socket.id));