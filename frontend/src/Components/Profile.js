import React, { Component } from 'react'
import { Container, Divider, Card, Progress } from 'semantic-ui-react'
import './sass/Profile.scss'
import SiteCard from './Profile/SiteCard';
import { observer } from 'mobx-react';


@observer
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sites: [],
            progress: 0
        };
        this.onDecision = this.onDecision.bind(this);
    }
    componentDidMount() {
        const sites = [{ key: "aaa", name: "Foo bar" }, { key: "aab", name: "Bar baz" }, { key: "aac", name: "Baz Qux" }]
        this.setState({ ...this.state, sites: sites });
    }
    onDecision(key, accepted) {
        console.log(this.props.store.choices)
        this.props.store.addSite(key, accepted)
    }
    increment() {
        this.setState({...this.state, percent: prevState.percent >= 100 ? 0 : prevState.percent + 20})
    }

    render() {
        return (
            <div className="Profile">
                <Container className="title" textAlign='center'>Center Aligned:</Container>
                <Container>
                    <Divider />
                    <Card.Group>
                        {this.state.sites.map((site, key) =>
                            <SiteCard handleDecision={this.onDecision} siteInfo={site} key={key}></SiteCard>
                        )}

                    </Card.Group>
                    <Progress percent={this.state.percent} indicating />

                </Container>
            </div>
        )
    }
}

export default Profile