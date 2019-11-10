import React, { Component } from 'react'
import { Container, Divider, Card, Progress, Transition, Loader, Segment ,Dimmer } from 'semantic-ui-react'
import './sass/Profile.scss'
import SiteCard from './Profile/SiteCard';
import { observer } from 'mobx-react';
import { Redirect } from "react-router-dom";
import places from "../Data/places_details";
import matrix from "../Data/matrix";

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
            loading: false
        };
        this.onDecision = this.onDecision.bind(this);
        this.takeRandom = this.takeRandom.bind(this);
    }

    locationDictionary = []
    nameDictionary = []

    componentDidMount() {

        matrix.forEach((row) => {
            row.forEach((el) => {
                if (el.distance !== undefined) {
                    if (el.distance.value === 0) {
                        this.locationDictionary.push(el);
                        this.nameDictionary.push({
                            key: el.hashKey,
                            name: el.origin,
                            picked: false
                        });
                    }
                }
            })
        })

        const tempSites = places;
        let sites = []
        tempSites.forEach((site) => {
            let obj = {}

            obj.key = site[0].place_id;
            obj.picked = false;
            obj.name = site[0].name;
            obj.description = site[0].vicinity;
            obj.urlImage = site[0].icon;
            obj.coords = {
                lat: site[0].geometry.location.lat,
                lng: site[0].geometry.location.lng,
            }

            sites.push(obj)
        })

        const shuffle = this.takeRandom(this.state.display, sites.length); // take display amount of indexes from site.length indexes
        const sitesOnDisplay = sites.filter((site, index) => shuffle.includes(index)); // filter sites with matching index into onDisplay state 

        sites.forEach((site, index) => {
            if (shuffle.includes(index)) {
                site.picked = true;
            }
        })

        this.setState({ sites: sites, sitesOnDisplay: sitesOnDisplay });
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
        if (sites.filter(x => x.picked).length == 8 || replacement === undefined) {
            this.setState({loading:true})

            this.props.store.addSite(key, accepted) // updates store      
            // let choices = this.props.store.choices

            let randomIndices = this.takeRandom(5, this.nameDictionary.length);

            this.props.store.choosenLocations = this.nameDictionary.filter((_, index) => randomIndices.includes(index));

            let query = ""

            this.props.store.choosenLocations.forEach((place) => {
                query = query + "item=" + place.name + "&"
            })

            let queryString = "http://localhost:8080/?" + query;

            axios.get(queryString).then((res) => {
                let datum = res.data;
                datum.forEach((el) => {
                    el.visible = true;
                })

                this.props.store.setTripRoute(datum);
                this.setState({ submitted: true, progress: 100 })
            }).catch((err) => {
                console.log(err);
            });

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

    componentWillMount() {
        setTimeout(() => {
            this.setState({ visible: true })
        }, 500);
    }

    render() {

        return (
            <Transition visible={this.state.visible} animation="scale" duration={500}>
                <div className="Profile">
                    <Container className="title" textAlign='center'>What would you like?</Container>
                    <Container className="profileContent">
                        <Divider />
                        <Card.Group className="siteCards">
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


                    <Segment disabled className={this.state.loading?"loadingScreen":"hidden"}>
                        <Dimmer active>
                            <Loader size='massive'>Loading</Loader>
                        </Dimmer>

                    </Segment>
                </div>
            </Transition>
        )
    }
}

export default Profile