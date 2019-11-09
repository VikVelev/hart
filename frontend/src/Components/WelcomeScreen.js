import React, { Component } from 'react'
import { observer } from 'mobx-react';
import './sass/WelcomeScreen.scss'
import { Container, Divider, Form, } from 'semantic-ui-react'
import axios from 'axios';
import { Redirect } from "react-router-dom";

@observer
class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: "",
            city: "",
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
            city: this.state.city
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
                <Container className="title" textAlign='center'>Where are you going today?</Container>
                <Container className="WelcomeScreenContent">
                    <Divider />

                    <Form onSubmit={this.handleSubmit} size={"big"}>
                        <Form.Group >
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
                        </Form.Group>

                        <Form.Button size={"large"} color={"blue"}>Next</Form.Button>
                    </Form>
                    {this.state.submitted ? <Redirect push to="/profile"></Redirect> : null}


                </Container>



            </div>
        )
    }
}

export default WelcomeScreen;