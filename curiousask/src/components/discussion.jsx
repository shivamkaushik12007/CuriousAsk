import React,{Component} from 'react';
import Question from './question';

class Discussion extends Component{
    constructor(props){
        super(props);   
        this.state={}
    }

    componentDidUpdate(){} 

    render(){
        return(
            <div style={{height:"80vh",width:"34vw",overflow:"scroll",position:"fixed"}}>
                <div>
                <div className="display-4 text-light font-weight-bolder text-center p-3 bg-info">
                    Discussion
                </div>
                </div>
                <div>
                    {this.props.postid===""?
                    <div className="display-4 bg-light text-center p-3">Right now no discussion is open!</div>:
                    <Question state={this.props.state} postid={this.props.postid}/>
                    }
                </div>
            </div>
        )
    }

}

export default Discussion;