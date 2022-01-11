import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity,  } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export default class VolunteerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.route.params
    console.log(this.params)
    this.appState = this.props.route.params.appState
  }
  render() {
    return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={this.appState.theme}
        style={styles.background}
      />
      <TouchableOpacity style={styles.circle} onPress={() => this.props.navigation.navigate(`${this.params.popupName}`)}>
        <Image style={styles.icon} source={this.params.src}/>
      </TouchableOpacity>
      <View style={styles.intro}>
        <Text style={styles.introText}>{this.params.jobTitle}</Text>
        <Text style={styles.introText}>{this.params.points} Points</Text>
      </View>
      <View style={styles.main}>
        <Text style={styles.mainTitle}>{this.params.orgName}</Text>
        <Text style={styles.mainHeader}>Mission</Text>
        <Text style={styles.mainBody}>{this.params.mission}</Text>
        <Text style={styles.mainHeader}>When</Text>
        <Text style={styles.mainBody}>{`${this.params.time.date} from ${this.params.time.start} to ${this.params.time.end}`}</Text>
        <Text style={styles.mainHeader}>Where</Text>
        <Text style={styles.mainBody}>{this.params.location}</Text>
        <Text style={styles.mainHeader}>About</Text>
        <Text style={styles.mainBody}>{this.params.jobDesc}</Text>
      </View>

    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 675,
  },
  circle: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  intro: {
    backgroundColor: "rgba(255, 255, 255, .3)",
    height: 70,
    width: "90%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  introText: {
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 2.5
  },
  main: {
    backgroundColor: "rgba(255, 255, 255, .3)",
    height: 415,
    width: "90%",
    borderRadius: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10
  },
  mainTitle: {
    marginTop: 10,
    fontSize: 23,
    alignSelf: "center"
  },
  mainHeader: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginVertical: 10,
  },
  mainBody: {
    alignSelf: "flex-start",
    marginVertical: 0
  }
});