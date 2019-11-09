import React, { Component } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './sass/Map.scss'
import { Container } from 'semantic-ui-react';

export default class Directions extends Component {
	constructor(props) {
		super(props)

		this.state = {
			waypoints: {},
			response: null,
			travelMode: 'DRIVING',
			origin: '',
			destination: ''
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
		console.log(waypoints)
		this.setState({ ...this.state, waypoints: waypoints, origin: parsedString[0], destination: parsedString[parsedString.length - 1] });

	}

	directionsCallback(response) {
		console.log(response)

		if (response !== null) {
			if (response.status === 'OK') {
				console.log(JSON.stringify(response))
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
			<Container className='Map'>
				<LoadScript id="script-loader"
					googleMapsApiKey='AIzaSyDDnGI01K1XobCs4wlWiWlIru56x1fY0mc'>
					<GoogleMap
						id='google-map'
						mapContainerStyle={mapStyle}
						zoom={11} center={{ lat: 52.3366039, lng: 4.8667033 }}
						onLoad={map => { console.log('DirectionsRenderer onLoad map: ', map) }}>
						{
							(this.state.destination !== '' && this.state.origin !== '') && (
								<DirectionsService
									// required
									options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
										destination: this.state.destination,
										origin: this.state.origin,
										//waypoints: this.state.waypoints,
										travelMode: this.state.travelMode
									}}
									// required
									callback={this.directionsCallback}
								/>
							)
						}

						{
							this.state.response !== null && (
								<DirectionsRenderer
									// required
									options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
										directions: this.state.response
									}}
									// optional
									onLoad={directionsRenderer => {
										console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
									}}
									// optional
									onUnmount={directionsRenderer => {
										console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
									}}
								/>
							)
						}
					</GoogleMap>
				</LoadScript>
			</Container>

		)
	}
}

