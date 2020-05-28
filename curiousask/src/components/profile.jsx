import React,{Component} from 'react';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            pass1:"",
            pass2:"",
            nope:false,
            pope:false,
            errorMessage:""
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
                                {this.state.pope?(<h6 className="text-success">Password Changed...Enjoy!</h6>):
                                this.state.nope?(<h6 className="text-danger">{this.state.errorMessage}</h6>):
                                <p></p>}
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
            this.setState({errorMessage:"Both the passwords are same",nope:true,pope:false});
        }else{
            var user={
                token:this.props.state.token,
                userId:this.props.state.userId,
                userName:this.props.state.userName,
                pass1:this.state.pass1,
                pass2:this.state.pass2
            }
            console.log(user)
            fetch("http://127.0.0.1:4000/passChange/changePass",{
                method:'PUT',
                headers:{
                    'content-Type': 'application/json'
                },
                body:JSON.stringify(user)
            })
            .then(res=>{
                if(res.ok){
                    this.setState({pope:true,nope:false});
                    return res.json();
                }else{
                    this.setState({errorMessage:res.statusText,nope:true,pope:false});
                }
            })
            .catch(res=>{
                // console.log(`The error is : ${JSON.stringify(res)}`)
            })
        }
    }
}

export default Profile;