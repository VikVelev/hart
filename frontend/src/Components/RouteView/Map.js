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

        const parsedString = this.props.tripRoute.map(value => value.origin)
        parsedString.push(this.props.tripRoute[this.props.tripRoute.length-1]);

        const useWaypoints = parsedString.length <= 2? false : true;

        const waypoints = parsedString.slice(1, this.props.tripRoute.length - 1).map(value => ({ location: value }))
        
        const origin = parsedString[0]
        const destination = parsedString[parsedString.length - 1]


		/*
         key: kur - 5 node graph
         key: hui - 2 node graph
        */
        const cachedResponse = JSON.parse(localStorage.getItem("kur"))
        this.setState({ response: cachedResponse });

        //this.setState({useWaypoints:useWaypoints, waypoints: waypoints, origin: origin, destination: destination });

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

