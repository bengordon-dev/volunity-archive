import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import MapView from 'react-native-maps';
import * as Progress from "react-native-progress";
import Swiper from 'react-native-swiper'
//import { NavigationEvents } from 'react-navigation';
import {DeviceEventEmitter} from "react-native"
  

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.appState = this.props.route.params.appState
  }
  componentDidMount() {
  
  }

  rankColor(color) {
    if (color == "#B7B4B1") {
      return "#ccc"
    }
    return "#fff"
  }

  render() {
  return (
    <SafeAreaView style={styles.container}>
      {/*<NavigationEvents
        onWillFocus={() => {
          console.log("shawn")    
        }}
      />*/}
      <LinearGradient
        colors={this.appState.theme}
        style={styles.background}
      />

      <Text style={styles.title} onPress={() => console.log("sad")/*this.props.signOut*/}>Volunity</Text>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Volunteer')}  style={styles.volunteerButton}>
        <Swiper
          autoplay={true}
          autoplayTimeout={8}
          style={{marginTop: 20}}
          dot={
            <View
              style={{
                height: 7,
                width: 7,
                borderRadius: 7,
                backgroundColor: 'grey',
                marginHorizontal: 5
              }}
            />
          }
          activeDot={
            <View
              style={{
                height: 7,
                width: 7,
                borderRadius: 7,
                backgroundColor: 'white',
                marginHorizontal: 5,
                borderColor: "grey"
              }}
            />
          }
        >
        <View style={styles.localSlide}>
        <Text style={[styles.opportunityText, {top:50, marginBottom: 15, alignSelf: "flex-start", fontWeight: "800", textAlign: 'center', marginLeft: 55}]}>Recently Viewed</Text>
        <Image 
          style={[styles.volunteerOpIcon, {top: 50}]}
          source={require('./assets/images/ada-jenkins.png')}
        />
        <Image 
          style={[styles.volunteerOpIcon, {top: 70}]}
          source={require('./assets/images/Red-Cross.jpeg')}
        />
        <Text style={[styles.opportunityText, {bottom: 50, marginLeft: 40}]}> Food Pantry Volunteer</Text>
        <Text style={[styles.opportunityText, {top: 5, marginLeft: 40}]}> Blood Drive Host</Text>
        </View>
        <View style={styles.localSlide}>
        <Text style={[styles.opportunityText, {top:50, marginBottom: 15, marginLeft: 105}]}>Youth</Text>
        <Image 
          style={[styles.volunteerOpIcon, {top: 50}]}
          source={require('./assets/images/ada-jenkins.png')}
        />
        <Image 
          style={[styles.volunteerOpIcon, {top: 70}]}
          source={require('./assets/images/Red-Cross.jpeg')}
        />
        <Text style={[styles.opportunityText, {bottom: 50, marginLeft: 40}]}> Food Pantry Volunteer</Text>
        <Text style={[styles.opportunityText, {top: 5, marginLeft: 40}]}> Blood Drive Host</Text>
        </View>
        <View style={styles.localSlide}>
        <Text style={[styles.opportunityText, {top:50, marginBottom: 15, marginLeft: 70}]}>Food Insecurities</Text>
        <Image 
          style={[styles.volunteerOpIcon, {top: 50}]}
          source={require('./assets/images/ada-jenkins.png')}
        />
        <Image 
          style={[styles.volunteerOpIcon, {top: 70}]}
          source={require('./assets/images/feed-nc.jpeg')}
        />
        <Text style={[styles.opportunityText, {bottom: 50, marginLeft: 40}]}> Food Pantry Volunteer</Text>
        <Text style={[styles.opportunityText, {top: 5, marginLeft: 40}]}> Operations Volunteer</Text>
          </View>
        </Swiper>
        <Text style={styles.volunteerText}>Volunteer Opportunities</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => this.props.navigation.navigate('Donate')} style={styles.donateButton}>
      <Image 
          style={[styles.donateImage, {top: 0}]}
          source={require('./assets/images/feed-nc.jpeg')}
          />
          <Text style={{alignSelf: "flex-start", fontFamily: 'Helvetica Neue', fontWeight: "bold", fontSize: 15, marginLeft: 25, marginBottom: 5, textAlign: "center"}}>Donate Canned Goods</Text>
          <Image 
          style={[styles.donateImage, {top: 0}]}
          source={require('./assets/images/grin-kids.png')}
          />
          <Text style={{alignSelf: "flex-start", fontFamily: 'Helvetica Neue', fontWeight: "bold", fontSize: 15, marginLeft: 35, textAlign: "center"}}>Donate $5.00</Text>
          <Text style={styles.donateText}>Donate</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.profileButton}>
        <Image style={styles.profileIcon} source={this.appState.profilePictureSource}/>
        <Progress.Bar progress={this.appState.points/this.appState.pointsGoal} color= "#00ff00" height={15} borderRadius={7} style={{marginVertical: 17}}/>
        <Text style={styles.profileName}>{this.appState.firstName}</Text>
        <Text style={{color: this.rankColor(this.appState.rank), fontWeight: "bold", fontSize: 30, marginBottom: 12, marginTop: 5 }}>
          {this.appState.rank}
          </Text>
        <Text style={styles.profileText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => this.props.navigation.navigate('News')} style={styles.mapButton}>
        <Text style={styles.mapText}>News</Text>
        <View style={{flexDirection: "row"}}>
        <Image style={styles.newsOrganization} source={require('./assets/images/Associated-Press.png')}/>
        <Text style={styles.newsHeadline}>After featuring in One Good Thing, volunteers keep giving</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: 'black',
    fontFamily: 'Arial Black',
    alignContent: 'center',
    bottom: 11,
    fontWeight: "800",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 845,
  },

  volunteerButton: {
    position: 'absolute',
    left: 13,
    top: 109,
    backgroundColor: 'rgba(0, 0, 0, .075)',
    height: 251,
    width: 363,
    borderRadius: 40,
  },
  volunteerText: {
    fontWeight: '600',
    color: '#5D5D5D',
    transform: [{rotate: '0deg'}],
    left: 45,
    fontSize: 25,
    fontFamily: 'Helvetica Neue',
    marginBottom: 10,
    marginTop: -15,
  },
  volunteerInformation: {
    fontWeight: 'bold',
    color: 'black',
    transform: [{rotate: '0deg'}],
    top: -107,
    left: 215,
    fontSize: 72.5,
    fontFamily: 'Helvetica Neue'
  },
  volunteerHours: {
    fontWeight: 'bold',
    color: 'black',
    transform: [{rotate: '0deg'}],
    top: -112,
    left: 189,
    fontSize: 23.5,
    fontFamily: 'Helvetica Neue'
  },
  volunteerOpIcon: {
    width: 60, 
    height: 60, 
    borderRadius: 60,
    marginLeft: 17,
    top: 16,
  },
  newsOpIcon: {
    width: 31, 
    height: 32, 
    borderRadius: 16,
    marginLeft: 17,
    top: 16,
  },
  opportunityText: {
    fontWeight: 'bold',
    color: '#5D5D5D',
    transform: [{rotate: '0deg'}],
    fontFamily: 'Helvetica Neue',
    left: 55,
    fontSize: 18,
  },

  donateButton: {
    position: 'absolute',
    left: 209,
    top: 373,
    backgroundColor: 'rgba(0, 0, 0, .075)',
    height: 289,
    width: 168,
    borderRadius: 40,
    justifyContent: "flex-end",
  },
  donateText: {
    fontWeight: '600',
    color: '#5D5D5D',
    alignSelf: "center",
    fontSize: 25,
    fontFamily: 'Helvetica Neue',
    marginBottom: 10
  },
  topStories: {
    alignSelf: "center", 
    color: "#5D5D5D", 
    fontWeight: "bold", 
    fontSize: 15,
    //marginTop: 10,
    marginBottom: 9,
    fontFamily: 'Helvetica Neue',
  },
  topStorySource: {
    alignSelf: "center",
    height: 15,
    width: 87,
    marginBottom: 15
  },

  profileButton: {
    position: 'absolute',
    left: 13,
    top: 373,
    backgroundColor: 'rgba(0, 0, 0, .075)',
    height: 289,
    width: 168,
    borderRadius: 40,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  profileIcon: {
    height: 84,
    width: 84,
    borderRadius: 40,
    marginTop: 20,
    top: 4,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5
  },
  profileText: {
    fontWeight: '600',
    color: '#5D5D5D',
    fontSize: 25,
    fontFamily: 'Helvetica Neue',
    marginBottom: 10,
    marginTop: 10
  },
  mapButton: {
    position: 'absolute',
    left: 13,
    top: 675,
    backgroundColor: 'rgba(0, 0, 0, .075)',
    height: 143,
    width: 362,
    borderRadius: 40,
    overflow: "hidden"
  },
  mapText: {
    textAlign: "center",
    fontSize: 30,
    top: 5,
    fontWeight: "600",
    color: "gray",
    fontWeight: '600',
    color: '#5D5D5D',
    fontSize: 25,
    fontFamily: 'Helvetica Neue',
  },
  localSlide: {
    top: -55
  },
  newsOrganization: {
    height: 90,
    width: 90,
    alignSelf: "flex-start",
    borderRadius: 20,
    marginTop: 5,
    marginLeft: 10
  },
  newsHeadline: {
    marginTop: 25,
    flexWrap: "wrap",
    width: 250,
    marginLeft: 5,
    fontSize: 17,
    textAlign: "center",
  },
  donateImage: {
    height: 80,
    width: 80,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 5,
  }
});
