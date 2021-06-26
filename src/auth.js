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
    console.log("handleChange()");
    console.log(event);
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
    console.log("handleSubmit()");
    const username = state.username;
    const password = state.password;
    console.log(username);
    console.log(password);

    https.get(`https://4kvh5oaf6f.execute-api.us-west-1.amazonaws.com/test/login?username=${username}&password=${password}`, (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(JSON.parse(data));
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

    User.auth = true;
    history.push("/");
  }
  
    
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={() => handleSubmit()}>
        <input type="text" placeholder="Username" name="username" onChange={(event) => handleChange(event)}/>
        <input type="password" placeholder="Password" name="password" onChange={(event) => handleChange(event)}/>
        <input type="submit" placeholder="Login"/>
      </form>
    </div>
  );
    
    
}
  
function Register() {
  
    const state = 
      {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        email: ''
      };

    

  const handleChange = (event) => {

    switch(event.target.name) {
      case 'firstname':
        state.firstname = event.target.value;
        break;
      case 'lastname':
        state.lastname = event.target.value;
        break;
      case 'username':
        state.username = event.target.value;
        break;
      case 'password':
        state.password = event.target.value;
        break;
      case 'email':
        state.email = event.target.value;
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event) => {
      
  }

  
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={() => handleSubmit()}>
        <input type="text" placeholder="First Name" name="firstname" onChange={(event) => handleChange(event)}/>
        <input type="text" placeholder="Last Name" name="lastname" onChange={(event) => handleChange(event)}/>
        <input type="text" placeholder="Username" name="username" onChange={(event) => handleChange(event)}/>
        <input type="password" placeholder="Password" name="password" onChange={(event) => handleChange(event)}/>
        <input type="text" placeholder="Email" onChange={(event) => handleChange(event)}/>
        <input type="submit" placeholder="Register"/>
      </form>
    </div>
  );
  
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
  
  