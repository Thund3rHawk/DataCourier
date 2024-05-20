import express, { Response, Request } from 'express'
import { connectDB } from './db';
import { route } from './routes';
import multer from 'multer';
require('dotenv').config();


const app = express ();
const port = 3000 || process.env.PORT;
const upload = multer({dest: 'uploads/'});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.get ('/', (req: Request,res: Response)=>{
    res.send ("Hello World");
})

// Routes
app.use ('/',upload.single('file') ,route);
app.use ('/:listTitle/users',upload.single('file') ,route);


app.listen (port, ()=>{
    connectDB();
    console.log (`App is listening on: http://localhost:${port}`)
})