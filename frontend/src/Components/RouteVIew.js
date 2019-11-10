import React, { Component } from 'react'
import Map from './RouteView/Map'
import './sass/RouteView.scss'
import TripPlan from './RouteView/TripPlan'
import { observer } from 'mobx-react';
import Store from '../Store';


@observer
class RouteVIew extends Component {
    
    render() {
        return (
            <div className = "RouteView">
                <Map store={Store}></Map>
                <TripPlan store={Store}></TripPlan>
            </div>
        )
    }
}

export default RouteVIew