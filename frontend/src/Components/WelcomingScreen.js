import React, { Component } from 'react'

export default class WelcomingScreen extends Component {
    constructor(props){
        super(props);
        this.state ={
            sites:[]
        };
    }
    componentDidMount(){
    const sites = [{name:"Foo bar"}, {name:"Bar baz"}, {name:"Baz Qux"}]
    }
    render() {
        return (
            <div>
                {sites.map((site, key) => {
                    
                })}
                
            </div>
        )
    }
}
