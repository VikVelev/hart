import React, { Component } from 'react'
import { Segment, Transition, Card, Button } from 'semantic-ui-react'
import { parse } from 'path';
import { observer } from 'mobx-react';

@observer
export default class TripPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            stops: [],
            toggled:[],
            tags: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        }

        this.handleTripChange = this.handleTripChange.bind(this);
    }

    componentDidMount() {

        console.log(this.props.store)
        setTimeout(() => {
            this.setState({ visible: true });
        }, 800);
    }

    handleTripChange(stop){
        this.setState({toggled:this.state.toggled.map((value,index)=>stop ==index? true:false)})
        this.props.onTripChange(stop);
    }

    render() {
        console.log(this.props.store)
        const parsedString = this.props.store.tripRoute.map(value => value.origin.split(',')[0])
        console.log(parsedString)
        return (
            <Transition visible={this.state.visible} animation="slide up" duration={500}>
                <Segment className="TripPlan">
                    <Card.Group>
                        {parsedString.map((stop, index) =>
                            <Card className="tripCard" fluid key={index}>
                                <Card.Header>{this.state.tags[index]}</Card.Header>
                                <Card.Content>{stop}</Card.Content>
                                <Button toggle active ={this.state.toggled[index]} color="red" toggle onClick={() => this.handleTripChange(index)}  className="close-button"  icon ='close'></Button>
                            </Card>
                        )}
                    </Card.Group>
                </Segment>
            </Transition>

        )
    }
}
