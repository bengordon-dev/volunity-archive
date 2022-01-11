import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Filters(props) {
    return (
      <View style={styles.opportunity}>
        <TouchableOpacity style={[{  backgroundColor: props.selected ? "green" : '#5D5D5D' }, styles.oval]} onPress={() => {props.onPress ? props.onPress() : console.log("sad!")}}>
           <Text style={styles.ovalText}>{props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
const styles = StyleSheet.create({
  opportunity: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  oval: {
    marginRight: 5,
    minWidth: 89,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ovalText: {
    textAlign: 'center',
    color: "white",
    paddingHorizontal: 10,
    fontWeight: "600"
  },
  icon: {
      width: "100%",
      height: "100%",
  }
});
