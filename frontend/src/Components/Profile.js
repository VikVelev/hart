import React, { Component } from 'react'
import { Container, Divider, Card, Progress, Transition, List, Segment } from 'semantic-ui-react'
import './sass/Profile.scss'
import SiteCard from './Profile/SiteCard';
import { observer } from 'mobx-react';
import { Redirect } from "react-router-dom";
import axios from 'axios';


@observer
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sites: [],
            sitesOnDisplay: [],
            progress: 0,            // progress bar state
            display: 4,             // max sites on page 
            submitted: false,
            visible: false,
        };
        this.onDecision = this.onDecision.bind(this);
        this.takeRandom = this.takeRandom.bind(this);
    }
    componentDidMount() {
        const sites = [
            { key: 1, name: "Kur 1", picked: false },
            { key: 2, name: "Kur 2", picked: false },
            { key: 3, name: "Kur 3", picked: false },
            { key: 4, name: "Kur 4", picked: false },
            { key: 5, name: "Kur 5", picked: false },
            { key: 6, name: "Kur 6", picked: false },
            { key: 7, name: "Kur 8", picked: false },
            { key: 8, name: "Kur 9", picked: false },
            { key: 9, name: "Kur 10", picked: false }
        ]

        const shuffle = this.takeRandom(this.state.display, sites.length); // take display amount of indexes from site.length indexes
        const sitesOnDisplay = sites.filter((site, index) => shuffle.includes(index)); // filter sites with matching index into onDisplay state 
        sites.forEach((site, index) => {
            if (shuffle.includes(index)) {
                site.picked = true;
            }
        })
        this.setState({ ...this.state, sites: sites, sitesOnDisplay: sitesOnDisplay });
    }

    takeRandom(displaySize, arraySize) {
        let arr = [];
        while (arr.length < displaySize) {
            let r = Math.floor(Math.random() * arraySize)
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    }

    //returns index of possible element
    newRandom(array) {
        //filter unpicked sites
        const choices = array.filter(site => site.picked === false);
        //return random unpicked site
        return choices[Math.floor(Math.random() * choices.length)]
    }
    onDecision(key, accepted) {
        let sites = this.state.sites;
        let sitesOnDisplay = this.state.sitesOnDisplay;

        const replacement = this.newRandom(sites); // get replacement from existing state

        // no places left to see
        if (sites.filter(x => !x.picked).length <= 1 || replacement === undefined) {
            // 
            this.props.store.addSite(key, accepted) // updates store      
            let choices = this.props.store.choices
            axios.post("",{
                choicesArray: choices
            }) // write your proper post request here

            this.setState({ progress: 100 }); // fancy shit

            setTimeout(() => {
                this.setState({ submitted: true })
            }, 2000);
            
            return;
        }

        sites.forEach((site, index) => {
            if (site.key == replacement.key) {
                site.picked = true;
            }
        })

        let toBeRemoved = sitesOnDisplay.filter((value) => value.key === key);
        let indexToRemove = sitesOnDisplay.indexOf(toBeRemoved[0])

        sitesOnDisplay.splice(indexToRemove, 1);

        this.setState({
            sitesOnDisplay: sitesOnDisplay,
        })

        sitesOnDisplay.push(replacement);
        //sitesOnDisplay = sitesOnDisplay.map((value) => value.key === key ? replacement : value) //remove accepted key 
        // sitesOnDisplay.splice()

        this.props.store.addSite(key, accepted) // updates store      
        this.setState({
            sites: sites,
            sitesOnDisplay: sitesOnDisplay,
            progress: this.state.progress >= 100 ? 100 : this.state.progress + 20
        }) // push state changes

    }

    componentWillMount(){
        setTimeout(() => {
            this.setState({visible: true})
        }, 500);
    }

    render() {

        return (
                <Transition visible={this.state.visible} animation="scale" duration={500}>
                <div className="Profile">
                    <Container className="title" textAlign='center'>What would you like?</Container>
                    <Container className="profileContent">
                        <Divider />
                        <Card.Group>
                                {this.state.sitesOnDisplay.map((site, key) =>
                                    <SiteCard handleDecision={this.onDecision} siteInfo={site} key={key}></SiteCard>
                                )}
                        </Card.Group>
                        <Transition transitionOnMount animation="fade" duration={1000}>
                            <Segment className="progressBar">
                                <Progress percent={this.state.progress} indicating />
                            </Segment>
                        </Transition>
                        {this.state.submitted && (<Redirect push to="/map"></Redirect>)}
                    </Container>
                </div>
                </Transition>
        )
    }
}

export default Profile