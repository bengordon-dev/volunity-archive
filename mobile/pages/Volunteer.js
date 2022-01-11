import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import VolunteerOp from './components/VolunteerOp.js';
import Filters from './components/Filters';
import { createStackNavigator } from '@react-navigation/stack';
import VolunteerScreen from './components/VolunteerScreen'
import { opData } from "./data/opportunities.js";
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import OrgProfile from "./components/OrgProfile.js";
import { orgInfo } from "./data/newOrgs.js";
import { TextInput } from "react-native-gesture-handler";


function stringMatch(name, input) {
  proper = name.toLowerCase()
  inp = input.toLowerCase()
  if (proper.startsWith(inp))
  {
    return input.length + 1
  }
  else if (proper.includes(inp))
  {
    return input.length
  }
  return 0;
  let inpWords = inp.splt(" ")
  let nameWords = proper.split(" ")  
}


class Volunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunities: props.route.params.opportunities,
      opInput: ""
    }
    this.appState = this.props.route.params.appState
  }
  selectOption() {
    this.setState({dropdownOpened: false})
  }
  render() {
  
    return (
      <View style={styles.container}>
      <LinearGradient
        colors={this.appState.theme}
        style={styles.background}
      />
      <Text style={styles.title}>Volunteer</Text>
      <TextInput style={styles.searchBar}
      onChangeText={(opInput) => {
        this.setState({opInput})
        newOps = opInput.length > 0 ? opData.slice(0).filter(item => stringMatch(item.jobTitle, opInput) > 0) : opData
        if (opInput.length > 0) {newOps.sort(((a, b) => (stringMatch(a.jobTitle, opInput) > stringMatch(b.jobTitle, opInput)) ? -1 : 1))}
        this.setState({opportunities: newOps})
      }}

      placeholderTextColor="#5D5D5D"
          placeholder={"Search"}
          clearTextOnFocus={this.state.locationInput? false : true}
      />
      <ScrollView style={{marginBottom: 0, maxHeight: 30}} horizontal={true} bounce={false}>
        <Filters text={"Upcoming"} onPress={() => {
          ops = this.state.opportunities.slice(0) // copy the array to sort it
          ops.sort(function(x, y) { // sooner upcoming is first
            if (x.data.daysUntil > y.data.daysUntil) {
              return 1;
            } else if (x.data.daysUntil < y.data.daysUntil) {
              return -1;
            }
            return 0;
          }) 
          this.setState({opportunities: ops}) // set the state to the sorted array
        }}/>  
        <Filters text={"Points"} onPress={() => {
          ops = this.state.opportunities.slice(0) 
          ops.sort(function(x, y) { 
            if (x.data.points < y.data.points) { // higher points comes first
              return 1;
            } else if (x.data.points > y.data.points) {
              return -1;
            }
            return 0;
          })  
          this.setState({opportunities: ops}) 
        }}/> 
        <Filters text={"Recently Posted"} onPress={() => {
          ops = this.state.opportunities.slice(0) // copy the array to sort it
          ops.sort(function(x, y) { // more recently posted stuff is first
            if (x.data.daysAgoPosted > y.data.daysAgoPosted) {
              return 1;
            } else if (x.data.daysAgoPosted < y.data.daysAgoPosted) {
              return -1;
            }
            return 0;
          })
          this.setState({opportunities: ops}) // set the state to the sorted array
        }}/> 
        <Filters text={"Local"} onPress={() => {
          ops = this.state.opportunities.slice(0) 
          ops.sort(function(x, y) { 
            if (x.data.distanceInMiles > y.data.distanceInMiles) { // closer stuff is first
              return 1;
            } else if (x.data.distanceInMiles < y.data.distanceInMiles) {
              return -1;
            }
            return 0;
          })  
          this.setState({opportunities: ops}) 
        }}/> 
        <Filters text={"Popular"} onPress={() => {
          ops = this.state.opportunities.slice(0) 
          ops.sort(function(x, y) { 
            if (x.data.popularityScore < y.data.popularityScore) { // higher popularity score comes first
              return 1;
            } else if (x.data.popularityScore > y.data.popularityScore) {
              return -1;
            }
            return 0;
          })  
          this.setState({opportunities: ops}) 
        }}/> 
        
      </ScrollView>
   
      <Text style={{fontSize: 40, color: "#1B7CB3", fontFamily: "Arial-Black", marginBottom: 5}}>Opportunities</Text>
      <ScrollView style={{maxHeight: 545, marginTop: 5, marginHorizontal: 5}} contentContainerStyle={{flexDirection: "row", width: "100%", flexWrap: "wrap"}}>
        {this.state.opportunities && this.state.opportunities.map((op, i) => (
          <VolunteerOp src={op.src ? op.src : orgInfo[op.orgID].profileSrc} jobTitle={op.jobTitle}
          time={op.time} points={op.data.points} key={i} 
          onPress={() => {
            this.props.navigation.navigate(`${op.opID}`)
          }}
          />
        ))}
      </ScrollView>
      
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpened: false,
      opportunities: opData,
    }
    this.ids = [...new Set(this.state.opportunities.map(a => a.orgID ? a.orgID : 0))].filter(a => a != undefined)
    console.log(this.ids)
    this.appState = this.props.route.params.appState
  }
  
  render() {
  return (
    <Stack.Navigator initialRouteName="VolunteerSc">
      <Stack.Screen options={{headerShown: false}} name="VolunteerSc" component={Volunteer} initialParams={{opportunities: this.state.opportunities, appState: this.appState}} />
      {this.state.opportunities && this.state.opportunities.map((op, i) => (
        <Stack.Screen name={`${op.opID}`} component={VolunteerScreen} 
        initialParams={{
        appState: this.appState,
        popupName: `${orgInfo[op.orgID] >= 0 ? orgInfo[op.orgID].name : op.orgName} - ${op.opID}`, 
        orgName: op.orgID >= 0 ? orgInfo[op.orgID].name : `${op.orgName} (fake)`, jobTitle: op.jobTitle,
        orgID: (op.orgID ? op.orgID : 0),
        src: op.src ? op.src : orgInfo[op.orgID].profileSrc, points: op.data.points, 
        mission: op.mission, time: op.time,
        location: op.location, jobDesc: op.jobDesc,
        }}
        key={i}
        options={{
          headerTitle: op.jobTitle,
          headerLeft: () => (<TouchableOpacity style={{paddingLeft: 10, paddingRight: 0}}onPress={() => this.props.navigation.navigate("VolunteerSc") }><Ionicons name={"arrow-back-sharp"} size={30} color={"#0077ff"}/></TouchableOpacity>)
        }}
      />))}
       {
        this.state.opportunities && this.state.opportunities.filter(item => item.orgID >= 0).map((op, i) => (
         <Stack.Screen name={`${orgInfo[op.orgID] >= 0 ? orgInfo[op.orgID].name : op.orgName} - ${op.opID}` /* has to be unique for back navigation */} component={OrgProfile} 
         key={i}
          initialParams={{
          title: orgInfo[op.orgID].name, orgPicture: orgInfo[op.orgID].profileSrc, id: op.orgID,
          about: orgInfo[op.orgID].profileContents.about, mission: orgInfo[op.orgID].profileContents.mission,
          images: orgInfo[op.orgID].profileContents.images,
          learnMoreURL: orgInfo[op.orgID].profileContents.websiteURL}}
          options={{
            headerTitle: orgInfo[op.orgID].name,
            headerLeft: () => (<TouchableOpacity style={{paddingLeft: 10, paddingRight: 0}}onPress={() => this.props.navigation.navigate(`${op.opID}`)}><Ionicons name={"arrow-back-sharp"} size={30} color={"#0077ff"}/></TouchableOpacity>)
          }}/>
        ))}


    </Stack.Navigator>
  );
  }
}


const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 40, 
    paddingTop: 40,
    paddingBottom: 15,
    color: "black",
    fontFamily: "Arial-Black",
   // fontWeight: "900"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  },
  menuContent: {
    color: "white",
    padding: 2,
    fontSize: 20
  },
  searchBar: {
    width: 120, 
    height: 30, 
    borderBottomColor: "#5D5D5D", 
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 10
  }
});
