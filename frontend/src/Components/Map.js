import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
@observer
class Map extends Component {
    render() {
        return (
            <LoadScript
                    id="script-loader"
                    googleMapsApiKey="AIzaSyB6nG0vhkO7C_97rSGJhs2cYm3rKE7bUf8"
                    googleMapsClientId="">
                <GoogleMap
                    id="circle-example"
                    mapContainerStyle={{
                        height: "100%",
                        width: ""
                    }}
                    zoom={11} center={{lat:52.3366039, lng:4.8667033}}/>
            </LoadScript >
        )
    }
}

export default Map