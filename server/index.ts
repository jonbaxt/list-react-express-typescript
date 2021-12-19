import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Initialize the express engine
const app: express.Application = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control_Allow_Methods", 'DELETE, PUT, OPTIONS');
    next();
});

const port: number = 3001;

interface User {
    id: Number;
    email: String;
    first_name: String;
    last_name: String;
    avatar: String;
}
var users: User[] = new Array();

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://reqres.in/api/users`);
    users = new Array();
    for(var i=0; i<result.data.data.length; i++){
        users.push(result.data.data[i]);
    }
    let inObj: String = result.data;
    return res.status(200).send(result.data.data);
};
app.get('/api/getusers', getUsers);

app.post('/api/createnewuser', async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        users.push(req.body);
        res.status(200).send(users);
    }
);

app.put('/api/updateuser/:id', async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log(req.body);
        console.log(users.length);
        for (var i = 0; i<users.length; i++){
            if(users[i].id === Number(req.params.id)){
                users[i].first_name = req.body.first_name;
                users[i].last_name = req.body.last_name;
                users[i].email = req.body.email;
                users[i].avatar = req.body.avatar;
            }
        } 
    res.status(200).send(users);
});

app.delete('/api/deleteuser/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
    const para = req.params.id;
    // const path = req.params;
    console.log(para);
    let newUsers = [];
    for (var i = 0; i<users.length; i++){
        if(users[i].id === Number(para)){
            users.splice(i, 1)
        } 
    }
    res.status(200).send(users);
    } catch (e) {
        console.log(e);
    }
});

app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});



