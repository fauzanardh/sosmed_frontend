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
import EditProfile from "./pages/EditProfile";

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
                <Route exact path='/signup' component={SignUp}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/profile/edit' component={EditProfile}/>
                <Route exact path='/dashboard' component={Dashboard}/>
                <Route exact path='/followings' component={UserList}/>
                <Route exact path='/followers' component={UserList}/>
            </Switch>
        </Router>
    );
}

export default App;
