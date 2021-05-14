import './App.css';
import React from "react";
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repeat_pas: '',
      name: '',
      contacts: []
    };
    this.handleChange =this.handleChange.bind(this);
  }

  componentDidMount() {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name": this.state.name,
                                "email": this.state.email,
                                "password": this.state.password              
                              })
    };
    fetch('http://localhost:4000/api/users/', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ contacts: data.id }));
}  

handleClick(event) {
  console.log(event);
  if(this.state.password === this.state.repeat_pas){
      console.log("registered");
  }else{
    console.log("password did not match");
  }
}
handleChange(event){
  this.setState({[event.target.name]: event.target.value});
}

render() {
    return (
      <div className="App">
        <div class="register">
            <div class="containers">
              <h1>Register</h1>
              <p>Please fill in this form to create an account.</p>
              <hr></hr>
              <label ><b>name</b></label>
              <input type="text" placeholder="Enter Name" onChange={this.handleChange}  name="name" required></input>
              <label ><b>Email</b></label>
              <input type="text" placeholder="Enter Email" onChange={this.handleChange}  name="email" required></input>
              <label ><b>Password</b></label>
              <input type="password" placeholder="Enter Password" onChange={this.handleChange} name="password"  required></input>
              <label ><b>Repeat Password</b></label>
              <input type="password" placeholder="Repeat Password" onChange={this.handleChange} name="password-repeat"  required></input>
              <input type="file" ></input>
              <button type="submit" onClick={(event) => this.handleClick(event)} class="registerbtn">Register</button>
            </div>
            <div class="container signin">
              <p>Already have an account? Sign in.</p>
            </div>  
          </div>
        <div class="login">      
          <div class="containers">
              <label for="uname"><b>Username</b></label>
              <input type="text" placeholder="Enter Username" name="uname" required></input>

              <label for="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" required></input>

              <button type="submit">Login</button>
            </div>
        </div>
      </div>
    );
  }
}
export default App;
