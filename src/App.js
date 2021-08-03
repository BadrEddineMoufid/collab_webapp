import React, {Component} from 'react'
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Chat from './pages/Chat';
import NewRoom from './pages/NewRoom';
import io from 'socket.io-client'



//app should have a islogedIn state so that it can be passed to the nav bar and other components

const initialState = {
  isLoggedIn: false,
  user_name: '',
  roomName:''
}

const socket = io(process.env.REACT_APP_SOCKET_BASE_URL)


class App extends Component {
  
  constructor(){
    super();
    this.state = initialState;
    
  }

  componentDidMount(){
    console.log(`ComponentDidMount| isLoggedIn:${this.state.isLoggedIn}`)
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

  setUserName = (userName) => {
    this.setState({user_name: userName})
  }

  setRoomName = (roomName)=>{
    this.setState({roomName:roomName})
    console.log(this.state.roomName)
  }

  render(){
    return (
      <Router>
        <NavBar loggedIn={this.state.isLoggedIn} userName={this.state.user_name} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" >
            <Signup setIsLoggedIn={this.setIsLoggedIn} setUserName={this.setUserName} />
          </Route>
          <Route exact path="/login">
            <Login setIsLoggedIn={this.setIsLoggedIn} setUserName={this.setUserName} />
          </Route>
          <Route exact path='/chat'>
            <Chat roomName={this.state.roomName} userName={this.state.user_name} isLoggedIn={this.state.isLoggedIn} socket={socket} />
          </Route>
          <Route exact path="/newroom">
            <NewRoom setRoomName={this.setRoomName}  />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;



