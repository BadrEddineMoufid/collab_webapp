import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";



function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
