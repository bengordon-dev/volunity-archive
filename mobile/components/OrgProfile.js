import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { donationRequests } from '../data/donation-requests';
import { opData } from '../data/opportunities';

function TopBarButton(props) {
  return (
    <TouchableOpacity style={styles.topBarButton} onPress={props.onPress}>
      <Text style={{fontWeight: "600"}}>{props.text}</Text>
    </TouchableOpacity>
  )
}
function OpButton(props) {
  return (
    <TouchableOpacity style={styles.opListButton} onPress={props.onPress}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default class OrgProfile extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.route.params,
    //this.appState = this.props.route.params.appState
    this.state = {
      selectedAmount: 0,
      customAmount: false,
      customValue: 0,
    }
  }
 
  render() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: "flex-start"}}>
      <SafeAreaView style={styles.topBar}>
      <Image style={styles.pfp} source={this.params.orgPicture}/>
      <View style={{width: 285, marginHorizontal: 5, height: 85, justifyContent: "center"}}>
        <Text style={styles.name}>{this.params.title}</Text>
        <View style={{height: 30}}><ScrollView horizontal={true} contentContainerStyle={{alignItems: "center", justifyContent: "center"}} style={{flexWrap: "wrap", width: 275, marginHorizontal: 5}}>
          <TopBarButton text={"See on Map"}/>
          <TopBarButton text={"Share"}/>
          <TopBarButton onPress={() => Linking.openURL(this.params.learnMoreURL)} text={"Learn More"}/>
        </ScrollView></View>
      </View>
      </SafeAreaView>
      
      <View style={styles.firstBox}> 
        <Text style={[styles.titleText, {marginTop: 8}]}>Mission</Text>
        <Text style={styles.bodyText}>{this.params.mission}</Text>
        <Text style={[styles.titleText, {marginTop: 5}]}>About</Text>
        <Text style={styles.bodyText}>{this.params.about}</Text>
      </View>

      <View style={styles.secondBox}>
        <View style={[styles.opLists, {marginRight: 10}]}>
          <Text style={[styles.opListHeader, {marginTop: 15}]}>Donation Requests</Text>     
          {donationRequests && [...donationRequests.material, ...donationRequests.financial].filter(item => item.orgID === this.params.id).map((req, i) => (
              <OpButton key={i} text={req.title}/>
          ))}
        </View>
        <View style={styles.opLists}>
          <Text style={[styles.opListHeader, {marginTop: 15}]}>Volunteer Opportunities</Text>
          {opData && opData.filter(item => item.orgID === this.params.id).map((op, i) => (
              <OpButton key={i} text={op.jobTitle}/>
          ))}
        </View>
      </View>
      <View style={styles.thirdBox}>
        <Text style={[styles.titleText, {marginVertical: 10}]}>Photo Gallery</Text>
        <ScrollView horizontal={true} style={{width: "98%", flexWrap: "wrap"}}>
        {this.params.images && this.params.images.map((image, i) => (
          <Image source={image.src} key={i} style={[styles.organizationPictures, {width: image.width, height: image.height}]}/>
        ))}
        </ScrollView>
      </View>

      

 </ScrollView> 
  )
  }
}  

const styles = StyleSheet.create({
  background: {
    left: 0,
    right: 0,
    top: 0,
    height: "100"
  },
  container: {
    backgroundColor: '#EAEAEA',
    paddingLeft: 10,
    paddingRight: 10,
    overflow: "scroll",
  },
  topBar: {
    justifyContent: 'center',
    flexWrap: "wrap",
    alignItems: 'flex-start',
    height: 85,
    width: 370,
    marginBottom: 10,
  },
  pfp: {
    backgroundColor: '#ffffff',
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 0,
    borderColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 4
  },
  name: {
    fontFamily: "Helvetica Neue",
    fontSize: 21,
    fontWeight: '500',
    width: 275,
    textAlign: "center",
    marginBottom: 5
  },
  topBarButton: {
    minWidth: 60,
    paddingHorizontal: 5,
    marginHorizontal: 3,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, .030)',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12
  },
  opListButton: {
    paddingHorizontal: 5,
    marginHorizontal: 3,
    marginVertical: 5,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, .030)',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12
  },
  organizationPictures: {
    backgroundColor: '#ffffff',
    borderColor: '#888888',
    marginRight: 15
  },
  firstBox: {
    backgroundColor: 'rgba(0, 0, 0, .030)',
    minHeight: 150,
    width: 370,
    alignItems: 'center',
    alignContent: "center",
    borderRadius: 40,
    marginBottom: 10,
    justifyContent: "flex-start",
    paddingHorizontal: 5
  },
  secondBox: {
    width: 370, 
    overflow: "hidden",
    height: 175, 
    flexWrap: "wrap",
    marginBottom: 10,
  },
  opLists: {
    backgroundColor: 'rgba(0, 0, 0, .030)',
    width: 180,
    height: 175,
    borderRadius: 35
  },
  opListHeader: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: 'center',
    fontFamily: "Helvetica Neue",
  },
  thirdBox: {
    backgroundColor: 'rgba(0, 0, 0, .030)',
    minHeight: 210,
    width: 370,
    alignItems: 'center',
    alignContent: "center",
    borderRadius: 35,
    marginBottom: 10,
    justifyContent: "flex-start",
    paddingHorizontal: 5
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: 'center',
    fontFamily: "Helvetica Neue",
  },
  bodyText: {
    fontSize: 13,
    textAlign: 'left',
    lineHeight: 20,
    fontFamily: "Helvetica Neue",
  },

});