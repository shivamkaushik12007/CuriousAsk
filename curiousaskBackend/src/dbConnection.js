const mongoose=require('mongoose');
mongoose.set('useCreateIndex', true);
const {url}=require('../config');

mongoose.connection.openUri(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db=mongoose.connection;
db.on('error',function(){
    console.log("Error connecting to db")
})

db.once('open',function(){
    console.log("Connected to db")
})