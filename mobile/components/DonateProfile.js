import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function DonateProfile(props) {
    return (
      <TouchableOpacity style={styles.button} onPress={() => {props.onPress ? props.onPress() : console.log("sad!")}}>
        <View style={styles.view}>
          <View style={styles.circle}>
            <Image style={styles.icon} source={props.src}/>
          </View>
          <View style={styles.textbox}>
            <Text style={styles.toprow}>{props.title}</Text>
            <Text style={styles.bottomrow}>{props.orgName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
const styles = StyleSheet.create({
  button: {
    marginBottom: 7.5,
    width: "100%",
    marginBottom: 10 
  },
  view: {
    height: 85,
    borderRadius: 20,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  circle: {
    backgroundColor: '#ffffff',
    marginLeft: 10,
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#888888',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  textbox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    width: 250
  },
  toprow: {
    marginBottom: 0,
    fontSize: 20,
    fontFamily: "Helvetica Neue",
    fontWeight: '500',
    textAlign: "center"
  },
  bottomrow: {
    fontWeight: "300",
    marginTop: 2,
    fontSize: 18,
    fontFamily: "Helvetica Neue"
  }
});
