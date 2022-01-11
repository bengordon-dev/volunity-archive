import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function VolunteerOp(props) {
    return (
      <TouchableOpacity style={styles.button} onPress={() => {props.onPress()}}>
        <View style={styles.view}>
          <View style={styles.circle}>
            <Image style={styles.icon} source={props.src}/>
          </View>
          <View style={styles.textbox}>
          <Text style={styles.toprow}>{props.jobTitle}</Text>
            <Text style={styles.midrow}>{`${props.time.start} - ${props.time.end}, ${props.time.date}`}</Text>
            <Text style={styles.bottomrow}>{`${props.points/10} hours (${props.points} points)`}</Text>
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
    backgroundColor: "white",
    height: 95,
    borderRadius: 20,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  circle: {
    backgroundColor: '#ffffff',
    marginLeft: 10,
    width: 80,
    height: 80,
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
    marginLeft: 30,
  },
  toprow: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "Helvetica Neue",
    fontWeight: '200'
  },
  midrow: {
    fontSize: 16,
    fontFamily: "Helvetica Neue",
    fontWeight: '200'
  },
  bottomrow: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 16,
    fontFamily: "Helvetica Neue"
  }
});
