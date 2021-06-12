import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "@fontsource/roboto";
import './App.css';
import {checkTokenExpired, setAuthToken} from "./utils/authToken";
import Landing from './pages/Landing';
import Login from './pages/Login';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    checkTokenExpired(token);
}

function App() {

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/login' component={Login}/>
            </Switch>
        </Router>
    );
}

export default App;
