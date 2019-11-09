import React, { Component } from 'react';
import { GoogleMap, LoadScript, DirectionsService } from '@react-google-maps/api';

export default class Directions extends Component {
	constructor(props) {
		super(props)

		this.state = {
			response: null,
			travelMode: 'DRIVING',
			origin: '',
			destination: ''
		}

		this.directionsCallback = this.directionsCallback.bind(this)
		this.checkDriving = this.checkDriving.bind(this)
		this.checkBicycling = this.checkBicycling.bind(this)
		this.checkTransit = this.checkTransit.bind(this)
		this.checkWalking = this.checkWalking.bind(this)
		this.getOrigin = this.getOrigin.bind(this)
		this.getDestination = this.getDestination.bind(this)
		this.onClick = this.onClick.bind(this)
	}

	directionsCallback(response) {
		console.log(response)

		if (response !== null) {
			if (response.status === 'OK') {
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

	checkDriving({ target: { checked } }) {
		checked &&
			this.setState(
				() => ({
					travelMode: 'DRIVING'
				})
			)
	}

	checkBicycling({ target: { checked } }) {
		checked &&
			this.setState(
				() => ({
					travelMode: 'BICYCLING'
				})
			)
	}

	checkTransit({ target: { checked } }) {
		checked &&
			this.setState(
				() => ({
					travelMode: 'TRANSIT'
				})
			)
	}

	checkWalking({ target: { checked } }) {
		checked &&
			this.setState(
				() => ({
					travelMode: 'WALKING'
				})
			)
	}

	getOrigin(ref) {
		this.origin = ref
	}

	getDestination(ref) {
		this.destination = ref
	}

	onClick() {
		if (this.origin.value !== '' && this.destination.value !== '') {
			this.setState(
				() => ({
					origin: this.origin.value,
					destination: this.destination.value
				})
			)
		}
	}



	render() {

		const mapStyle = {
			height: '500px',
			width: '100%'
		}
		return (
			<div className='map'>
				<div className='map-settings'>
					<hr className='mt-0 mb-3' />

					<div className='row'>
						<div className='col-md-6 col-lg-4'>
							<div className='form-group'>
								<label htmlFor='ORIGIN'>Origin</label>
								<br />
								<input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} />
							</div>
						</div>

						<div className='col-md-6 col-lg-4'>
							<div className='form-group'>
								<label htmlFor='DESTINATION'>Destination</label>
								<br />
								<input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} />
							</div>
						</div>
					</div>

					<div className='d-flex flex-wrap'>
						<div className='form-group custom-control custom-radio mr-4'>
							<input
								id='DRIVING'
								className='custom-control-input'
								name='travelMode'
								type='radio'
								checked={this.state.travelMode === 'DRIVING'}
								onChange={this.checkDriving}
							/>
							<label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
						</div>

						<div className='form-group custom-control custom-radio mr-4'>
							<input
								id='BICYCLING'
								className='custom-control-input'
								name='travelMode'
								type='radio'
								checked={this.state.travelMode === 'BICYCLING'}
								onChange={this.checkBicycling}
							/>
							<label className='custom-control-label' htmlFor='BICYCLING'>Bicycling</label>
						</div>

						<div className='form-group custom-control custom-radio mr-4'>
							<input
								id='TRANSIT'
								className='custom-control-input'
								name='travelMode'
								type='radio'
								checked={this.state.travelMode === 'TRANSIT'}
								onChange={this.checkTransit}
							/>
							<label className='custom-control-label' htmlFor='TRANSIT'>Transit</label>
						</div>

						<div className='form-group custom-control custom-radio mr-4'>
							<input
								id='WALKING'
								className='custom-control-input'
								name='travelMode'
								type='radio'
								checked={this.state.travelMode === 'WALKING'}
								onChange={this.checkWalking}
							/>
							<label className='custom-control-label' htmlFor='WALKING'>Walking</label>
						</div>
					</div>

					<button className='btn btn-primary' type='button' onClick={this.onClick}>Build Route</button>
				</div>

				<div className='map-container'>
					<LoadScript id="script-loader"
						googleMapsApiKey='AIzaSyB6nG0vhkO7C_97rSGJhs2cYm3rKE7bUf8'>
						<GoogleMap
							id='google-map'
							mapContainerStyle={mapStyle}
							zoom={11} center={{ lat: 52.3366039, lng: 4.8667033 }}
							onClick={this.onMapClick}
							onLoad={map => { console.log('DirectionsRenderer onLoad map: ', map) }}>
							{
								(
									this.state.destination !== '' &&
									this.state.origin !== ''
								) && (
									<DirectionsService
										// required
										options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
											destination: this.state.destination,
											origin: this.state.origin,
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
				</div>
			</div>
		)
	}
}

