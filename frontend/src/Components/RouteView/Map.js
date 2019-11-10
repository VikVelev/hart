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
            requesting: true,
        }

        this.directionsCallback = this.directionsCallback.bind(this)
    }

    directionsCallback(response) {
        if (response !== null) {
            if (response.status === 'OK') {
                console.log("PRAVISH ZAQVKA PEDERAS SPRI");
                this.setState(
                    () => ({
                        response
                    })
                )
            } else {
                console.log('error: ', response)
            }
        }
    }

    render() {
        
        console.log(this.props.store.currentTripRoute)
        let curTrip = this.props.store.currentTripRoute
        const waypoints = curTrip.slice(1, curTrip.length - 1).map( value => ({ location: value.name }))
        console.log(waypoints);
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
                            {console.log(curTrip)}
                        {
                            curTrip.length > 0 &&
                            <DirectionsService
                                options={{
                                    travelMode: this.state.travelMode,
                                    destination: curTrip[curTrip.length - 1].name,
                                    origin: curTrip[0].name,
                                    waypoints: waypoints
                                }}
                                callback={this.directionsCallback}
                            />
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

