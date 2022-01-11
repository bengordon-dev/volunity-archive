import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "main",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      passwd: "",
      passwd2: "",
    }
    this.appState = props.appState
  }

  signUp() {
    let id = Math.floor(Math.random()*(2**32)) + (1+Math.floor(Math.random()*9))*(10**10)
    let data = {firstName: this.state.firstName, lastName: this.state.lastName, 
      email: this.state.email, phone: this.state.phone, passwd: this.state.passwd}
    console.log(`${id}:`, data)
    this.props.signUp(this.state.firstName, this.state.lastName)
  }
  logIn() {
    console.log(this.state)
    this.props.logIn()
  }

  return() {
    this.setState({page: "main", 
    firstName: "", lastName: "", email: "", phone: "", passwd: "",passwd2: "",})
  }

  render() {
    return (
      <View style={styles.container}>
      <LinearGradient
        colors={this.appState.theme}
        style={styles.background}
      />
      <ScrollView contentContainerStyle={{alignItems: "center", height: "100%"}}>
        <Text style={styles.title}>{this.state.page === "login" ? "Welcome Back" : "Welcome To Volunity"}</Text>
        {this.state.page === "main" ?         
        <View style={{width: "100%", alignItems: "center"}}>
          <Text style={styles.header}>Volunity connects communities {'\n'} through volunteering</Text>
          <TouchableOpacity onPress={() => this.setState({page: "signup"})}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({page: "login"})}><Text style={styles.buttonText}>Log In</Text></TouchableOpacity>
          <Image style={styles.signupicon} source={require('./assets/images/VolunitySignUpIcons.png')}/>
        </View>  
        : this.state.page === "login" ? 
        <View style={{width: 340, alignItems: "center"}}>
          <View style={{width: "100%", alignItems: "flex-start", marginTop: 30, marginBottom: 150}}>
            <Text style={styles.formQuestion}>Email</Text>
            <TextInput style={styles.formInput}
            onChangeText={(value) => this.setState({email: value})}/>
            <Text style={styles.formQuestion}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.formInput}
            onChangeText={(value) => this.setState({passwd: value})}/>
          </View>
          <TouchableOpacity onPress={() => this.logIn()} style={styles.submit}>
            <Text style={styles.submitText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.cancelText} onPress={() => this.return()}>Cancel</Text>
        </View>
        : 
        <View style={{width: 340, alignItems: "center"}}>
          <View style={{width: "100%", alignItems: "flex-start", marginTop: 30}}>
            <Text style={styles.formQuestion}>Name</Text>
            <View style={{width: "100%", flexWrap: "wrap", height: 40, marginBottom: 16}}>
              <View>
                <TextInput style={[styles.formInputName, {marginRight: 10}]}
                onChangeText={(value) => this.setState({firstName: value})} />
                <Text style={{color: '#5D5D5D', marginRight: 105}}>First</Text>
              </View>
              <View>
                <TextInput style={styles.formInputName}
                onChangeText={(value) => this.setState({lastName: value})}/>
                <Text style={{color: '#5D5D5D',}}>Last</Text>
              </View>
            </View>
            <Text style={styles.formQuestion}>Email</Text>
            <TextInput style={styles.formInput}
            onChangeText={(value) => this.setState({email: value})}/>
            <Text style={styles.formQuestion}>Phone Number</Text>
            <TextInput style={styles.formInput}
            onChangeText={(value) => this.setState({phone: value})}/>
            <Text style={styles.formQuestion}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.formInput}
            onChangeText={(value) => this.setState({passwd: value})}/>
            <Text style={styles.formQuestion}>Confirm Password</Text>
            <TextInput secureTextEntry={true} style={styles.formInput}
            onChangeText={(value) => this.setState({passwd2: value})}/>
          </View>
          <TouchableOpacity onPress={() => this.signUp()} style={styles.submit}>
            <Text style={styles.submitText}>Create</Text>
          </TouchableOpacity>
          <Text style={styles.cancelText} onPress={() => this.return()}>Cancel</Text>
        </View>
        }
      </ScrollView>
      </View>
    )
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
  signupicon: {
    width: 300,
    height: 300,
    marginLeft: 0,
    marginTop: 50,
    alignContent: 'center'
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 48, 
    marginTop: 50,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontFamily: "Arial-Black"
  },
  header: {
    fontSize: 21, 
    color: "#5D5D5D", 
    fontFamily: "Helvetica Neue",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5
  },
  buttonText: {
    fontSize: 36,
    fontWeight: "500",
    color: "#5D5D5D",
    marginTop: 10, 
    textAlign: "center",
  },
  submit: {
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, .075)',
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 60,
    marginTop: 30,
  },
  submitText: {
    color: '#5D5D5D',
    fontSize: 24,
    fontFamily: 'Helvetica Neue',
    fontWeight: "500"
  },
  formQuestion: {
    fontFamily: 'Helvetica Neue',
    fontSize: 22,
    marginBottom: 5,
    fontWeight: "400"
  },
  formInput: {
    width: 225,
    height: 28,
    //color: '#5D5D5D',
    borderBottomColor: '#5D5D5D',
    borderBottomWidth: 1,
    marginBottom: 17,
    fontSize: 16
  },
  formInputName: {
    width: 120,
    height: 28,
    borderBottomColor: '#5D5D5D',
    borderBottomWidth: 1,
    fontSize: 16
  },
  cancelText: {
    marginTop: 10
  }

});