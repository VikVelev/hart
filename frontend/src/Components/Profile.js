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
            sitesOnDisplay: [],
            progress: 0, // progress bar state
            display: 4 // max sites on page 
        };
        this.onDecision = this.onDecision.bind(this);
        this.takeRandom = this.takeRandom.bind(this);3
    }
    componentDidMount() {
        const sites = [{ key: "a", name: "Kur 1", picked: false }, 
        { key: "b", name: "Kur 2", picked: false }, 
        { key: "c", name: "Kur 3", picked: false }, 
        { key: "d", name: "Kur 4", picked: false }, 
        { key: "e", name: "Kur 5", picked: false }, 
        { key: "f", name: "Kur 6", picked: false }, 
        { key: "g", name: "Kur 8", picked: false },
        { key: "h", name: "Kur 9", picked: false },
        { key: "i", name: "Kur 10", picked: false }]
        const shuffle = this.takeRandom(this.state.display, sites.length); // take display amount of indexes from site.length indexes
        const sitesOnDisplay = sites.filter((site,index) => shuffle.includes(index)); // filter sites with matching index into onDisplay state 
        sites.forEach((site,index)=> {
            if(shuffle.includes(index)){
                site.picked = true;
            }
        })
        this.setState({...this.state, sites: sites, sitesOnDisplay: sitesOnDisplay});
    }


    takeRandom(displaySize, arraySize){
        let arr = [];
        while(arr.length<displaySize){
            let r = Math.floor(Math.random()*arraySize)
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    }

    //returns index of possible element
    newRandom(array){
        //filter unpicked sites
        const choices = array.filter(site => site.picked === false);
        //return random unpicked site
        return choices[Math.floor(Math.random()*choices.length)]
    }
    onDecision(key, accepted) {
        let sites = this.state.sites;
        let sitesOnDisplay  = this.state.sitesOnDisplay;

        const replacement = this.newRandom(sites); // get replacement from existing state
        sites.forEach((site,index) => {
            if(site.key == replacement.key){
                site.picked = true;
            }
        })
        sitesOnDisplay = sitesOnDisplay.map((value,index)=> value.key === key ? replacement : value) //remove accepted key 

        this.props.store.addSite(key, accepted) // updates store      
        this.setState({...this.state, sites:sites, 
            sitesOnDisplay:sitesOnDisplay, 
            progress: this.state.progress >= 100 ? 100 : this.state.progress + 20  }) // push state changes

    }

    render() {
        return (
            <div className="Profile">
                <Container className="title" textAlign='center'>Center Aligned:</Container>
                <Container className="profileContent">
                    <Divider />
                    <Card.Group>
                        {this.state.sitesOnDisplay.map((site, key) =>
                            <SiteCard handleDecision={this.onDecision} siteInfo={site} key={key}></SiteCard>
                        )}

                    </Card.Group>
                    <Progress className="progressBar" percent={this.state.progress} indicating />

                </Container>
            </div>
        )
    }
}

export default Profile