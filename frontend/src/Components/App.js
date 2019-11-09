import React from 'react';
import './sass/App.scss'
import Store from '../Store';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import WelcomingScreen from './WelcomingScreen';
import Profile from './Profile';

function App() {
    return (
        <BrowserRouter>
            <div className = "App">
                <Switch>
                    <Route path="/welcome">
                        <WelcomingScreen />
                    </Route>
                    <Route path="/profile">
                        <Profile store = {Store} />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
