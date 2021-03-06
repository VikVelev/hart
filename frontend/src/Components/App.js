import React from 'react';
import './sass/App.scss'
import Store from '../Store';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {Transition} from 'semantic-ui-react';
import WelcomeScreen from './WelcomeScreen';
import Profile from './Profile';
import RouteVIew from './RouteVIew';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                         <Route path="/profile" render={() => <Profile store={Store}/>}/>
                        <Route path="/map" render = {()=><RouteVIew store ={Store}/>}/>
                        <Route path="/*" component={WelcomeScreen}/>

                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
