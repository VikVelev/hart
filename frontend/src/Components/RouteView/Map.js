import React, { Component } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import '../sass/Map.scss'
import keys from '../../.keys.js'

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {
            waypoints: {},
            useWaypoints: false,
            response: null,
            travelMode: 'DRIVING',
            origin: '',
            destination: '',
            requesting: false,
        }


        this.directionsCallback = this.directionsCallback.bind(this)
    }

    componentDidMount() {
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
        const parsedString = responseString.map(value => value.origin)
        const waypoints = parsedString.slice(1, responseString.length - 1).map(value => ({ location: value }))
        const origin = parsedString[0]
        const destination = parsedString[parsedString.length - 1]


		/*
         key: kur - 5 node graph
         key: hui - 2 node graph
        */
        const cachedResponse = JSON.parse(localStorage.getItem("kur"))
        this.setState({ response: cachedResponse });

        //this.setState({useWaypoints:true, waypoints: waypoints, origin: origin, destination: destination });

    }



    directionsCallback(response) {
        if (response !== null) {
            if (response.status === 'OK') {
                console.log("PRAVISH ZAQVKA PEDERAS SPRI");
                localStorage.setItem("kur", JSON.stringify(response))
                this.setState(
                    () => ({
                        response
                    })
                )
            } else {
                console.log('response: ', response)
            }
        }
    }
    render() {

        const mapStyle = {
            height: '100%',
            width: '100%'
        }
        return (
            <div className='Map'>
                <LoadScript id="script-loader"
                    googleMapsApiKey={keys.googleKey}>
                    <GoogleMap
                        id='google-map'
                        mapContainerStyle={mapStyle}
                        zoom={11}
                        center={{ lat: 52.3366039, lng: 4.8667033 }}
                        onLoad={map => { console.log('DirectionsRenderer onLoad map: ', map) }}>

                        {(
                            !this.state.requesting &&
                            this.state.destination !== '' &&
                            this.state.origin !== ''
                        ) && (
                                <DirectionsService
                                    options={{
                                        travelMode: this.state.travelMode,
                                        destination: this.state.destination,
                                        origin: this.state.origin,
                                        waypoints: this.state.useWaypoints ? this.state.waypoints : {}
                                    }}
                                    callback={this.directionsCallback}
                                />
                            )
                        }
                        {
                            this.state.response !== null && (
                                <DirectionsRenderer options={{ directions: this.state.response }} />
                            )
                        }
                    </GoogleMap>
                </LoadScript>
            </div>

        )
    }
}



const directions = () => {
    return (
        <div>
            {(
                !this.state.requesting &&
                this.state.destination !== '' &&
                this.state.origin !== ''
            ) && (
                    <DirectionsService
                        options={{
                            travelMode: this.state.travelMode,
                            destination: this.state.destination,
                            origin: this.state.origin,
                            waypoints: this.state.useWaypoints ? this.state.waypoints : {}
                        }}
                        callback={this.directionsCallback}
                    />
                )
            }
        </div>
    )
}

