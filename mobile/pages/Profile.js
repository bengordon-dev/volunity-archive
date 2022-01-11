import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import LinearGradient from 'react-native-linear-gradient';
import {DeviceEventEmitter} from "react-native"

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.params = this.props.route.params
    this.appState = this.params.appState
    this.state = {
      tab: "achievements"
    }
  }
  async  signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
  render() {
    const fill = 'rgb(134, 65, 244)'
    const data = [2, 3, 2, 0, 2, 4, 3]
    const xAxis= ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]
    const CUT_OFF = 20
    const Labels = ({ xAxis, y, bandwidth, data }) => (
      data.map((value, index) => (
          <Text
              key={ index }
              xAxis={ xAxis(index) + (bandwidth / 2) }
              y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
              fontSize={ 14 }
              fill={ value >= CUT_OFF ? 'white' : 'black' }
              alignmentBaseline={ 'middle' }
              textAnchor={ 'middle' }
          >
              {value}
          </Text>
      ))
  )
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={this.appState.theme}
        style={styles.background}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{fontSize: 40, fontWeight: "bold", marginLeft: 10}}>
          Profile
        </Text>
        <View style={{marginRight:10, marginTop: 2.5}}>
        <TouchableOpacity onPress={
          /*this.params.signOut => navigation.navigate('Settings')}*/
          () => {
            DeviceEventEmitter.emit("signout", {eventData});
          }
          }>
        <Ionicons name={"settings-outline"} size={35} color={"black"} containerStyle={"marginLeft:40"} onPress={() => {}}/>
        </TouchableOpacity>
        </View>
    </View>
      <SafeAreaView style={styles.profile}>
      <View>
      <Image
        style={styles.profilePicture}
        source={this.appState.profilePictureSource}
      />
      </View>
      <Text style={styles.name}>
      {this.appState.firstName} {this.appState.lastName}
      {'\n'}
      </Text>
      <Text style={getRank(this.appState.rank)}>
        {this.appState.rank}
      </Text>
      <View style={{flex:1, marginLeft: "16%", alignItems: "center"}}>
      <Progress.Bar
             progress={this.appState.points/this.appState.pointsGoal}
             color= "#27E880"
             borderColor="#707070"
             />
      </View>
      <View style={{flexDirection: "row", marginTop: 20, marginBottom: -10, justifyContent: "center", marginLeft: -23}}>
        <TouchableOpacity style={[styles.tabButton, this.state.tab == "achievements" ? styles.currentTab : styles.backTab]} onPress={() => {this.setState({tab: "achievements"})}}>
          <Text style={[this.state.tab == "achievements" ? styles.currentTab : styles.backTab]}>
            Achievements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => {this.setState({tab: "history"})}}>
          <Text style={[this.state.tab == "history" ? styles.currentTab : styles.backTab]}>
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => {this.setState({tab: "share"})}}>
          <Text style={[this.state.tab == "share" ? styles.currentTab : styles.backTab]}>
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => {this.setState({tab: "entries"})}}>
          <Text style={[this.state.tab == "entries" ? styles.currentTab : styles.backTab]}>
            Entries
          </Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      {this.state.tab == "achievements" ? 
        <ScrollView>
          <Text style={{fontSize: 17, marginLeft: 10, fontWeight: "500", marginTop: 5}}>
          Rank
          </Text>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 5}}>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          </View>

          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 5}}>
            <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/100}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/200}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/300}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              100 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              200 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              300 Points
            </Text>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 5}}>
            <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/100}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/200}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/300}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              100 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              200 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              300 Points
            </Text>
          </View>
          <Text style={{fontSize: 17, marginLeft: 10, fontWeight: "500", marginTop: 5}}>
          Volunteer
          </Text>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 5}}>
            <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/100}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/200}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/300}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              100 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              200 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              300 Points
            </Text>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 5}}>
            <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/100}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/200}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/300}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              100 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              200 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              300 Points
            </Text>
          </View>
          <Text style={{fontSize: 17, marginLeft: 10, fontWeight: "500", marginTop: 5}}>
          Donate
          </Text>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 5}}>
            <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/100}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/200}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/300}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              100 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              200 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              300 Points
            </Text>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          <Image source={require("./assets/images/achievement.png")} style={{width:75, flex: 1, resizeMode: "contain", height:75,}}/>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 5}}>
            <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/100}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/200}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
             <View style={{paddingHorizontal: 27}}>
            <Progress.Bar
             progress={this.appState.points/300}
             color= "#27E880"
             borderColor="#707070"
             width= {75}
             />
             </View>
          </View>
          <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", justifyContent: "center", flex: 1, marginBottom: 15}}>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              100 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              200 Points
            </Text>
            <Text style={{paddingHorizontal: 32, fontWeight: "200"}}>
              300 Points
            </Text>
          </View>
        </ScrollView>
      :
      this.state.tab == "history" ?
        <ScrollView>
          <Text style={{fontSize: 17, marginLeft: 10, fontWeight: "500", marginTop: 5}}>
          Weekly Summary
          </Text>
          <View>
            {/*<BarChart style={{ height: 200 }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }} borderRadius={ 20 }>
                <Grid direction={Grid.Direction.HORIZONTAL}/>
                <Labels/>
            </BarChart>
            <XAxis
                style={{ height: 150 }}
                data={xAxis}
                formatLabel={(value, index) => xAxis[index]}
                contentInset={{ left: 25, right: 25}}
                svg={{ fontSize: 10, fill: 'black', originY: 35 }}
            />*/}
          </View>
        </ScrollView>
      :
      this.state.tab == "share" ?
        <SafeAreaView><Text>share</Text></SafeAreaView>
        
      :
      this.state.tab == "entries" ?
        <SafeAreaView><Text>entries</Text></SafeAreaView>
      :
        <SafeAreaView><Text>Settings</Text></SafeAreaView>
      }
    </SafeAreaView>
  )}
}

function getRank(props) {
  if(props=="Platinum")
  {
    return{
      textAlign: "center",
      marginLeft: "16%",
      fontSize: 20,
      marginBottom: 10,
      marginTop: -20,
      fontWeight: "bold",
      color: "#bbb"
    }
  }
  if (props=="Gold") {
    return{
      textAlign: "center",
      marginLeft: "16%",
      fontSize: 20,
      marginBottom: 10,
      marginTop: -20,
      fontWeight: "bold",
      color: "#FFD700"
    }
  } else {
    return{
      textAlign: "center",
      marginLeft: "16%",
      fontSize: 20,
      marginBottom: 10,
      marginTop: -20,
      fontWeight: "bold",
      color: "#C0C0C0"
    }
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
    backgroundColor: '#EAEAEA',
    overflow: "scroll",
  },
  name: {
    fontFamily: "Arial",
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: -100,
    marginLeft: 60
  },
  profilePicture: {
    backgroundColor: '#ffffff',
    marginBottom: 20,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#888888',
    overflow: 'hidden',
    marginTop: 10
  },
  tabButton: {
    paddingHorizontal: 15,

  },
  currentTab: {
    fontSize: 15,
    textDecorationLine: "underline"
  },
  profile: {
    paddingBottom: 30,
    marginLeft: 23,
    marginBottom: 20
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  backTab: {
    //fontWeight: "100",
    fontSize: 15,
  },
  graphStyle: {
    backgroundColor: "white"
  }
});


