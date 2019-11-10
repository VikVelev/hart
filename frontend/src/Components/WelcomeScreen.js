import React, { Component } from 'react'
import { observer } from 'mobx-react';
import './sass/WelcomeScreen.scss'
import { Container, Divider, Form, Button, Transition } from 'semantic-ui-react'
import axios from 'axios';
import { Redirect } from "react-router-dom";

@observer
class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: "",
            city: "",
            time: 1,
            budget: "1",
            submitted: false,
            // location, time, money
            currentView: 0,
        };
    }

    stateMachine = ["location", "time", "money"]

    getLocationView = () => {
        return (
            <Form.Group className="placeForm animationGroup">
                <Container className="title firstHeader" 
                           textAlign='center'
                           >
                    Where are you going today?
                    <Divider />
                </Container>
                <Form.Dropdown
                    className="countryForm"
                    placeholder='Select Country'
                    fluid
                    search
                    selection
                    name="country"
                    onChange={this.handleChange}
                    options={this.countryOptions}
                />
                <Form.Dropdown
                    className="cityForm"
                    placeholder='Select City'
                    fluid
                    search
                    selection
                    name="city"
                    onChange={this.handleChange}
                    options={this.stateOptions}
                />
            </Form.Group>
        );
    }

    getTimeView = () => {
        return (
            <Form.Group className="timeForm animationGroup" >
                <Container className="title" textAlign='center'>
                    How much time do you want to spend?
                <Divider />
                </Container>
                <Button.Group size={"big"}>
                    <Form.Button type="button" 
                                 onClick={() => { 
                                    this.setState({
                                         time: (this.state.time > 0 ? this.state.time - 0.5 : 0)
                                    }) 
                                 }}
                                 icon='left chevron'
                    />
                    <Form.Button className="middleButton">
                        {this.state.time} { this.state.time > 1 ? "hrs" : "hr" }
                    </Form.Button>
                    <Form.Button type="button"
                                 onClick={() => {
                                    this.setState({
                                        time: (this.state.time + 0.5)
                                    }) 
                                }} 
                                icon='right chevron' 
                    />
                </Button.Group>
            </Form.Group>
        )
    }

    getMoneyView = () => {
        return(
            <Form.Group className="costForm animationGroup">
                <Container className="title" textAlign='center'>
                    How much money do you want to spend?
                <Divider size="small"/>
                </Container>

                <Container className="checkboxContainer">
                    <Form.Radio
                        label="I don't mind spending a bit"
                        value='0'
                        name='budget'
                        checked={this.state.budget === "0"}
                        onChange={this.handleChange} />
                    <Form.Radio
                        label='Low Cost'
                        value='1'
                        name='budget'
                        checked={this.state.budget === "1"}
                        onChange={this.handleChange} />
                    <Form.Radio
                        label='University Student'
                        value='2'
                        name='budget'
                        checked={this.state.budget === "2"}
                        onChange={this.handleChange} />
                </Container>
            </Form.Group>
        );
    }

    viewMap = {
        "location": this.getLocationView.bind(this),
        "time":     this.getTimeView.bind(this),
        "money":    this.getMoneyView.bind(this),
    }

    changeForm = (e, { name, value }) => {

        if(name === "next") {
            this.setState({
                currentView: (this.state.currentView + 1)
            })
        }

        if(name === "prev") {
            this.setState({
                currentView: (this.state.currentView - 1)
            })
        }
    }

    handleSubmit = () => {
        /*
            Post request with chosen city and country
            this.setState({ submitted: true });
        */
        axios.post('/', {
            country: this.state.country,
            city:    this.state.city,
            time:    this.state.time
        }).then(function (response) {
            this.setState({ submitted: true });
        }).catch(function (error) {
            console.log(error);
        });
        this.setState({ submitted: true });
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    render() {
        this.countryOptions = [
            { key: 'nl', value: 'nl', flag: 'nl', text: 'Netherlands' },
            { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan', disabled: true },
            { key: 'al', value: 'al', flag: 'al', text: 'Albania', disabled: true },
            { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria', disabled: true },
            { key: 'as', value: 'as', flag: 'as', text: 'American Samoa', disabled: true },
            { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra', disabled: true },
            { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola', disabled: true },
            { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla', disabled: true },
            { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua', disabled: true },
            { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina', disabled: true },
            { key: 'am', value: 'am', flag: 'am', text: 'Armenia', disabled: true },
            { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba', disabled: true },
            { key: 'au', value: 'au', flag: 'au', text: 'Australia', disabled: true },
            { key: 'at', value: 'at', flag: 'at', text: 'Austria', disabled: true },
            { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan', disabled: true },
            { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas', disabled: true },
            { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain', disabled: true },
            { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh', disabled: true },
            { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados', disabled: true },
            { key: 'by', value: 'by', flag: 'by', text: 'Belarus', disabled: true },
            { key: 'be', value: 'be', flag: 'be', text: 'Belgium', disabled: true },
            { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize', disabled: true },
            { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin', disabled: true },
        ]

        this.stateOptions = [
            {
                key: "Amsterdam",
                text: "Amsterdam",
                value: "Amsterdam",
                disabled: false
            },
            {
                key: "Delft",
                text: "Delft",
                value: "Delft",
                disabled: true
            },
            {
                key: "Rotterdam",
                text: "Rotterdam",
                value: "Rotterdam",
                disabled: true
            },
            {
                key: "The Hague",
                text: "The Hague",
                value: "The Hague",
                disabled: true
            },
            {
                key: "Eindhoven",
                text: "Eindhoven",
                value: "Eindhoven",
                disabled: true
            },
            {
                key: "Groningen",
                text: "Groningen",
                value: "Groningen",
                disabled: true
            },
        ]

        return (
            <Transition transitionOnMount animation="fade" duration={500}>
                <div className="WelcomeScreen" >
                    <Container className="WelcomeScreenContent">
                        <Form size={"huge"}>
                            <Transition.Group animation='fade' duration={500}>
                                {this.state.currentView === 0 && this.viewMap[this.stateMachine[0]]()}
                                {this.state.currentView === 1 && this.viewMap[this.stateMachine[1]]()}
                                {this.state.currentView === 2 && this.viewMap[this.stateMachine[2]]()}
                            </Transition.Group>

                            <Container className="buttonContainer">
                                <Button disabled={this.state.currentView == 0}
                                        onClick={this.changeForm} 
                                        size="large"
                                        color="blue"
                                        name="prev"
                                        content="Prev"
                                        icon='left arrow'
                                        labelPosition='left'
                                    />
                                <Button disabled={this.state.currentView == this.stateMachine.length - 1}
                                        onClick={this.changeForm} 
                                        size="large" 
                                        color="blue"
                                        name="next" 
                                        content='Next' 
                                        icon='right arrow' 
                                        labelPosition='right' 
                                    />
                            </Container>

                            <Transition visible={ this.state.currentView == 2 } animation='fade' duration={500}>
                                <Form.Button className="submitButton" onClick={this.handleSubmit} size="large" color="blue">Submit</Form.Button>
                            </Transition>
                        </Form>
                        {this.state.submitted && (<Redirect push to="/profile"></Redirect>)}
                    </Container>
                </div>
            </Transition>
        )
    }
}

export default WelcomeScreen;