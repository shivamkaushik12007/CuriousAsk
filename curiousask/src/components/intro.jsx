import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

class Intro extends Component{
    constructor(){
        super();
        this.state={
            pnm:false,
            enm:false,
            unm:false,
            lnm:false,
            userDetail:{},
            redir1:false,
            redir2:false,
            logUser:"",
            logPass:"",
            email:"",
            fname:"",
            lname:"",
            uname:"",
            pass1:"",
            pass2:"",
            check1:false,
            check2:false
        }
    }
    render(){
        if(this.state.redir1){
            return <Redirect to={{
                pathname:'/profilePage',
                state:{
                    token:this.state.userDetail.token,
                    userName:this.state.userDetail.resp[0].userName,
                    eMail:this.state.userDetail.resp[0].eMail,
                    userId:this.state.userDetail.resp[0]._id,
                    fName:this.state.userDetail.resp[0].fName,
                    lName:this.state.userDetail.resp[0].lName
                }
            }}/>
        }
        if(this.state.redir2){
            return <Redirect to={{
                pathname:'/profilePage',
                state:{
                    token:this.state.userDetail.token,
                    userName:this.state.userDetail.resp.userName,
                    eMail:this.state.userDetail.resp.eMail,
                    userId:this.state.userDetail.resp._id,
                    fName:this.state.userDetail.resp.fName,
                    lName:this.state.userDetail.resp.lName
                }
            }}/>
        }
        return(
            <div style={{widht:'vw'}}>
                <div className="row  align-middle h-50 p-3 bg-danger">
                    <div className="col-sm-7 display-4 text-light font-weight-bolder">CuriousAsk</div>
                    <div className="col-sm-5 pt-3">
                        <form onSubmit={this.login}>
                            <div className="form-group row">
                                <div className="col-xs-4 p-1">
                                    <input type="text" placeholder="UserName" className="form-control" onChange={this.logUser.bind()}></input>
                                </div>
                                <div className="col-xs-4 p-1">
                                    <input type="password" placeholder="Password" className="form-control" onChange={this.logPass.bind()}></input>
                                </div>
                                <div className="col-xs-4 p-1">
                                    <button type="submit"  className="btn btn-primary" >logIn</button>
                                </div>   
                            </div>
                        </form>
                        {this.state.lnm?(<div className="text-light text-center font-weight-bold">UserName or Password is wrong...try again!</div>)
                        :<p></p>}
                    </div>
                </div>
                <div className="row bg-light pt-5" style={{height:'80vh'}}>
                    <div className="col-sm-7 display-2 text-danger font-weight-bolder text-center">
                        Curious about <br/> something...<br/>Ask it here!
                    </div>
                    <div className="col-sm-5 form-group px-5">
                        <form onSubmit={this.signup}>
                            <div className="row pl-3 pr-3">
                                <div className="col-sm-6 pr-1">
                                    <input type="text" placeholder="First Name" className="form-control" onChange={this.fname.bind()}></input>
                                </div>
                                <div className="col-sm-6 pl-1">
                                    <input type="text" placeholder="Last Name" className="form-control" onChange={this.lname.bind()}></input>
                                </div>
                            </div>
                            <div className="col-sm-12 pt-3">
                                <input type="text" placeholder="UserName" className="form-control" onChange={this.uname.bind()}></input>
                            </div>
                            <div className="col-sm-12 pt-3">
                                <input type="email" placeholder="Email" className="form-control" onChange={this.email.bind()}></input>
                            </div>
                            <div className="col-sm-12 pt-3">
                                <input type="password" placeholder="Password" className="form-control" onChange={this.pass1.bind()}></input>
                            </div>
                            <div className="col-sm-12 pt-3">
                                <input type="password" placeholder="Rewrite Password" className="form-control" onChange={this.pass2.bind()}></input>
                            </div>
                            {this.state.pnm?(<div className="pt-3 pl-3 text-danger text-left">Your password does not match!</div>)
                            :this.state.enm?(<div className="pt-3 pl-3 text-danger text-left">This email is already in use!</div>)
                            :this.state.unm?(<div className="pt-3 pl-3 text-danger text-left">This username is taken try another!</div>)
                            :<p></p>}
                            <div className="col-sm-12 pt-3 text-center">
                                <button type="submit"  className="btn btn-primary">SignUp</button>
                            </div>
                        </form>
                    </div>
                </div>   
            </div>
        )
    }
    
    logUser=(element)=>{
        this.setState({logUser:element.target.value})
    }

    logPass=(element)=>{
        this.setState({logPass:element.target.value})
    }

    login=(event)=>{
        event.preventDefault();
        var user={
            userName:this.state.logUser,
            password:this.state.logPass
        }
        fetch("http://127.0.0.1:4000/user/logIn",{
            method:'POST',
            headers:{
                'content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>{
            if(res.ok){
                this.setState({check1:true})
                // console.log(res.json())
                return res.json()
            }
        })
        .then(res=>{
            if(this.state.check1 && res.resp.length>0){
                this.setState({userDetail:res}) 
            }else{
                this.setState({check1:false})
            }
        })
        .then(res=>{
            if(this.state.check1){
                this.setState({redir1:true})
            }
            this.setState({lnm:true})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    
    uname=(element)=>{
        this.setState({uname:element.target.value})
    }

    fname=(element)=>{
        this.setState({fname:element.target.value})
    }

    lname=(element)=>{
        this.setState({lname:element.target.value})
    }

    email=(element)=>{
        this.setState({email:element.target.value})
    }

    pass1=(element)=>{
        this.setState({pass1:element.target.value})
    }
    pass2=(element)=>{
        this.setState({pass2:element.target.value})
    }

    signup=(event)=>{
        event.preventDefault();
        var p1=this.state.pass1;
        var p2=this.state.pass2;
        if(p1===p2){       
            var user={
                userName:this.state.uname,
                password:p1,
                fName:this.state.fname,
                lName:this.state.lname,
                eMail:this.state.email
            }
            fetch("http://127.0.0.1:4000/user/addUser",{
            method:'POST',
            headers:{
                'content-Type': 'application/json'
            },
            body:JSON.stringify(user)
            })
            .then(res=>{
                if(res.ok){
                    this.setState({check2:true})
                    return res.json()
                }
            })
            .then(res=>{
                if(this.state.check2)
                    this.setState({userDetail:res})
            })
            .then(res=>{
                if(this.state.check2){
                    this.setState({redir2:true})
                }
                this.setState({enm:true})
            })
            .catch(err=>{
                console.log(err)
            })
            // console.log(user);
        }else{
            this.setState({pnm:true})
        }
    }
}
export default Intro;