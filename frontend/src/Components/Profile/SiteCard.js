import React, { Component } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'


export default class SiteCard extends Component {
	constructor(props) {
		super(props)
		this.handleAccept = this.handleAccept.bind(this);
		this.handleDecline = this.handleDecline.bind(this);
	}
	handleAccept() {
		this.props.handleDecision(this.props.siteInfo.key, true);

	}
	handleDecline() {
		this.props.handleDecision(this.props.siteInfo.key, false);
	}

	render() {
		return (
			<Card>
				<Card.Content>
					<Image
						floated='right'
						size='mini'
						src='https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg'
					/>
					<Card.Header>{this.props.siteInfo.name}</Card.Header>
					<Card.Description>Pevec ot separeva banq {this.props.siteInfo.key}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className='ui two buttons'>
						<Button onClick={this.handleAccept} basic color='green'>Approve</Button>
						<Button onClick={this.handleDecline} basic color='red'>
							Decline</Button>
					</div>
				</Card.Content>
			</Card>

		)
	}
}
