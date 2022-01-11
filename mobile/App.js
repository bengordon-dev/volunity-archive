import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Profile from './Profile.js';
import News from './News.js';
import Donate from './Donate.js';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import Volunteer from './Volunteer.js';
import Login from './Login';
//import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
//import * as Progress from "react-native-progress";
//import Swiper from 'react-native-swiper'
//import { NavigationEvents } from 'react-navigation';
import {DeviceEventEmitter} from "react-native"
import Home from './Home.js';

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
      // do something if granted...
    }
  }
}

 
const Tab = createBottomTabNavigator(); 
 
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: "madison023",
      firstName: "Madison",
      lastName: "Campbell",
      profilePictureSource: require("./assets/images/pfp.jpeg"),
      rank: "Platinum",
      hours: 20,
      hoursGoal: 40,
      points: 100,
      pointsGoal: 200,
      loggedIn: false,
      theme: ['rgba(234,234,234, 1)', 'rgba(234,234,234, 1)', 'rgba(234,234,234, 1)'], 
      //theme: ['#03A9CB','rgba(234, 234, 234, 1)','#03A9CB'],
    }
  }
  componentDidMount(){ // map stuff
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
          //this.props.navigation.navigate('Home', {region: this.state.region})
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    }

    DeviceEventEmitter.addListener("signout", (eventData) => 
     this.signOut());


  }
  
  signOut() {
    this.setState({loggedIn: false})
  }


  render() {
  if (this.state.loggedIn) {
  return (
    <NavigationContainer signOut={this.signOut}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'News') {
              iconName = 'newspaper-outline';
            } else if (route.name === 'Donate') {
              iconName = 'cart';
            } else if (route.name === 'Volunteer') {
              iconName = 'hand-right';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          "tabBarActiveTintColor": "teal",
          "tabBarInactiveTintColor": "gray",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ],
          headerShown: false

        })}
        
        initialRouteName="Home"
      >
        <Tab.Screen name="Profile" component={Profile} initialParams={{appState: this.state, /*signOut: this.signOut*/}}/>
        <Tab.Screen name="Donate" component={Donate} initialParams={{appState: this.state}}/>
        <Tab.Screen options={{tabBarStyle: {display: 'none'}}} name="Home" component={Home} initialParams={{appState: this.state}}/>
        <Tab.Screen name="News" component={News} initialParams={{appState: this.state}}/>
        <Tab.Screen name="Volunteer" component={Volunteer} initialParams={{appState: this.state}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
  }
  else {
    return (
      <Login appState={this.state}
      signUp={(fn, ln) => {
        this.setState({loggedIn: true, firstName: fn, lastName: ln})
      }}
      logIn={() => {
        this.setState({loggedIn: true})
      }}
      />
    )
  }
  }
}

 
const styles = StyleSheet.create({
  
});
