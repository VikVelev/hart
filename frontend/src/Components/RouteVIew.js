import React, { Component } from 'react'
import Map from './RouteView/Map'
import './sass/RouteView.scss'
import TripPlan from './RouteView/TripPlan'
import { observer } from 'mobx-react';
import Store from '../Store';


@observer
class RouteVIew extends Component {
    constructor(props){
        super(props);
        this.state = {
            tripRoute: []
        }
        this.onTripChange = this.onTripChange.bind(this);
    }

    componentDidMount(){
        const responseString = [{
            origin: "Keizersgracht 672, 1017 ET Amsterdam, Netherlands",
            destination: "Oosterpark Amsterdam, Oosterpark, 1091 AC Amsterdam, Netherlands"
        },
        {
            origin: "Oosterpark Amsterdam, Oosterpark, 1091 AC Amsterdam, Netherlands",
            destination: "Dam 20, 1012 NP Amsterdam, Netherlands"
        },
        {
            origin: "Dam 20, 1012 NP Amsterdam, Netherlands",
            destination: "Oudezijds Achterburgwal 54, 1012 DP Amsterdam, Netherlands"
        },
        {
            origin: "Oudezijds Achterburgwal 54, 1012 DP Amsterdam, Netherlands",
            destination: "Prins Hendrikkade 73, 1012 AD Amsterdam, Netherlands"
        },
        {
            origin: "Prins Hendrikkade 73, 1012 AD Amsterdam, Netherlands",
            destination: "Stadhouderskade 78, 1072 AE Amsterdam, Netherlands"
        }]

        this.props.store.addTripRoute(responseString);
    }

    onTripChange(stop){
        console.log(stop)
    }
    render() {
        return (
            <div className = "RouteView">
                <Map tripRoute ={this.state.tripRoute}></Map>
                <TripPlan onTripChange={this.onTripChange} store={Store}></TripPlan>
            </div>
        )
    }
}

export default RouteVIew