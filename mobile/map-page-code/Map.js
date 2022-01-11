import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InputBar from './components/InputBar';
import MapDisplay from './components/MapDisplay';
import Geolocation from 'react-native-geolocation-service';
import {markers} from './data/markers';

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization("whenInUse");
    if(auth === "granted") {
       console.log("granted")
       return true;
    }
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    }
  }
}

class Map extends React.Component {
  constructor () {
    super();
    this.state = {
      locationInput: "",
    }
    this.inputBar = React.createRef()
    this.mapDisplay = React.createRef()

  }
  componentDidMount(){
    if (requestPermissions()) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          this.setState({region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922*4,
            longitudeDelta: 0.0421*4
          }});
          console.log(this.state.region)
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    }
  }


  render() {   
    return (     
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(234, 234, 234, 1)',
          '#03A9CB',
          'rgba(234, 234, 234, 1)',]}
          style={styles.background}
        />
        <InputBar 
          textChange={locationInput => {
            this.setState({locationInput})
          }}
          locationInput={this.state.locationInput}
          style1={styles.inputContainer}
          style2={styles.input}
          onEnter={() => {
            this.pinSearch(this.state.locationInput)
          }}
          ref={this.inputBar}
          defaultValue={"Search For Locations"}
        />
        <MapDisplay 
          style={styles.mapPreview} 
          latitude={1/*this.props.position.latitude*/} 
          longitude={1/*this.props.position.longitude*/}
          region={this.state.region ? this.state.region : {
            latitude: 0, 
            longitude: 0, 
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          zoom={0.3}
          markers = {markers}
          ref = {(ref)=>this.mapDisplay=ref}
          id={"yo"}
        />
      </View>
    );
  }

  pinSearch(text) {
    for (const marker of markers) { 
      if (text && marker.title.startsWith(text)) {
        console.log(marker);
        const region = {
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        console.log(region)
        this.setState({region})

      }
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  background: {
   position: 'absolute',
   left: 0,
   right: 0,
   top: 0,
   height: "100%",
  },
  mapPreview: {
    height: "82%",
    width: "95%",
    backgroundColor: "black",
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#171717',
    shadowOpacity: .1,
    paddingBottom: 20,
    marginTop: 55
  },
  input: {
    backgroundColor: '#F3F3F3',
    flex: .92,
    fontSize: 18,
    height: 35,
    borderRadius: 18,
    paddingHorizontal: 15,
  },
});

export default Map;