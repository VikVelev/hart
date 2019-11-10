import React, { Component } from 'react'
import { Button, Card, Image, Transition } from 'semantic-ui-react'


export default class SiteCard extends Component {

	state = {
		visible : false,
		loading: true,
	}

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

	componentDidMount() {
		setTimeout(() => {
			this.setState({ visible: true })
		}, 100*(this.props.siteInfo.key));
	}

	// TODO READ FROM THE GENERATED JSON
	render() {
		return (
			<Transition visible={this.state.visible} animation="fade" duration={500}>
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
							<Button onClick={this.handleAccept} color='green'>Approve</Button>
							<Button onClick={this.handleDecline} color='red'>
								Decline</Button>
						</div>
					</Card.Content>
				</Card>
			</Transition>

		)
	}
}
