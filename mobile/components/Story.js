import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';

export default function Story(props) {
    return (
      <TouchableOpacity style={[{
        width: (props.fullWidth? "100%" : "49%"),
        height: (props.fullWidth? 290 : 175),
        marginLeft: (props.fullWidth? 0 : (props.right? "2%" : 0)),
        backgroundColor: (props.coverSrc ? "rgba(255, 255, 255, 0)" : "white")
      }, styles.button]}
      onPress={() => Linking.openURL(props.url ? props.url : "https://google.com")}>
        <Image source={props.coverSrc} style={[
          props.fullWidth ? {
            width: "100%",
            height: "80%",
            borderRadius: 10, 
          } : {
            width: 100,
            height: 100
        }, {}]} />
        <View style={[
          props.fullWidth ? {
            height: "20%",
            width: "100%"
          } : {
            width: "100%",
            height: "35%"
        }, styles.storyInfo]}>
        <Image source={props.newsLogoSrc} style={[
          props.fullWidth ? {
            width: 40,
            height: 47
          } : {
        
        }, {marginRight: 10}]}/>
        <Text style={styles.headline}>{props.headline}</Text>
        </View>
      
      </TouchableOpacity>
    );
  }
  
const styles = StyleSheet.create({
  button: {
    marginBottom: 7.5,
    borderRadius: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  storyInfo: {
      backgroundColor: "white",
      borderRadius: 10,
      flexWrap: "wrap",
      justifyContent: "center"
  },
  headline: {
    maxWidth: "80%",
    fontFamily: "Arial-Black",
    fontSize: 18
  }
});