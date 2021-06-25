import * as AWS from 'aws-sdk';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    Redirect,
    useHistory
  } from "react-router-dom";
import {Home} from './App.js';
import React from 'react';
const https = require('https');


function Login () {
  const history = useHistory();
    
  const state = 
    {
      username: '',
      password: ''
    };
  
      
  
  const handleChange = (event) => {

    switch(event.target.name) {
      case 'username':
        state.username = event.target.value;
        break;
      case 'password':
        state.password = event.target.value;
        break;
      default:
        break;
    }
  }
  
  const handleSubmit = async (event) => {
      
    
    const options = {
      hostname: '0t20d3rcf4.execute-api.us-west-1.amazonaws.com/default',
      path: '/ChessAppClient',
      method: 'GET'
    };

    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`);
      console.log(res);

      res.on('data', d => {
        console.log(JSON.stringify(d));
      });
    });

    req.on('error', error => {
      console.error(error);
    });

    req.end();
    
    
    
    User.auth = true;
    history.push("/");
  }
  
    
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={() => handleSubmit()}>
        <input type="text" placeholder="Username" name="username" value={state.username} onChange={handleChange}/>
        <input type="password" placeholder="Password" name="password" value={state.password} onChange={handleChange}/>
        <input type="submit" placeholder="Login"/>
      </form>
    </div>
  );
    
    
}
  
  class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = 
        {
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          email: ''
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
  
      switch(event.target.name) {
        case 'firstname':
          this.setState({firstname: event.target.value});
          break;
        case 'lastname':
          this.setState({lastname: event.target.value});
          break;
        case 'username':
          this.setState({username: event.target.value});
          break;
        case 'password':
          this.setState({password: event.target.value});
          break;
        case 'email':
          this.setState({email: event.target.value});
          break;
        default:
          break;
      }
    }
  
    handleSubmit(event) {
        
    }
  
    render() {
      return (
        <div>
          <h2>Register</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
            <input type="text" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
            <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange}/>
            <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
            <input type="submit" placeholder="Register"/>
          </form>
        </div>
      );
    }
    
  }

  const User = 
    {
        auth: false,
        username: "",

    }

    function PrivateRoute({ children, ...rest }) {
      //let auth = useAuth();
      return (
        <Route
          {...rest}
          render={({ location }) =>
            User.auth ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
    }

  

  export {
    PrivateRoute,
    User,
    Register,
    Login
    
  }
  
  