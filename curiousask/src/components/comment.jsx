
import React,{Component} from'react';

class Comment extends Component{
    constructor(props){
        super(props);
        this.state={
            comments:[]
        }
    }

    componentDidMount(){
        this.fetchComments();
    }

    componentDidUpdate(prevProps){
        if(this.props.refreshingComment!==prevProps.refreshingComment||this.props.postid!==prevProps.postid){
            this.fetchComments();
        }
    }

    render(){
        return(
            <div>
                {this.state.comments.map(comment=>
                    <div key={comment._id}>
                        <div className="font-weight-bold">
                            {comment.userName}
                        </div>
                        <div className="p-2 pl-4">
                            {comment.content}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    fetchComments=()=>{
        var comment={
            token:this.props.state.token,
            postId:this.props.postid
        }
        fetch("http://127.0.0.1:4000/comment/findComment",{
                method:'POST',
                headers:{
                    'content-Type': 'application/json'
                },
                body:JSON.stringify(comment)
            })
            .then(res=>{
                return res.json()
            })
            .then(res=>{
                this.setState({comments:res});
            })
            .catch(res=>{
                // console.log(`The error is : ${JSON.stringify(res)}`)
            })
    }
}

export default Comment;