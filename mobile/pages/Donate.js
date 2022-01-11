import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Modal, Pressable } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import CircularProfile from './components/CircularProfile';
import Filters from './components/Filters';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import { createStackNavigator } from '@react-navigation/stack';
import {donationRequests} from "./data/donation-requests";
import DonateProfile from "./components/DonateProfile";
import {orgInfo} from './data/newOrgs';
import DonateScreen from './components/DonateScreen';
import OrgProfile from "./components/OrgProfile";


function greatCircleDist(a, b) { // distance (in km) on Earth's surface as the crow flies.
  // r*arccos(sin φ1 sin φ2 cos(θ1-θ2) + cos φ1 cos φ2).
  return 6371*Math.acos(Math.sin((90 - a[0])*Math.PI/180)*Math.sin((90 - b[0])*Math.PI/180) * Math.cos((a[1] - b[1])*Math.PI/180) + Math.cos((90 - a[0])*Math.PI/180)*Math.cos((90 - b[0])*Math.PI/180))
}

function stringMatch(name, input) {
  proper = name.toLowerCase()
  inp = input.toLowerCase()
  if (proper.startsWith(inp))
  {
    return input.length
  }
  else if (proper.includes(inp))
  {
    return input.length
  }
  return 0
 
}

class Donate extends Component {
  constructor(props) {
    super(props);
    this.appState = this.props.route.params.appState
    this.state = {
      finDropDown: true,
      matDropDown: false,
      selectedTopFilter: null,
      selectedBotFilter: null,
      finInput: "",
      matInput: "",
      finRequests: donationRequests.financial,
      matRequests: donationRequests.material, 
      filtersOn: false,
      scrollable: true,
      coords: [this.appState.region.latitude, this.appState.region.longitude] 
    }
    console.log(this.state.coords)
    this.filters = [
      //{name: "Relevant"},
      {name: "New", onPress: this.sortByNew.bind(this)},
      {name: "Popular", onPress: this.sortByPopular.bind(this)},
      {name: "Local", onPress: this.sortByClose.bind(this)},
    ]
    this.appState = this.props.route.params.appState
  }
  componentDidMount() {
    this.setState()
  }
  sortByNew(half) {
    if (half === "top") {
      newFinReqs = this.state.finRequests.slice(0)
      newFinReqs.sort((a, b) => (a.numData.posted > b.numData.posted) ? -1 : 1)
      this.setState({finRequests: newFinReqs})
    }
    else {
      newMatReqs = this.state.matRequests.slice(0)
      console.log(newMatReqs)
      newMatReqs.sort((a, b) => (a.numData.posted > b.numData.posted) ? -1 : 1)
      this.setState({matRequests: newMatReqs})
    }
  }
  sortByClose(half) {
    if (half === "top") {
      newFinReqs = this.state.finRequests.slice(0)
      newFinReqs.sort((a, b) => (greatCircleDist(a.numData.coords, this.state.coords) > greatCircleDist(b.numData.coords, this.state.coords)) ? 1 : -1)
      this.setState({finRequests: newFinReqs})
    }
    else {
      newMatReqs = this.state.matRequests.slice(0)
      console.log(newMatReqs)
      newMatReqs.sort((a, b) => (greatCircleDist(a.numData.coords, this.state.coords) > greatCircleDist(b.numData.coords, this.state.coords)) ? 1 : -1)
      this.setState({matRequests: newMatReqs})
    }
  }
  sortByPopular(half) {
    if (half === "top") {
      newFinReqs = this.state.finRequests.slice(0)
      newFinReqs.sort((a, b) => (a.numData.popularityScore > b.numData.popularityScore) ? -1 : 1)
      this.setState({finRequests: newFinReqs})
    }
    else {
      newMatReqs = this.state.matRequests.slice(0)
      console.log(newMatReqs)
      newMatReqs.sort((a, b) => (a.numData.popularityScore > b.numData.popularityScore) ? -1 : 1)
      this.setState({matRequests: newMatReqs})
    }
  }

  selectFilter(fil, half) {
    if (half === "top")
      this.setState({selectedTopFilter : fil})
    else 
      this.setState({selectedBotFilter : fil})
    fil.onPress(half)
  }

  deSelectFilter(half) {
    if (half === "top") {
      this.setState({selectedTopFilter : null})
      //this.setState({finRequests: donationRequests.financial})
    }
    else {
      this.setState({selectedBotFilter : null})
      //this.setState({matRequests: donationRequests.material})
    }
  }


  rankOrgs(rank) {
    console.log(rank)
  }

  render() {
    return (
      <View style={styles.container}>
      <LinearGradient
        colors={this.appState.theme}
        style={styles.background}
      />
      <ScrollView scrollEnabled={this.state.scrollable}>
      <Text style={styles.title}>Donate</Text>
      <View style={{flexDirection: "row", width: "100%", flexWrap: "wrap"}}>
      <Text style={styles.header}>Financial Needs</Text>
      <TouchableOpacity style={styles.dropDown} onPress={() => this.setState({finDropDown: !this.state.finDropDown, matDropDown: !this.state.matDropDown})}>
        <Ionicons name={this.state.finDropDown ? "chevron-down-outline" : "chevron-up-outline"} size={30} color={"#1B7CB3"} style={styles.dropDownText} />
      </TouchableOpacity>
      </View>
      
      {this.state.finDropDown ? 
        <View style={{minHeight: 450, maxHeight: this.state.matRequests.length > 0 ? 450 : 550}}>
           <View style={{flexDirection: "row"}}>
          <TextInput style={styles.searchBar}
          value={this.state.finInput}
          onChangeText={(finInput) => {
            this.setState({finInput})
            newFinReqs = finInput.length > 0 ? donationRequests.financial.slice(0).filter(item => stringMatch(item.title, finInput) > 0) : donationRequests.financial
            if (finInput.length > 0) {newFinReqs.sort(((a, b) => (stringMatch(a.title, finInput) > stringMatch(b.title, finInput)) ? 1 : -1))}
            this.setState({finRequests: newFinReqs})
          }}
          onSubmitEditing={(e) => {  
            console.log(this.state.finInput)
          }} 
          placeholderTextColor="#5D5D5D"
          placeholder={"Search"}
          onFocus={() => {
            if (this.state.finRequests.length == 0) this.setState({finInput: "", finRequests: donationRequests.financial})
          }}
          />
          
          <TouchableOpacity onPress={() => {this.setState({filtersOn: true})}} style={{marginLeft:"55%", marginTop: "1%"}}>
            <Text style={{textAlign: "left", fontSize: 16, color: "blue"}}>
              Filters
            </Text>
          </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.filtersOn}
            onRequestClose={() => {this.setState({filtersOn: false})}}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Filters</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {this.setState({filtersOn: false})}}
                >
                  <Text style={styles.textStyle}>Hide</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          
      
          {this.state.finRequests.length > 0 ? <View style={styles.sortBy}>
            <Text style={{fontSize: 16, marginRight: 9, fontWeight: "500"}}>Sort by:</Text>
            <View><ScrollView horizontal={true} bounce={false}>
              {this.filters && this.filters.map((filter, i) => (
                <Filters text={filter.name} type={filter.type} selected={(this.state.selectedTopFilter == filter ? true : false)} key={i}
                onPress={() => {
                  (this.state.selectedTopFilter != filter) ? 
                  this.selectFilter(filter, "top") : this.deSelectFilter("top")
                }}/>
              ))}
            </ScrollView></View>
          </View> : <Text>No results found.</Text>}
          <ScrollView style={{height: (this.state.matDropDown ? 360 : 460), marginTop: 0}}>
            {this.state.finRequests && this.state.finRequests.map((req, i) => (
              <DonateProfile title={req.title} orgName={`${orgInfo[req.orgID].name}`} src={orgInfo[req.orgID].profileSrc} onPress={() => {this.props.navigation.navigate(`${req.reqID}`)}} key={i}/>
            ))}
          
          </ScrollView>
        </View>
        :
        this.state.finRequests.length > 0 &&
        <ScrollView style={{marginBottom: 0, height: 86}} horizontal={true} bounce={false}>
          {this.state.finRequests && this.state.finRequests.map((req, i) => (
            <CircularProfile src={orgInfo[req.orgID].profileSrc} key={i}
            onPress={() => {
              this.props.navigation.navigate(`${req.reqID}`)
            }}/>
          ))}
        </ScrollView>
      }

      <View style={{flexDirection: "row", width: "100%", flexWrap: "wrap", marginTop: this.state.finDropDown && this.state.matRequests.length > 0 ? 10 : this.state.matRequest ? 5 : 0}}>
      <Text style={styles.header}>Material Needs</Text>
      <TouchableOpacity style={styles.dropDown} onPress={() => this.setState({finDropDown: !this.state.finDropDown, matDropDown: !this.state.matDropDown})}>
        <Ionicons name={this.state.matDropDown ? "chevron-down-outline" : "chevron-up-outline"} size={30} color={"#1B7CB3"} style={styles.dropDownText} />
      </TouchableOpacity>
      </View>
      
      {this.state.matDropDown ? 
        <View style={{minHeight: 450, maxHeight: this.state.finRequests.length > 0 ? 450 : 550, marginBottom: 10}}>
          <TextInput style={styles.searchBar}
          value={this.state.matInput}
          onChangeText={(matInput) => {
            this.setState({matInput})
            newMatReqs = matInput.length > 0 ? donationRequests.material.slice(0).filter(item => stringMatch(item.title, matInput) > 0) : donationRequests.material
            if (matInput.length > 0) {newMatReqs.sort(((a, b) => (stringMatch(a.title, matInput) > stringMatch(b.title, matInput)) ? 1 : -1))}
            this.setState({matRequests: newMatReqs})
          }}
          onSubmitEditing={(e) => {  
            console.log(this.state.matInput)
          }} 
          placeholderTextColor="#5D5D5D"
          placeholder={"Search"}
          onFocus={() => {
            if (this.state.matRequests.length == 0) this.setState({matInput: "", matRequests: donationRequests.material})
          }}
          />
      
          {this.state.matRequests.length > 0 ? <View style={styles.sortBy}>
            <Text style={{fontSize: 16, marginRight: 9, fontWeight: "500"}}>Sort by:</Text>
            <View><ScrollView horizontal={true} bounce={false}>
              {this.filters && this.filters.map((filter, i) => (
                <Filters text={filter.name} type={filter.type} selected={(this.state.selectedBotFilter == filter ? true : false)} key={i}
                onPress={() => {
                  (this.state.selectedBotFilter != filter) ? 
                  this.selectFilter(filter, "bot") : this.deSelectFilter("bot")
                }}/>
              ))}
            </ScrollView></View>
          </View> : <Text>No results found.</Text>}

          <ScrollView contentContainerStyle={{justifyContent: "flex-start"}} style={{height: (this.state.finDropDown ? 360 : 460), marginBottom: 0}}>
            {this.state.matRequests && this.state.matRequests.map((req, i) => (
              <DonateProfile title={req.title} orgName={orgInfo[req.orgID].name} src={orgInfo[req.orgID].profileSrc} onPress={() => {this.props.navigation.navigate(`${req.reqID}`)}} key={i}/>
            ))}
            
          </ScrollView>
        </View>
        :
        this.state.matRequests.length > 0 &&
        <ScrollView style={{marginBottom: 0, height: 86}} horizontal={true} bounce={false}>
          {this.state.matRequests && this.state.matRequests.map((req, i) => (
            <CircularProfile src={orgInfo[req.orgID].profileSrc} key={i}
            onPress={() => {
              this.props.navigation.navigate(`${req.reqID}`)
            }}/>
          ))}
        </ScrollView>
      }
      
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
      time: Date.now(),
    }
    this.appState = this.props.route.params.appState
  }

  render() {
  return (
    <Stack.Navigator initialRouteName="DonateSc">
      <Stack.Screen options={{headerShown: false}} name="DonateSc" component={Donate} initialParams={{opportunities: this.state.opportunities, appState: this.appState}} />
      {[...donationRequests.financial, ...donationRequests.material] && [...donationRequests.financial, ...donationRequests.material].map((req, i) => (
          <Stack.Screen name={`${req.reqID}`} component={DonateScreen} 
          initialParams={{
          appState: this.appState,
          popupName: `${req.reqID} - ${req.orgID}`, money: req.reqID.split("-")[1] === "f",
          title: req.title, orgName: orgInfo[req.orgID].name, orgPicture: orgInfo[req.orgID].profileSrc,
          orgMission: req.orgMission, images: req.images ? req.images : orgInfo[req.orgID].profileContents.images,
          now: this.state.time, posted: req.numData.posted,
          contact: req.contact, address: req.address,
          learnMoreURL: req.furtherInfoURL, contributionInfo: req.contributionInfo, locationInfo: req.locationInfo}}
          key={i}
          options={{
            headerTitle: req.title,
            headerStyle: {},
            headerLeft: () => (<TouchableOpacity style={{paddingLeft: 10}}onPress={() => this.props.navigation.navigate("DonateSc")}><Ionicons name={"arrow-back-sharp"} size={30} color={"#0077ff"}/></TouchableOpacity>)
          }}
          />       
      ))}
      {
        donationRequests && [...donationRequests.material, ...donationRequests.financial].map((req, i) => (
         <Stack.Screen name={`${req.reqID} - ${req.orgID}` /* has to be unique for back navigation? */} component={OrgProfile} 
         key={i}
         initialParams={{
           title: orgInfo[req.orgID].name, orgPicture: orgInfo[req.orgID].profileSrc, id: req.orgID,
           about: orgInfo[req.orgID].profileContents.about, mission: orgInfo[req.orgID].profileContents.mission,
           images: orgInfo[req.orgID].profileContents.images,
           learnMoreURL: orgInfo[req.orgID].profileContents.websiteURL}}
          options={{
            headerTitle: orgInfo[req.orgID].name,
            headerLeft: () => (<TouchableOpacity style={{paddingLeft: 10}}onPress={() => this.props.navigation.navigate(`${req.reqID}`)}><Ionicons name={"arrow-back-sharp"} size={30} color={"#0077ff"}/></TouchableOpacity>)
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
    marginTop: 50,
    marginBottom: 10,
    color: "black",
    fontFamily: "Arial-Black"
  },
  header: {
    fontSize: 32, 
    color: "#1B7CB3", 
    fontFamily: "Arial-Black",
    marginTop: -5,
    marginBottom: 5
  },

  menuContent: {
    color: "white",
    padding: 2,
    fontSize: 20
  },
  opportunity: {
   
  },
  dropDown: {
    height: 30, width: 30,
    paddingLeft: 2,
  },
  dropDownText: {
    color: "#1B7CB3", 
    marginLeft: 0,
  },
  searchBar: {
    width: 120, 
    height: 30, 
    borderBottomColor: "#5D5D5D", 
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 10
  },
  sortBy: {
    flexWrap: "wrap", width: "100%", marginBottom: 15, height: 30, marginTop: 0, justifyContent: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80%",
    width: "100%",
    marginBottom: "-75%",
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-start",
    marginLeft: "63%",
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
  },
  modalText: {
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10,
  }
});
