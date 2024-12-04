const express = require('express');
const server = express();
require('dotenv').config();
const Path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT;
const databaseConnection = require('./App/Config/dbConnect');
const userRouter = require('./App/Router/taskRouter');
server.use(express.urlencoded({extended:true}));
server.use(express.static(Path.join('uploads')));

/* Error Handler */
const errorHandler = require('./App/MiddleWare/errorHandler');

/*Connecting With the Database */
databaseConnection();

server.use(cors());
server.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Set-Headers','Content-type, Authorization');
    next();
});

server.use(morgan('combined'));/* Using Morgan */

server.use(userRouter);
server.use(errorHandler);

server.use((req,res)=>{
    res.send(`Page Not Found!, Please Check again and try `);
})
server.listen(port,()=>{
    console.log(`The Server is running at: http://localhost:${port}`);
    
})