import React from 'react';
import './sass/App.scss'
import Store from '../store';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import WelcomingScreen from './WelcomingScreen';

function App() {
    return (
        <BrowserRouter>
            <div className = "App">
                <Switch>
                    <Route path="/welcome">
                        <WelcomingScreen />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
