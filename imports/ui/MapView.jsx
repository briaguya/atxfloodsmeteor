import React from 'react'
import ReactDOM from 'react-dom'
import { Map, TileLayer } from 'react-leaflet'
const position = [30.264792,-97.747214]

export default class MapView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Map
          style={{height: "400px"}}
          center={position}
          zoom={10}>
          <TileLayer
            url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' />
        </Map>
      </div>
    )
  }
}