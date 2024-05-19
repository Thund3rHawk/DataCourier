import express, { Response, Request } from 'express'
import { connectDB } from './db';
import { route } from './routes/post.route';
import multer from 'multer';
require('dotenv').config();


const app = express ();
const port = 3000 || process.env.PORT;
const upload = multer({dest: '/uploads'});

app.get ('/', (req: Request,res: Response)=>{
    res.send ("Hello World");
})
app.use ('/',upload.single('file') ,route);


app.listen (port, ()=>{
    connectDB();
    console.log (`App is listening on: http://localhost:${port}`)
})