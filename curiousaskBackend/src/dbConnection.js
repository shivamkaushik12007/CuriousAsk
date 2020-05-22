const mongoose=require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connection.openUri('mongodb+srv://mapp:project123!@cluster0-xq5iu.mongodb.net/test?retryWrites=true&w=majority',{
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