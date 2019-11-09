import React, { Component } from 'react'
import { observer } from 'mobx-react';
import './sass/WelcomeScreen.scss'
import { Container, Divider, Form, Button } from 'semantic-ui-react'
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
            budget: 1,
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit() {
        /* 
        Post request with chosen city and country
                this.setState({ submitted: true });
        */
        axios.post('/', {
            country: this.state.country,
            city: this.state.city,
            time: this.state.time
        }).then(function (response) {
            console.log(response);
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
        const countryOptions = [
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
        const stateOptions = [{
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
            <div className="WelcomeScreen" >
                <Container className="WelcomeScreenContent">
                    <Form onSubmit={this.handleSubmit} size={"big"}>
                        <Form.Group className="placeForm">
                            <Container className="title" textAlign='center'>
                                Where are you going today?
                                <Divider />

                            </Container>
                            <Divider />
                            <Form.Dropdown
                                className="countryForm"
                                placeholder='Select Country'
                                fluid
                                search
                                selection
                                name="country"
                                onChange={this.handleChange}
                                options={countryOptions}
                            />
                            <Form.Dropdown
                                className="cityForm"
                                placeholder='Select City'
                                fluid
                                search
                                selection
                                name="city"
                                onChange={this.handleChange}
                                options={stateOptions}
                            />
                            <Container className="buttonContainer">
                                <Button disabled onClick={this.changeForm} size={"large"} color={"blue"} content='Prev' icon='left arrow' labelPosition='left' />
                                <Button onClick={this.changeForm} size={"large"} color={"blue"} content='Next' icon='right arrow' labelPosition='right' />

                            </Container>
                        </Form.Group>

                        <Form.Group className="timeForm" >
                            <Container className="title" textAlign='center'>
                                How much time do you want to spend?
                            <Divider />
                            </Container>
                            <Button.Group size={"big"}>
                                <Form.Button type="button" onClick={() => { this.setState({ ...this.state, time: --this.state.time }) }} icon icon='left chevron' />
                                <Form.Button className="middleButton">{this.state.time}</Form.Button>
                                <Form.Button type="button" onClick={() => { this.setState({ ...this.state, time: ++this.state.time }) }} icon icon='right chevron' />
                            </Button.Group>
                            <Container className="buttonContainer">
                                <Button onClick={this.changeForm} size={"large"} color={"blue"} content='Prev' icon='left arrow' labelPosition='left' />
                                <Button onClick={this.changeForm} size={"large"} color={"blue"} content='Next' icon='right arrow' labelPosition='right' />
                            </Container>
                        </Form.Group>

                        <Form.Group className="costForm">
                            <Container className="title" textAlign='center'>
                                How much money do you want to spend?
                            <Divider />
                            </Container>

                            <Container className="checkboxContainer">
                                <Form.Radio
                                    label="I don't mind spending a bit"
                                    value='0'
                                    checked={this.state.budget === 0}
                                    onChange={this.handleChange} />
                                <Form.Radio
                                    label='Low Cost'
                                    value='1'
                                    checked={this.state.budget === 1}
                                    onChange={this.handleChange} />
                                <Form.Radio
                                    label='University Student'
                                    value='2'
                                    checked={this.state.budget === 2}
                                    onChange={this.handleChange} />
                            </Container>
                            <Container className="buttonContainer">
                                <Button onClick={this.changeForm} size={"large"} color={"blue"} content='Prev' icon='left arrow' labelPosition='left' />
                                <Button disabled onClick={this.changeForm} size={"large"} color={"blue"} content='Next' icon='right arrow' labelPosition='right' />
                            </Container>
                            <Form.Button size={"large"} color={"blue"}>Submit</Form.Button>
                        </Form.Group>
                    </Form>
                    {this.state.submitted ? <Redirect push to="/profile"></Redirect> : null}


                </Container>



            </div >
        )
    }
}

export default WelcomeScreen;