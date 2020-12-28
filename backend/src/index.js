const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);

const io = require('socket.io')(server,{
    cors:{
        origin:"*",
        methods:["GET","POST","PUT","DELETE"]
    }
});


//local connection -> mongodb://127.0.0.1:27017/db-twitter
//connect mongodb atlas (cloud)
mongoose.connect('mongodb+srv://rafaelvieira:rafadafiel@cluster0.qslfi.mongodb.net/db-twitter?  retryWrites=true&w=majority',
     {useNewUrlParser: true, useUnifiedTopology:true,}).
        then(() =>{
               console.log('Connection successful!..');
                 })
       .catch((err) =>{
               console.log('Connection failed to Mongo!..');
       });


app.use((req,res,next) =>{
    req.io = io;
    return next();
})


app.use(express.json());
app.use(require('./routes'));


server.listen(3001,() =>{
    console.log('server running...');

});
