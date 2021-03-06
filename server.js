const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const fetch = require('node-fetch');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

const key = 'RGAPI-fd271dc1-ab43-4b84-91eb-bf7d3cfcb88b';

//const key = process.env.NODE_ENV === 'production' ? process.env.API_KEY_PRODUCTION : process.env.API_KEY_DEVELOPMENT;

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port: ' + port);
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}

app.get('/summoner', (req, res) => {
    const url = `https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.searchName}?api_key=${key}`;

    fetch(url).then(response => response.json()).then(response => {
        if(!response.status)
            res.send(response);
        else {
            res.status(response.status.status_code)
        }
    });
})

app.get('/champion', (req, res) => {
    const url = `https://cdn.communitydragon.org/${req.query.patch}/champion/${req.query.championKey}/data`;
    fetch(url).then(response => response.json()).then(response => {
        if(!response.statusCode)
            res.send(response);
        else {
            res.status(response.statusCode)
        }
    });
})

app.get('/free-rotation', (req, res) => {
    const url = `https://oc1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${key}`;
    fetch(url).then(response => response.json()).then(response => {
        if(!response.status)
            res.send(response);
        else {
            res.status(response.status.status_code)
        }
    })
})

app.get('/aram', (req, res) => {
    const url = `https://oc1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.query.accountId}?queue=450&api_key=${key}`
    fetch(url).then(response => response.json()).then(response => {
        if(!response.status)
            res.send(response);
        else {
            res.status(response.status.status_code)
        }
    })
})

app.get('/match', (req, res) => {
    const url = `https://oc1.api.riotgames.com/lol/match/v4/matches/${req.query.matchId}?api_key=${key}`
    fetch(url).then(response => response.json()).then(response => {
        if(!response.status)
            res.send(response);
        else {
            res.status(response.status.status_code)
        }
    })
})