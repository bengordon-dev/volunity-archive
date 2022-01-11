import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Story from './components/Story';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import { storyData } from "./data/stories"

export default class News extends Component {
  constructor(props) {
    super(props);
    /*YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);*/
    this.state = {
      orgDropDown: true,
      storyDropDown: true,
     
      filters: [
        {name: "Popular", type: "num"},
        {name: "Hunger Relief", type: "cat"},
        {name: "Political", type: "cat"},
        {name: "Local", type: "num"},
      ],
      selectedFilters: [

      ],
      selectedTags: [

      ],
      orgInput: "",
      stories: storyData
    }
    this.appState = this.props.route.params.appState
  }
  selectOption() {
    this.setState({orgDropDown: false})
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
      <ScrollView>
      <Text style={styles.title}>News</Text>

      <View style={{flexDirection: "row", width: "100%", flexWrap: "wrap"}}>
      <Text style={styles.header}>Stories</Text>
      <TouchableOpacity style={styles.dropDown} onPress={() => this.setState({storyDropDown: !this.state.storyDropDown})}>
      <Ionicons name={this.state.storyDropDown ? "chevron-down-outline" : "chevron-up-outline"} size={30} color={"#1B7CB3"} style={styles.dropDownText} />
      </TouchableOpacity>
      </View>
      {this.state.storyDropDown ? 
      <ScrollView horizontal={false} bounce={false} style={{maxHeight: 590}} contentContainerStyle={{flexDirection: "row", width: "100%", flexWrap: "wrap"}}>
          {this.state.stories && this.state.stories.map((story, i) => (
            <Story key={i} fullWidth={story.fullWidth} right={story.right ? story.right : false}
            coverSrc={story.coverSrc} newsLogoSrc={story.newsLogoSrc} 
            headline={story.headline} url={story.url}/>
          ))}
      </ScrollView>
      : <View style={{height: 0}}/>
      }
      </ScrollView>
      </View>
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
  }
});
