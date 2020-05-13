import React, {Component} from 'react';
import MyQuestion from './myQuestion';
import Profile from './profile';
import Home  from './home';

class ProfilePage extends Component{
    constructor(props){
        super(props);
        this.state={
            check:0,
            search:"",
            name:"Shivam Kaushik",
        }
    }
    render(){
        return(
            <div>
                <div className="row  align-middle h-50 p-3 bg-danger sticky-top">
                    <div className="col-sm-3 display-4 text-light font-weight-bolder" onClick={this.changeOne}>CuriousAsk</div>
                    <div className="col-sm-3 pt-3">
                        <form>
                            <div className="input-group d-flex flex-row-reverse row">
                                <div className="pt-1">
                                    <button onClick={this.search} className="btn btn-light">search</button>
                                </div>   
                                <div className="pt-1">
                                    <input type="text" placeholder="UserName" className="form-control input-goup-lg" onChange={this.textRef.bind()}></input>
                                </div>
                            </div>
                        </form>
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
                                <h4 className="card-title">{this.props.fName} {this.props.lName}</h4>
                                <button onClick={this.changeThree} className="btn btn-primary">See Profile</button>
                                </div>
                            </div>
                    </div>
                    <div className="col-sm-9.5 px-5 w-75">
                        {this.state.check===0?(<Home state={
                            token=this.props.token,
                            userNamethis.props.userName,
                            userId=this.props.userId,
                            typeOf=this.state.search
                        }/>):
                        this.state.check===1?(<MyQuestion state={
                            token=this.props.token,
                            userNamethis.props.userName,
                            userId=this.props.userId
                        }/>):
                        (<Profile state={
                            token=this.props.token,
                            userNamethis.props.userName,
                            userId=this.props.userId,
                            eMail=this.props.eMail,
                            fName=this.props.fName,
                            lName=this.props.lName
                            }/>)}
                    </div>
                </div>   
            </div>
        )
    }
    textRef=(element)=>{
        this.setState({search:element.target.value});
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