import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CircularProfile(props) {
    return (
      <View style={styles.opportunity}>
        <TouchableOpacity style={styles.circle} onPress={() => {props.onPress ? props.onPress() : console.log("sad!")}}>
          <Image style={styles.icon} source={props.src ? props.src : require('../assets/images/404.png')}/>
        </TouchableOpacity>
      </View>
    );
}
  
const styles = StyleSheet.create({
  opportunity: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  circle: {
    backgroundColor: '#ffffff',
    marginRight: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'

  },
  icon: {
      width: "100%",
      height: "100%",
  }
});