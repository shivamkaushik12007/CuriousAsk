import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Intro from './intro';
import ProfilePage from './profilePage';
// import Discussion from './discussion';
class MainPage extends Component{
    
    render(){
        return(
            <div>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" component={Intro} exact/>
                        <Route path="/profilePage" component={ProfilePage}/>
                        {/* <Route path="/discussion" component={Discussion}/> */}
                        <Route component={Error}/>
                    </Switch>
                </div> 
            </Router>
        </div>
        )
    }
}
export default MainPage;