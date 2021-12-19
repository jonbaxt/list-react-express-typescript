const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
// const typescript = require('typescript');
//const controller = require('./controller');

//const session = require('express-session');

const app = express();
// typescript.
var usersStore = [];

app.use( bodyParser.json());

//app.get('/api/getusers', controller.getUsers);
app.get('/api/getusers', (req, res) => {
    axios.get(`https://reqres.in/api/users`).then( (response) => {
        // console.log(response.data.data);
        console.log(response.data.data[0]);
        res.status(200).send(response.data);
    }).catch( (e)=> { 
        //console.log("get error", e); 
        res.status(400).send(e);
    })
}  );
app.listen(3002, ()=> {console.log(`Listening on Port: 3002`)});



var personArray = [];
/*
function addToArray(newId: Number, newEmail: String, newFirst: String, newLast: String, newAvatar: String){
    let newPerson = {
        id: newId,
        email: newEmail,
        first_name: newFirst,
        last_name: newLast,
        avatar: newAvatar
    }
    personArray.push(newPerson);
}*/