var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    typeOf:{
        type:String,
        required:true
    },
    date:Number
})

const PostsModel = mongoose.model("Posts",postSchema,"posts");

PostsModel.findSpecific = function(req,callBack){
    let post = {_id:req.body._id};
    // JSON.stringify(post);
    // console.log(post)
    PostsModel.find(post,callBack);
}

PostsModel.findTopic = function(req,callBack){
    let post = { typeOf: req.body.typeOf};
    // JSON.stringify(post);
    // console.log(post)
    PostsModel.find(post,callBack).sort({date: -1});
}

PostsModel.findAll = function(req,callBack){
    PostsModel.find(callBack).sort({date:-1});
    // console.log("cool")
}

PostsModel.addPost = function(req,callBack){
    let post={
        userId:req.body.userId,
        userName:req.body.userName,
        content:req.body.content,
        typeOf:req.body.typeOf,
        date:req.body.date
    };
    PostsModel.create(post,callBack);
    // console.log(post);
}

PostsModel.findUser = function(req,callBack){
    let post={userId:req.body.userId};
    // JSON.stringify(post);
    PostsModel.find(post,callBack).sort({date:-1});
}

module.exports = PostsModel;