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

app.use(bodyParser.json());

// Sécurité
app.use(cors());

/* Partie Sequelizer */
const sequelize = new Sequelize('sqlite:database-shows.db');

// Modèle de la base de données Users
const Users = sequelize.define('user', {
    userID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING },
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

// Création d'un utilisateur
app.post('/register', async (req, res) => {

    console.log(req.body);

    const { username, email, password } = req.body;
    try {
        const user = await Users.create({
            username,
            email,
            password,
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// Connexion d'un utilisateur
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findAll({
            where: {
                username,
                password,
            }
        });
        if (user.length > 0) {
            res.status(200).send('Connexion réussie');
        } else {
            res.status(403).send('Connexion impossible');
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Récupération des trailers du film avec son ID
app.get('/movie/:id/videos', async (req,res) => {
    const id = req.params.id;
    try {
        const response = await fetch(TMDB_URL+"/movie/"+id+"/videos?language=fr-FR", {
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