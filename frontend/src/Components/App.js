import React from 'react';
import './sass/App.scss'
import Store from '../Store';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {Transition} from 'semantic-ui-react';
import WelcomeScreen from './WelcomeScreen';
import Profile from './Profile';
import RouteVIew from './RouteVIew';
import dotenv from 'dotenv'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                        <Route path="/welcome" component={WelcomeScreen}/>
                         <Route path="/profile" render={() => <Profile store={Store}/>}/>
                        <Route path="/map" component={Map}/>
                        <Route path="/kur" component={Directions}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
