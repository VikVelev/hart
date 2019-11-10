import React, { Component } from 'react'
import { Segment, Transition, Card, Button } from 'semantic-ui-react'

export default class TripPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            stops: [],
            tags: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        }
    }

    componentDidMount() {

        // please insert proper model
        const responseString = [{
            origin: "Keizersgracht 672, 1017 ET Amsterdam, Netherlands",
            destination: "Oosterpark Amsterdam, Oosterpark, 1091 AC Amsterdam, Netherlands"
        },
        {
            origin: "Oosterpark Amsterdam, Oosterpark, 1091 AC Amsterdam, Netherlands",
            destination: "Dam 20, 1012 NP Amsterdam, Netherlands"
        },
        {
            origin: "Dam 20, 1012 NP Amsterdam, Netherlands",
            destination: "Oudezijds Achterburgwal 54, 1012 DP Amsterdam, Netherlands"
        },
        {
            origin: "Oudezijds Achterburgwal 54, 1012 DP Amsterdam, Netherlands",
            destination: "Prins Hendrikkade 73, 1012 AD Amsterdam, Netherlands"
        },
        {
            origin: "Prins Hendrikkade 73, 1012 AD Amsterdam, Netherlands",
            destination: "Stadhouderskade 78, 1072 AE Amsterdam, Netherlands"
        }]

        const parsedString = responseString.map(value => value.origin.split(',')[0])
        // parsedString.push(responseString[responseString.length-1].destination)
        console.log(parsedString)
        // setTimeout(() => {
        //     this.setState({ visible: true, stops: parsedString });
        // }, 800);
        this.setState(() => ({ visible: true, stops: parsedString }));

    }

    render() {
        return (
            <Transition visible={this.state.visible} animation="slide up" duration={500}>
                <Segment className="TripPlan">
                    <Card.Group>
                        {this.state.stops.map((stop, index) =>
                            <Card className="tripCard" fluid key={index}>
                                <Card.Header>{this.state.tags[index]}</Card.Header>
                                <Card.Content>{stop}</Card.Content>
                                <Button  className="close-button"  icon ='close button'></Button>

                            </Card>

                        )}
                    </Card.Group>
                </Segment>
            </Transition>

        )
    }
}
