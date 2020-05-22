import React, {Component} from 'react';
import MyQuestion from './myQuestion';
import Profile from './profile';
import Home  from './home';

class ProfilePage extends Component{
    constructor(props){
        super(props);
        this.state={
            check:0,
            search:"0",
            name:"Shivam Kaushik",
        }
    }
    render(){
        return(
            <div>
                <div className="row  align-middle h-50 p-3 bg-danger sticky-top">
                    <div className="col-sm-3 display-4 text-light font-weight-bolder" onClick={this.changeOne}>CuriousAsk</div>
                    <div className="col-sm-3 pt-3 pl-5">
                        {this.state.check===0?
                            <div className="input-group">
                                <select onChange={this.textRef.bind(this)} className="btn btn-light" >
                                    <option value="0">select the type of questions you want to see!</option>
                                    <option value="1">Computer Science</option>
                                    <option value="2">Architecture</option>
                                    <option value="3">Management</option>
                                    <option value="4">Business</option>
                                    <option value="5">Mechanical</option>
                                    <option value="6">Electrical</option>
                                </select>
                            </div>
                        :null} 
                    </div>
                    <div className="col-sm-6 d-flex flex-row-reverse row pt-3">
                        <div className="col-xs-3">
                            <button className="btn text-light btn-lg nohover">logout</button>
                        </div>
                        <div className="col-xs-3">
                            <button className="btn text-light btn-lg" onClick={this.changeThree}>Profile</button>
                        </div>
                        <div className="col-xs-3">
                            <button  className="btn text-light btn-lg" onClick={this.changeTwo}>My Questions</button>
                        </div>
                        <div className="col-xs-3">
                            <button className="btn text-light btn-lg" onClick={this.changeOne}>Home</button>
                        </div>
                    </div>
                </div>
                <div className="row pt-3 px-5">
                    <div className="col-sm-2.5 text-center position-static">
                            <div className="card">
                                <div className="card-body">
                                <h4 className="card-title">{this.props.location.state.fName} {this.props.location.state.lName}</h4>
                                <button onClick={this.changeThree} className="btn btn-primary">See Profile</button>
                                </div>
                            </div>
                    </div>
                    <div className="col-sm-9.5 px-2" style={{width:'78vw'}}>
                        {this.state.check===0?(<Home state={this.props.location.state} search={this.state.search}/>):
                        this.state.check===1?(<MyQuestion state={this.props.location.state}/>):
                        (<Profile state={this.props.location.state}/>)
                        }
                    </div>
                </div>   
            </div>
        )
    }

    textRef=(element)=>{
        this.setState({search:element.target.value},()=>{console.log("change")});
    }
    
    changeOne=()=>{
        this.setState({check:0});
    }
    
    changeTwo=()=>{
        this.setState({check:1});
    }
    
    changeThree=()=>{
        this.setState({check:2});
    }

    search=(event)=>{
        event.preventDefault();
        console.log(this.state.search);
    }
}
export default ProfilePage;