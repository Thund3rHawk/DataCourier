import express from 'express'
import { connectDB } from './db';
import { route } from './routes';
import multer from 'multer';
import cors from 'cors';
import errorHandler from './utils/errorHandler';

require('dotenv').config();


const app = express ();
const port = 3000 || process.env.PORT;

app.use(errorHandler);

const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
  optionsSuccessStatus: 204 
};

app.use(cors(corsOptions));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {      
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({storage});
  

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.get ('/', (req,res)=>{
    res.send ("Hello World");
})

// Routes
app.use ('/',upload.single('file') ,route);
app.use ('/:listTitle/users',upload.single('file') ,route);


app.listen (port, ()=>{
    connectDB();
    console.log (`App is listening on: http://localhost:${port}`)
})