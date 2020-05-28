import React,{Component} from 'react';
import QuestionPost from './questionPost';
import Discussion from './discussion';

class MyQuestion extends Component{
    constructor(props){
        super(props);
        this.state={
            postList:[],
            postid:"",
            type:["a","Computer Science","Architecture","Management","Business","Electrical","Mechanical"]
        }
    }
    componentDidMount(){
        this.fetchPost();
    }
    render(){
        return(
            <div className="row">
                <div className="col-sm-7">
                    <div>
                        <QuestionPost state={this.props.state} updating={this.fetchAgain}/>
                    </div>
                    <div>
                        {this.state.postList.map(post=>
                        <div key={post._id}>
                            <div className="p-4">
                                <div className="row">
                                    <div className="col-sm-8 font-weight-bold">{post.userName}</div>
                                    <div className="col-sm-4 text-right">{new Date(post.date).toLocaleString()}</div>
                                </div>
                                
                                <div>
                                    <h1>{post.content}</h1>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 text-left">
                                        {this.state.type[post.typeOf]}
                                    </div>
                                    <div className="col-sm-6 text-right">
                                        <button className="btn btn-primary" onClick={()=>this.discussionOpen(post._id)}>discussion</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                <div className="col-sm-5">
                    <Discussion state={this.props.state} postid={this.state.postid}/>
                </div>
            </div>
        )
    }
    
    fetchAgain=()=>{
        this.fetchPost();
    }

    discussionOpen=(element)=>{
        this.setState({postid:element},()=>{})
    }

    fetchPost=()=>{
        var post={
            token:this.props.state.token,
            userId:this.props.state.userId
        }
        fetch("http://127.0.0.1:4000/post/findUser",{
            method:'POST',
            headers:{
                'content-Type': 'application/json'
            },
            body:JSON.stringify(post)
        })
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            this.setState({postList:res});
        })
        .catch(res=>{
            // console.log(`The error is : ${JSON.stringify(res)}`)
        })
    }
}

export default MyQuestion;