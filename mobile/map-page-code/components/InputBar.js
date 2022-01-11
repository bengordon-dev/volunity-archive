import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class InputBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      locationInput: "",
    }
  }
  render()
  {
  return (
    <View style={this.props.style1}>
      <TextInput 
        style={this.props.style2} 
        onChangeText={(locationInput) => {
          this.props.textChange(locationInput)
          this.setState({locationInput})
        }}
        onSubmitEditing={(e) => {  
            this.props.onEnter()
        }} 
        defaultValue={this.props.defaultValue}
        clearTextOnFocus={this.state.locationInput? false : true}
        />
    </View>
  )
  }
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#171717',
    shadowOpacity: .1,
    paddingBottom: 10,
  },
  input: {
    backgroundColor: '#F3F3F3',
    flex: .95,
    fontSize: 18,
    height: 35,
    borderRadius: 18,
    paddingHorizontal: 10,
  },
})
