const mongoose =  require('mongoose');

const commentSchema = new mongoose.Schema({
    postId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    date:Number

})

const CommentModel = mongoose.model("Comments",commentSchema,"comments");

CommentModel.addComment = function(req,callBack){
    let comment={
        postId:req.body.postId,
        userName:req.body.userName,
        content:req.body.content,
        date:req.body.date
    }
    CommentModel.create(comment, callBack);
}

CommentModel.findComment = function(req,callBack){
    let comment = {postId:req.body.postId};
    CommentModel.find(comment, callBack);
}

module.exports = CommentModel;