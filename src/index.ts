import express, { Response, Request } from 'express'
require('dotenv').config()


const app = express ();
const port = 3000 || process.env.PORT;


app.get ('/', (req: Request,res: Response)=>{
    res.send ("Hello World");
})

app.listen (port, ()=>{
    console.log (`App is listening on: http://localhost:${port}`)
})