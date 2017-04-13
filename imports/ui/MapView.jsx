import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet';
const position = [30.264792,-97.747214];

export default class MapView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var markers = [];
    this.props.crossings.forEach(function(crossing) {
      const position = [crossing.geoJSON.lat, crossing.geoJSON.lng];
      markers.push(
        <CircleMarker 
          center={position}
          color={crossing.status === "open" ? "green" : (crossing.status === "closed" ? "red" : "orange")}
          radius={10}
          key={crossing._id}>
          <Popup>
            <span>{crossing.geoJSON.name}</span>
          </Popup>
        </CircleMarker>
      );
    });

    return (
      <div>
        <Map
          style={{height: "400px"}}
          center={position}
          zoom={10}>
          <TileLayer
            url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' />
          {markers}    
        </Map>
      </div>
    )
  }
}

MapView.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  crossings: PropTypes.array.isRequired,
};