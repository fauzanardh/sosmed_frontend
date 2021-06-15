import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "@fontsource/roboto";
import './App.css';
import {checkTokenExpired, setAuthToken} from "./utils/authToken";
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import Notifications from "./pages/Notifications"
import Logout from "./pages/Logout";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import P404 from "./pages/404";

function App() {
    React.useEffect(() => {
        if (localStorage.jwtToken) {
            const token = localStorage.jwtToken;
            setAuthToken(token);
            checkTokenExpired(token);
        }
    });
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/logout' component={Logout}/>
                <Route exact path='/signup' component={SignUp}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/users/:username' component={Users}/>
                <Route exact path='/posts/:postId' component={Posts}/>
                <Route exact path='/dashboard' component={Dashboard}/>
                <Route exact path='/followings' component={UserList}/>
                <Route exact path='/followers' component={UserList}/>
                <Route exact path='/notifications' component={Notifications}/>
                <Route path='*' component={P404}/>
            </Switch>
        </Router>
    );
}

export default App;
