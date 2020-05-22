import React,{Component} from 'react';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            pass1:"",
            pass2:"",
            nope:false
        }
    }
    render(){
        return(
            <div>
                <div className="p-4 display-4">
                    Welcome {this.props.state.fName} {this.props.state.lName}!
                </div>
                <div className="p-3">
                    <h2>UserName:</h2>
                    <h3 className="pl-5">{this.props.state.userName}</h3>
                </div>
                <div className="p-3">
                    <h2>Email:</h2>
                    <h3 className="pl-5">{this.props.state.eMail}</h3>
                </div>
                <div className="p-3">
                    <div>
                        <h2>Change Password:</h2>
                    </div>
                    <div className="pl-5">
                        <div className="p-2">
                            <input type="password" className="form-control" placeholder="Current Password" onChange={this.textRef1.bind()}></input>
                        </div>
                        <div className="p-2">
                            <input type="password" className="form-control" placeholder="New Password" onChange={this.textRef2.bind()}></input>
                        </div>
                        <div className="row p-2">
                            <div className="col-sm-6">
                                {this.state.nope?(<h6 className="text-danger">New password can not be same as old one!</h6>):<p></p>}
                            </div>
                            <div className="p-2 text-right col-sm-6">
                            <button className="btn btn-primary" onClick={this.changePass}>Change My Password!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    textRef1=(element)=>{
        this.setState({pass1:element.target.value});
    }

    textRef2=(element)=>{
        this.setState({pass2:element.target.value});
    }

    changePass=(event)=>{
        event.preventDefault();
        if(this.state.pass1===this.state.pass2){
            this.setState({nope:true});
        }else{
            console.log(this.state.pass1);
            console.log(this.state.pass2);
            var user={
                pass1:this.state.pass1,
                pass2:this.state.pass2
            }
            console.log(user);
        }
    }
}

export default Profile;