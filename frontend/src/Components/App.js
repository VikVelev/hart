import React from 'react';
import './sass/App.scss'
import Store from '../Store';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import WelcomeScreen from './WelcomeScreen';
import Profile from './Profile';
import Map from './Map';
import Directions from './Directions';
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/welcome">
                        <WelcomeScreen />
                    </Route>
                    <Route path="/profile">
                        <Profile store={Store} />
                    </Route>
                    <Route path="/map">
                        <Map></Map>
                    </Route>
                    <Route path="/kur">
                            <Directions />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
