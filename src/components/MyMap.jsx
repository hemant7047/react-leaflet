import React, { Component } from 'react'
import { MapContainer, GeoJSON } from "react-leaflet"
import mapData from './../data/countries.json'
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import { click } from '@testing-library/user-event/dist/click';

class MyMap extends Component {
    state = { color: "#ffff00" }
    color = ["green", "red", "yellow", "navy", "pink"];
    componentDidMount() {
        console.log(mapData);
    }
    countryStyle = {
        fillColor: 'red',
        fillOpacity: .7,
        color: "#000",
        weight: "2"
    }

    printMesaageToConsole = (event) => {
        console.log("Clicked");
    }

    changeCountryColor = (event) => {
        event.target.setStyle({
            color: "green",
            fillColor: this.state.color,
            fillOpacity: 1
        });
    }

    colorChange = (event) => {
        this.setState({ color: event.target.value })
    }

    onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        console.log(countryName);
        layer.bindPopup(countryName);
        layer.options.fillOpacity = Math.random();
        // const colorIndex = Math.floor(Math.random() * this.color.length);
        // layer.options.fillColor = this.color[colorIndex];


        layer.on({
            click: this.changeCountryColor,
            // mouseover: this.changeCountryColor,
        });
    }

    render() {
        return (<div>
            <h1 style={{ textAlign: "center" }}>World Map 🌎</h1>
            <MapContainer
                style={{ height: "80vh" }}
                zoom={2}
                center={[20, 100]}>

                <GeoJSON
                    style={this.countryStyle}
                    data={mapData.features}
                    onEachFeature={this.onEachCountry}
                />
            </MapContainer>
            <input type="color" value={this.state.color} onChange={this.colorChange} />
        </div>);
    }
}
export default MyMap;   