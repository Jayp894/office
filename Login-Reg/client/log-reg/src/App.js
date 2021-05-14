import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Register from './Register';
import Upload from './upload';

class App extends Component {
constructor(props){
  super(props);
  this.state={
  email: "",
  password: "",
  Sign: false,
  rgstr:[],
  val:[<Register></Register>],
  up:[],
  upml:[<Upload></Upload>],
  responses: '',
  Error: '',
  responseToPost: ''
  }
 } 

 /*
componentDidMount() {
  this.callApi()
    .then(res => this.setState({ responses: res.express }))
    .catch(err => console.log(err));
}

callApi = async () => {
  const responses = await fetch('http://localhost:4000/api/users/hello');
  const body = await responses.json();
  if (responses.status !== 200) throw Error(body.message);
  
  return body;
}; */

handleSubmit = async e => {
  e.preventDefault();
  const response = await fetch('http://localhost:4000/api/users/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: this.state.email,
                           password: this.state.password}),
  });
  const body = await response.text();
  
  this.setState({ responseToPost: body });
}; 


signup(val,rgstr){
   this.setState({rgstr:<Register ></Register>});
 } 
 close(rgstr,event){
   this.setState({rgstr:[]});
 }
mulup(val,up){
  this.setState({up:<Upload></Upload>});
} 
closeup(up,event){
  this.setState({up:[]});
}
render() {
    return (
      <div className="App">
        <div>
          <MuiThemeProvider>
            <div>
            <AppBar
              title="Login"
            />
            {this.state.responseToPost}
            <form onSubmit={this.handleSubmit}>
              <TextField
                hintText="Enter your email"
                floatingLabelText="email"
                onChange = {(event,newValue) => this.setState({email:newValue})}
                />
              <br/>
                <TextField
                  type="password"
                  hintText="Enter your Password"
                  floatingLabelText="Password"
                  onChange = {(event,newValue) => this.setState({password:newValue})}
                  />
                <br/>
                <input type="file" ></input>
                <br></br>
                <RaisedButton label="Submit" primary={true} style={style} type="submit"/>
              </form>
              <br/>
              <label>Don't have an account?</label> <br/>
              <RaisedButton label="Sign-Up" primary={true} style={style} onClick={(rgstr,event,val) => this.signup(val,rgstr)} onDoubleClick={(rgstr,event) => this.close(rgstr,event)}  ></RaisedButton>
              <br></br><label>Upload Multiple Images</label> <br/>
              <RaisedButton label="Image Upload" primary={true} style={style} onClick={(up,event,val) => this.mulup(val,up)} onDoubleClick={(up,event) => this.closeup(up,event)}  ></RaisedButton>
          </div>
          </MuiThemeProvider>
        </div>
        {this.state.rgstr}
        {this.state.up}
      </div> 
    );
  }
}
const style = {
 margin: 15,
};

export default App;
