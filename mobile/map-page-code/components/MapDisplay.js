import React from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        markers: this.props.markers,
    }
    this.map = React.createRef()
  }

  render() {
    return (
      <MapView style={this.props.style} 
        region={this.props.region} 
        showsUserLocation={true}
        ref = {(ref)=>this.map=ref}
      >
        {this.state.markers && this.state.markers.map((marker, key) => (
          <Marker
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.title}
            description={marker.description}
            key={key}
          />
        ))}
        

      </MapView>
    );
  }
};
export default MapDisplay;