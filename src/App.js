import React, {Component} from 'react'
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Chat from './pages/Chat';
import NewRoom from './pages/NewRoom';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoChat from './pages/VideoChat';

const initialState = {
  isLoggedIn: false,
  user_name: '',
  roomName:'',
	type:''
}

class App extends Component {
  // maybe some session stuff or localStorage for token MAYBE
	
  constructor(){
    super();
    this.state = initialState;
    
  }


	setType = (type)=>{
		this.setState({type: type})
	}
  setIsLoggedIn = (loggedIn) =>{
    if(loggedIn){
      this.setState({isLoggedIn: true})

      //Debug stuff
      //console.log("isLoggedIn state: "+ this.state.isLoggedIn)
    }else{
      this.setState({isLoggedIn: false})
    }
  }

  setUserName = (userName) => {
    this.setState({user_name: userName})
  }

  setRoomName = (roomName)=>{
    this.setState({roomName:roomName})
    
    //console.log(this.state.roomName)
  }

  render(){
    return (
      <Router>
        <NavBar setIsLoggedIn={this.setIsLoggedIn} loggedIn={this.state.isLoggedIn} userName={this.state.user_name} setRoomName={this.setRoomName} roomName={this.state.roomName} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" >
            <Signup setIsLoggedIn={this.setIsLoggedIn} setUserName={this.setUserName} />
          </Route>
          <Route exact path="/login">
            <Login setIsLoggedIn={this.setIsLoggedIn} setUserName={this.setUserName} />
          </Route>
          <Route exact path='/chat'>
            <Chat roomName={this.state.roomName} userName={this.state.user_name} isLoggedIn={this.state.isLoggedIn} />
          </Route>
          <Route exact path="/newroom">
            <NewRoom setRoomName={this.setRoomName} isLoggedIn={this.state.isLoggedIn} setType={this.setType} type={this.state.type} />
          </Route>
					<Route exact path='/videoChat' >
						<VideoChat userName={this.state.user_name} roomName={this.state.roomName} isLoggedIn={this.state.isLoggedIn} />
					</Route>
					<Route path='*'  component={NotFound} />
        </Switch>
        <ToastContainer limit={2} />
      </Router>
      
    );
  }
}

export default App;



