import React, { Component } from 'react'
import { Segment, Transition, Card, Button } from 'semantic-ui-react'
import { parse } from 'path';
import { observer } from 'mobx-react';

@observer
export default class TripPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        }

        this.handleTripChange = this.handleTripChange.bind(this);
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({ visible: true });
        }, 800);
    }

    handleTripChange(stop) {
        this.props.store.toggleTripRoute(stop);
    }

    render() {
        let visibleCounter = 0;

        return (
            <Transition visible={this.state.visible} animation="slide up" duration={500}>
                <Segment className="TripPlan">
                    <Card.Group>
                        {this.props.store.tripRoute.map((el, index) =>
                            <Card className="tripCard" fluid key={index}>
                                <Card.Header>{el.visible ? this.state.tags[visibleCounter++] : " "}</Card.Header>
                                <Card.Content>{el.name.split(",")[0]}</Card.Content>
                                <Button active={el.visible} color="red" toggle onClick={() => this.handleTripChange(index)} className="close-button" icon='close'></Button>
                            </Card>
                        )}
                    </Card.Group>
                </Segment>
            </Transition>

        )
    }
}
