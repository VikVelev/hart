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
							src={this.props.siteInfo.urlImage}
							/>
						<Card.Header>{this.props.siteInfo.name}</Card.Header>
						<Card.Description>{this.props.siteInfo.description}</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<div className='ui two buttons'>
							<Button onClick={this.handleAccept} basic color='green'>Approve</Button>
							<Button onClick={this.handleDecline} basic color='red'>
								Decline</Button>
						</div>
					</Card.Content>
				</Card>
			</Transition>

		)
	}
}
