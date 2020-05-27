import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import QuestionPost from './questionPost';
import Discussion from './discussion';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            postList:[],
            postid:"",
            changing:false,
            type:["a","Computer Science","Architecture","Management","Business","Electrical","Mechanical"]
        }
    }  

    componentDidMount(){
        this.getPost();
    }

    componentDidUpdate(prevProps){
        if(this.props.search!==prevProps.search){
            this.getPost();
        }
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
                                    <div>
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
        this.getPost();
    }

    discussionOpen=(element)=>{
        this.setState({postid:element},()=>{})
    }

    getPost=()=>{
        var post={token:this.props.state.token,
            typeOf:this.props.search}
        if(this.props.search==="0"){
            fetch(`http://127.0.0.1:4000/post/findAll?token=${post.token}`,{
                method:'GET',
                headers:{
                    'content-Type': 'application/json'
                }
            })
            .then(res=>{
                return res.json()
            })
            .then(res=>{
                this.setState({postList:res});
            })
            .catch(res=>{
                console.log(`The error is : ${JSON.stringify(res)}`)
            })
        }else{
            fetch("http://127.0.0.1:4000/post/findTopic",{
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
                console.log(`The error is : ${JSON.stringify(res)}`)
            })
        }
    }
}

export default Home;