import placeholder from './assets/images/volunteering-placeholder.jpeg';
import React from 'react';
import './App.css'; 
import { ChevronBack, ChevronForward, PersonCircle } from 'react-ionicons'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <span>
      <div className={"top"}>
        <p className={"title"}>Volunity</p>
        <p className={"subTitle"}>Volunteering Made Simple</p>
      </div>
      <div>
        <button className={"homePageSelector"} style={{marginBottom: 15}} onClick={this.props.createAccount}>Create an Account</button>
        <br/>
        <button className={"homePageSelector"} style={{marginRight: 2.5, marginBottom: 15}}>Post a Volunteer Opportunity</button>
        <button className={"homePageSelector"} style={{marginLeft: 2.5, marginBottom: 15}}>Post a Donation Opportunity</button>
      </div>
      <img src={placeholder} name="placeholder" alt="placeholder"/>
      </span>
    )
  }
}

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
      <div className={"top"}>
        <div className="topThird" style={{textAlign: "left"}}><p>Volunity</p></div>
        <div className="topThird"><p className={"title"}>Account</p></div>
        <div className="topThird" style={{textAlign: "right"}}><PersonCircle/></div>
      </div>
      <div className={"accountPageBox"}>
        <div className={"boxTitle"}>{this.props.boxTitle}&nbsp;</div>
        <div className={"navBar"}>
          <button className="boxNav" onClick={this.props.leftFunc} disabled={(this.props.pageNumber === 1)}><ChevronBack height="20px" width="20px" style={{marginLeft: -2, marginBottom: -2}}/> </button>
          <button className="boxNav" onClick={this.props.rightFunc} disabled={(this.props.pageNumber === 5)}><ChevronForward height="20px" width="20px" style={{marginBottom: -2}}/></button>
        </div> 
        <div className={this.props.boxSubTitle.length ? "boxSubTitle" : ""}>{this.props.boxSubTitle}</div>
        {this.props.content}
      </div>
      </div>
    )
  }
}

class AccPhonePreview extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <button className="accPhonePreview"/>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      page: {name: "home", part: 1},
      createAccountInputs: [["", "", "", ""], ["", ""], [null, []], [""]]
    }
  }
  createAccount() {
    this.setState({page: {name: "acc", part: 1}})
  }
  updateCreateAccInput(e, page, field) {
    let l = this.state.createAccountInputs.slice(0)
    l[page].splice(field, 1, e.target.value)
    this.setState({createAccountInputs: l})
  }
  render() {
    if (this.state.page.name === "home")
    return (
      <HomePage createAccount={() => {this.createAccount()}} className={"HomePage"}/>
    )
    if (this.state.page.name === "acc")
    return (
      <AccountPage 
        boxTitle={
        this.state.page.part === 2 ? "Tell Users a Little About Yourself"
        : this.state.page.part === 3 ? "Attach Images"
        : this.state.page.part === 4 ? "Almost Done!"
        : this.state.page.part === 5 ? "Here's How Users Will See You"
        :""}
        boxSubTitle={
        this.state.page.part === 3 ? "Show off your services"
        : this.state.page.part === 4 ? "Let users learn more by attaching your website link"
        :""}
        rightFunc={() => this.setState({page: {name: "acc", part: this.state.page.part + 1}})}
        leftFunc={() => this.setState({page: {name: "acc", part: this.state.page.part - 1}})}
        pageNumber={this.state.page.part}
        content={
        this.state.page.part === 1 ? 
        <div className="accBoxContent">
          <p className="accQuestion">Organization Name</p>
          <input className="accOneLiner" value={this.state.createAccountInputs[0][0]} onChange={e => this.updateCreateAccInput(e, 0, 0)} type="text"></input>
          <p className="accQuestion">Organization Email</p>
          <input className="accOneLiner" value={this.state.createAccountInputs[0][1]} onChange={e => this.updateCreateAccInput(e, 0, 1)} type="text"></input>
          <p className="accQuestion">Create a Password</p>
          <input className="accOneLiner" value={this.state.createAccountInputs[0][2]} onChange={e => this.updateCreateAccInput(e, 0, 2)} type="password"></input>
          <p className="accQuestion">Confirm Password</p>
          <input className="accOneLiner" value={this.state.createAccountInputs[0][3]} onChange={e => this.updateCreateAccInput(e, 0, 3)} type="password"></input>
        </div>
        : this.state.page.part === 2 ? 
        <div className="accBoxContent">
          <p style={{marginTop: 40}} className="accQuestion">Mission Statement</p>
          <textarea className="accMultiLine" style={{height: 84}} value={this.state.createAccountInputs[1][0]} onChange={e => this.updateCreateAccInput(e, 1, 0)} type="text"></textarea>
          <p className="accQuestion">Describe Your Services</p>
          <textarea style={{height: 210}} className="accMultiLine" value={this.state.createAccountInputs[1][1]} onChange={e => this.updateCreateAccInput(e, 1, 1)} type="text"></textarea>
        </div>
        : this.state.page.part === 3 ?
        <div>
          <button className="logoUpload">
            <p>Logo</p>
            <p>(Required)</p>
          </button>
          <button className="imagesUpload">
            <p>Images</p>
            <p>(Optional)</p>
          </button>
        </div>
        : this.state.page.part === 4 ?
        <div className="accBoxContent">
          <input className="accOneLiner" value={this.state.createAccountInputs[3][0]} onChange={e => this.updateCreateAccInput(e, 3, 0)} type="text"></input>
        </div>
        : this.state.page.part === 5 ?
        <div>
          <div className="accPhonePreview"/>
        </div>
        : <div/>
        }

      />
    )
  }
};

