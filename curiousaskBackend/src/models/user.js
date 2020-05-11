const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    eMail:{
        type:String,
        unique:true,
        required:true
    },
    fName:String,
    lName:String
})

const UsersModel = mongoose.model("Users", usersSchema, "users");

UsersModel.logIn = function (req,res,callBack) {
    // let user = { userName: req.body.userName, password: req.body.password };
    // JSON.stringify(user);
    console.log(req.body)
    // callBack
    res.send('corect')
    // UsersModel.find(user, callBack);
}

UsersModel.addUser = function (req, callBack) {
    let user = req.body;
    UsersModel.create(user, callBack);
}

module.exports = UsersModel;