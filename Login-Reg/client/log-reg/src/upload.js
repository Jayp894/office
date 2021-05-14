import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Upload extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      password:'',
      submit:[],
      responses: '',
      responseToPost: '',
      Error: '',
      file: null,
      imgCollection: ''
    }
    this.onChange = this.onChange.bind(this);
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
};
*/
handleSubmit = async e => {
  e.preventDefault();
  const formData = new FormData();
  for (const key of Object.keys(this.state.imgCollection)) {
    formData.append('imgCollection', this.state.imgCollection[key])
  }/*
  const response = await fetch('http://localhost:4000/api/upload-images/', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: { 
        formData
    },
  });
  const body = await response.text();
  
  this.setState({ responseToPost: body });*/
  axios.post("http://localhost:4000/api/upload-images", formData, {
        }).then(res => {
            console.log(res.data)
     })
};
 
onChange(e) {
    this.setState({imgCollection:e.target.files});
}
    
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            {this.state.responseToPost}
            {this.state.responses}
            <form onSubmit={this.handleSubmit} >
                <input type="file" className="custom-file-input" name="myImage" onChange= {this.onChange} multiple />
                {console.log(this.state.file)}
                <br></br>
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
export default Upload;