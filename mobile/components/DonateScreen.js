import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Linking, TextInput} from 'react-native';

export default class DonSc extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.route.params,
    // [type, popupName, orgPicture, orgName, title, needDesc, images (optional), url (optional), contributionInfo | locationInfo]
    this.appState = this.props.route.params.appState
    this.state = {
      selectedAmount: 0,
      customAmount: false,
      customValue: 0,
    }
  }
 
  render() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: "flex-start"}}>
      <TouchableOpacity style={styles.profile} onPress={() => this.props.navigation.navigate(`${this.params.popupName}`)}>
        <Image style={styles.organizationPicture} source={this.params.orgPicture}/>
        <View style={{height: 85, justifyContent: "center"}}>
        <Text style={styles.name}>{this.params.title}</Text>
        <Text style={styles.orgName}>{this.params.orgName}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.firstBox}> 
        
        {this.params.orgMission && 
        <View>
          <Text style={styles.titleText}>Mission Statement</Text>
          <Text style={styles.profileText}>{this.params.orgMission}</Text>
        </View>}

        {this.params.images && this.params.images.length > 0 &&
        <ScrollView horizontal={true} style={{width: "100%", flexWrap: "wrap"}}>
          {this.params.images && this.params.images.length > 0 && this.params.images.map((image, i) => (
            <Image source={image.src} key={i} style={[styles.organizationPictures, {width: image.width, height: image.height}]}/>
          ))}
        </ScrollView>
        }
        
        <View style={{width: "100%", height: 30, marginBottom: 5, flexWrap: "wrap", alignContent: "center"}}>
        <Text style={[styles.titleText, {marginRight: (this.params.learnMoreURL && this.params.learnMoreURL.length > 0) ? 15 : 0}]} onPress={() => this.props.navigation.navigate(`${this.params.popupName}`)}>View Profile</Text>
        {this.params.learnMoreURL && this.params.learnMoreURL.length > 0 ? <Text style={[styles.titleText, {marginLeft: 0}]} onPress={() => Linking.openURL(this.params.learnMoreURL)}>Learn More</Text> : null}
        </View>
      
      </View>

      <View style={[styles.personalButton, this.params.money && {height: this.state.customAmount ? 322.5 : 285}]}>
        {this.params.contributionInfo && this.params.contributionInfo.length > 0 && 
        <View>
          <Text style={styles.titleText}>Contribution Information </Text>
          <Text style={styles.donationboxText}>{this.params.contributionInfo}</Text>
        </View>}
        
        {this.params.money ? 
        <View>
        <View style={styles.donationButtonRow}>
        <TouchableOpacity style={[{backgroundColor: this.state.selectedAmount == 5 ? "#00ff00" : 'rgba(0, 0, 0, .030)',}, 
          styles.donationButtonPreset, {width: 55}]}
          onPress={() => {this.setState({selectedAmount: 5, customAmount: false})}}> 
          <Text style={[styles.donationTextPreset, {left: 5}]}> $5 </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[{backgroundColor: this.state.selectedAmount == 10 ? "#00ff00" : 'rgba(0, 0, 0, .030)',},
          styles.donationButtonPreset, {width: 55}]}
          onPress={() => {this.setState({selectedAmount: 10, customAmount: false})}}> 
          <Text style={[styles.donationTextPreset, {left: 0}]}> $10 </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[{backgroundColor: this.state.selectedAmount == 20 ? "#00ff00" : 'rgba(0, 0, 0, .030)',},
          styles.donationButtonPreset, {width: 55}]}
          onPress={() => {this.setState({selectedAmount: 20, customAmount: false})}}> 
          <Text style={[styles.donationTextPreset, {left: -1}]}> $20 </Text>
        </TouchableOpacity>
        </View>
        
        <View style={styles.donationButtonRow}>
        <TouchableOpacity style={[{backgroundColor: this.state.selectedAmount == 50 ? "#00ff00" : 'rgba(0, 0, 0, .030)',},
          styles.donationButtonPreset, {width: 55}]}
          onPress={() => {this.setState({selectedAmount: 50, customAmount: false})}}> 
          <Text style={[styles.donationTextPreset, {left: -1}]}> $50 </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[{backgroundColor: this.state.selectedAmount == 100 ? "#00ff00" : 'rgba(0, 0, 0, .030)',},
          styles.donationButtonPreset, {width: 66}]}
          onPress={() => {this.setState({selectedAmount: 100, customAmount: false})}}> 
          <Text style={[styles.donationTextPreset, {left: -3}]}> $100 </Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity style={[{backgroundColor: this.state.customAmount? "#00ff00" : 'rgba(0, 0, 0, .030)',},
          styles.donationButtonCustom]} onPress={() => {
          this.setState({customAmount: !this.state.customAmount, selectedAmount: this.state.customValue})}}>
          <Text style={styles.donationButtonCustomText}> Custom Amount </Text>
        </TouchableOpacity>

        {this.state.customAmount &&
        <TextInput keyboardType={"number-pad"} onChangeText={(text) => {this.setState({selectedAmount: text ? parseFloat(text) : 0})}} style={styles.keyPad}/> 
        }
        
        <TouchableOpacity style={[{backgroundColor: this.state.selectedAmount > 0 ? "#00ff00" : 'rgba(0, 0, 0, .030)'},
          styles.donationButtonAction]}>
          <Text style={styles.donationButtonActionText}
          onPress={() => {console.log(this.state.selectedAmount)}} > Donate </Text>
        </TouchableOpacity></View>
        : this.params.locationInfo && this.params.locationInfo.length > 0 &&
        <View>
        
        <Text style={styles.titleText}>Location Information </Text>
        <Text style={styles.donationboxText}>{this.params.locationInfo}</Text></View> 
        }

      </View>
      <Text style={{textAlign: "center"}}>{`${Math.floor((this.params.now - this.params.posted)/86400000)}`} days ago</Text>
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
  profile: {
    justifyContent: 'center',
    flexWrap: "wrap",
    alignItems: 'flex-start',
    paddingBottom: 0,
    width: "100%",
    height: 85,
    marginTop: 5
  },
  name: {
    fontFamily: "Helvetica Neue",
    fontSize: 21,
    fontWeight: '500',
    width: 275,
    textAlign: "center",
    marginBottom: 5
  },
  orgName: {
    fontFamily: "Helvetica Neue",
    fontSize: 16,
    fontWeight: '400',
    width: 275,
    textAlign: "center",
    marginBottom: 5
  },
  organizationPicture: {
    backgroundColor: '#ffffff',
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 0,
    borderColor: '#888888',
    overflow: 'hidden',
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
    paddingHorizontal: 5
  },

  personalButton: {
    backgroundColor: 'rgba(0, 0, 0, .030)',
    width: 370,
    borderRadius: 40,
    marginTop: 10,
    minHeight: 150,
  },

  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: "Helvetica Neue",
  },
  donationboxText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 6,
    fontFamily: "Helvetica Neue",
  },
  learnText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: "Helvetica Neue",
    marginBottom: 4
  },
  donationButtonPreset: {
    height: 31,
    borderRadius: 40,
    marginHorizontal: 7.5
  },
  donationTextPreset: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
  },
  donationButtonRow: {
    width: "100%", 
    height: 31, 
    flexWrap: "wrap", 
    alignContent: "center",
    marginBottom: 7.5
  },
  donationButtonCustom: {
    height: 21,
    width: 144,
    borderRadius: 40,
    marginLeft: 5,
    alignSelf: "center",
  },
  donationButtonCustomText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    left: 9.5,
    bottom: -1,
  },
  donationButtonAction: {
    height: 50,
    width: 251,
    borderRadius: 40,
    marginLeft: 55,
    marginTop: 7.5
  },
  donationButtonActionText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 28,
    left: 75,
    top: 8,
  },
  profileText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: -7,
    marginBottom: 4,
    lineHeight: 20,
    fontFamily: "Helvetica Neue",
  },
  backgroundImage: {
    resizeMode: 'cover',
    height: 220,
  },
  keyPad: {
    backgroundColor: "white",
    width: 150,
    height: 31,
    borderRadius: 40,
    marginTop: 7.5,
    alignSelf: "center",
  }
});