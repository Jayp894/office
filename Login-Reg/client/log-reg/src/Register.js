import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      password:'',
      submit:[],
      responses: '',
      responseToPost: '',
      Error: ''
    }
  }
  
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
};

handleSubmit = async e => {
  e.preventDefault();
  const response = await fetch('http://localhost:4000/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: this.state.name,
                           email: this.state.email,
                           password: this.state.password}),
  });
  const body = await response.text();
  
  this.setState({ responseToPost: body });
};
    
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            {this.state.responseToPost}
            {this.state.responses}
            <form onSubmit={this.handleSubmit} >
              <TextField
                hintText="Enter your Name"
                floatingLabelText="Name"
                onChange = {(event,newValue) => this.setState({name:newValue})}
                />
              <br/>
              <TextField
                hintText="Enter your Email"
                type="email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({email:newValue})}
                />
              <br/>
              <TextField
                type = "password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
                />
              <br/>
              {this.state.submit}<br/>
              <RaisedButton type="submit" label="Submit" primary={true} style={style} />
            </form>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;