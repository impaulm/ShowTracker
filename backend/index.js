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
    username: { type: Sequelize.STRING, unique: true },
    email: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
});

// Modèle de la base de données UsersActions
const UsersActions = sequelize.define('useraction', {
    watched: { type: Sequelize.BOOLEAN, defaultValue: false },
    liked: { type: Sequelize.BOOLEAN, defaultValue: false },
    towatch: { type: Sequelize.BOOLEAN, defaultValue: false },
    userID: { type: Sequelize.INTEGER, primaryKey: true },
    filmID: { type: Sequelize.INTEGER, primaryKey: true },
});

// Films.id et User.id doivent être clés étrangères primaires dans UsersActions
Users.hasMany(UsersActions, {
    foreignKey: 'userID',
});
UsersActions.belongsTo(Users, {
    foreignKey: 'userID',
});

// Création de la base de données
Users.sync({ force: true }).then(() => {
    console.log('Table Users créée');
});

UsersActions.sync({ force: true }).then(() => console.log('Table UsersActions créée'));

/* Routes Express */
// Route /
app.get('/', async (req, res) => {
    res.send('Server is OK');
})

// Récupération des films populaires
app.get('/popularmovies', async (req, res) => {
    try {
        const response = await fetch(TMDB_URL + "/movie/popular?language=fr-FR&page=1", {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + TMDB_API_KEY
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error with popularmovies');
    }
});

// Récupération des films recherchés
app.get('/searchedmovies', async (req, res) => {
    console.log(req.query.query);
    try {
        // console.log(TMDB_URL+"search/movie?query="+req.query.query+"&include_adult=false&language=fr-FR&page=1");
        const response = await fetch(TMDB_URL+"search/movie?query="+req.query.query+"&include_adult=false&language=fr-FR&page=1", {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer '+TMDB_API_KEY
            }
        });
        
        const data = await response.json();
        // console.log(data.results);
        res.json(data.results);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error with popularmovies');
    }
});

// Récupération du film avec son ID
app.get('/movie/:id', async (req, res) => {
    const id = req.params.id;
    const response = await getMovieById(id);
    res.json(response);
});

const getMovieById = async (id) => {
    try {
        const response = await fetch(TMDB_URL + "/movie/" + id + "?language=fr-FR", {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + TMDB_API_KEY
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error with movie');
    }
}

// Récupération des trailers du film avec son ID
app.get('/movie/:id/videos', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await fetch(TMDB_URL + "/movie/" + id + "/videos?language=fr-FR", {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + TMDB_API_KEY
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error with trailers');
    }
});

// Récupération des films dans towatch de l'utilisateur avec l'userID
app.get('/watchlist/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await UsersActions.findAll({
            attributes: ['filmID'],
            where: {
                userID: userId,
                towatch: true,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error with getwatchlist');
    }
});

// Ajout ou mise à jour de la liste towatch de l'utilisateur
app.post('/addorupdatewatchlist', async (req, res) => {
    const { userId, filmId } = req.body;
    try {
        const [userMovie, created] = await UsersActions.findOrCreate({
            where: { userID: userId, filmID: filmId },
            defaults: { userID: userId, filmID: filmId, towatch: true, }
        });
        if (!created) {
            await UsersActions.update({ towatch: !userMovie.towatch }, { where: { userID: userMovie.userID, filmID: userMovie.filmID } });
            if (!userMovie.towatch == true) {
                const movie = await getMovieById(filmId);
                io.emit('addwatchlist', { movie });
            } else {
                io.emit('removewatchlist', { filmId });
            }
            res.status(200).json({ message: 'Watchlist updated successfully.' });
        } else {
            const movie = await getMovieById(filmId);
            io.emit('addwatchlist', { movie });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error with addorupdatewatchlist function' });
    }
});

// Récupération des films dans watched de l'utilisateur avec l'userID
app.get('/watched/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await UsersActions.findAll({
            attributes: ['filmID'],
            where: {
                userID: userId,
                watched: true,
            }
        });
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error with getwatchedmovie');
    }
});

// Ajout ou mise à jour de la liste watched de l'utilisateur
app.post('/addorupdatewatched', async (req, res) => {
    const { userId, filmId } = req.body;
    console.log(userId, filmId);
    try {
        const [userMovie, created] = await UsersActions.findOrCreate({
            where: { userID: userId, filmID: filmId },
            defaults: { userID: userId, filmID: filmId, watched: true, }
        });
        if (!created) {
            await UsersActions.update({ watched: !userMovie.watched }, { where: { userID: userMovie.userID, filmID: userMovie.filmID } });
            if (!userMovie.watched == true) {
                const movie = await getMovieById(filmId);
                io.emit('addwatched', { movie });
            } else {
                io.emit('removewatched', { filmId });
            }
            res.status(200).json({ message: 'Watchlist updated successfully.' });
        } else {
            const movie = await getMovieById(filmId);
            io.emit('addwatched', { movie });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error with addorupdatewatched function' });
    }
});

// Récupération des films dans liked de l'utilisateur avec l'userID
app.get('/liked/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await UsersActions.findAll({
            attributes: ['filmID'],
            where: {
                userID: userId,
                liked: true,
            }
        });
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error with getlikedmovie');
    }
});

// Ajout ou mise à jour de la liste liked de l'utilisateur
app.post('/addorupdateliked', async (req, res) => {
    const { userId, filmId } = req.body;
    try {
        const [userMovie, created] = await UsersActions.findOrCreate({
            where: { userID: userId, filmID: filmId },
            defaults: { userID: userId, filmID: filmId, liked: true, }
        });
        if (!created) {
            await UsersActions.update({ liked: !userMovie.liked }, { where: { userID: userMovie.userID, filmID: userMovie.filmID } });
            if (!userMovie.liked == true) {
                const movie = await getMovieById(filmId);
                io.emit('addliked', { movie });
            } else {
                io.emit('removeliked', { filmId });
            }
            res.status(200).json({ message: 'Watchlist updated successfully.' });
        } else {
            const movie = await getMovieById(filmId);
            io.emit('addliked', { movie });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error with addorupdateliked function' });
    }
});

// Création d'un utilisateur
app.post('/register', async (req, res) => {
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
        const users = await Users.findAll({
            where: {
                username,
                password,
            }
        });
        if (users.length > 0) {
            res.status(200).json(users[0]);
        } else {
            res.status(403).send('Connexion impossible');
        }
        console.log(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

/* Démarrage serveur */
const server = app.listen(3000, () => {
    console.log('Serveur backend démarré !')
})

const io = new Server(server, { cors: { origin: ['http://127.0.0.1:5173', 'http://localhost:5173'] } });
io.on('connection', socket => console.log('Connection ' + socket.id));