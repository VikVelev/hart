import React, { Component } from 'react'
import Map from './RouteView/Map'
import './sass/RouteView.scss'
import TripPlan from './RouteView/TripPlan'
export default class RouteVIew extends Component {
    render() {
        return (
            <div className = "RouteView">
                <Map></Map>
                <TripPlan></TripPlan>
            </div>
        )
    }
}
