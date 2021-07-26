import React, {Component} from 'react'
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";


//app should have a islogedIn state so that it can be passed to the nav bar and other components

const initialState = {
  isLoggedIn: false
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  setIsLoggedIn = (loggedIn) =>{
    if(loggedIn){
      this.setState({isLoggedIn: true})

      //Debug stuff
      console.log("isLoggedIn state: "+ this.state.isLoggedIn)
    }else{
      this.setState({isLoggedIn: false})
    }
  }
  render(){
    return (
      <Router>
        <NavBar loggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" >
            <Signup setIsLoggedIn={this.setIsLoggedIn} />
          </Route>
          <Route exact path="/login">
            <Login setIsLoggedIn={this.setIsLoggedIn} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;



