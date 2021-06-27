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
const axios = require('axios');


function Login () {
  const history = useHistory();
  
  const state = 
    {
      username: '',
      password: ''
    };
  
      
  
  const handleChange = (event) => {
    console.log("handleChange()");
    
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
    let dataObj;

    https.get(`https://4kvh5oaf6f.execute-api.us-west-1.amazonaws.com/test/login?username=${username}&password=${password}`, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      
      resp.on('end', () => {
        dataObj = JSON.parse(data);
        if(dataObj.Password !== undefined) {
          User.username = dataObj.Username;
          User.auth = true;
          history.push("/");
        }
        console.log(User);
        console.log(dataObj);
        console.log(JSON.parse(data));
        
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
      return;
    });
    console.log(User.auth);
    setTimeout(() => {console.log(User)}, 1000);
    //User.auth = true;
    //history.push("/");
  }
  
    
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" name="username" onChange={(event) => handleChange(event)}/>
        <input type="password" placeholder="Password" name="password" onChange={(event) => handleChange(event)}/>
        <input type="button" onClick={() => handleSubmit()} value="Login"/>
      </form>
    </div>
  );
    
    
}
  
function Register() {
  
  const history = useHistory();
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

  const handleSubmit = async (event) => {
    console.log("handleSubmit()");
    const username = state.username;
    const password = state.password;
    const firstname = state.firstname;
    const lastname = state.lastname;
    const email = state.email;

    console.log(username);
    console.log(password);
    let dataObj;
    const invokeURL = `https://4kvh5oaf6f.execute-api.us-west-1.amazonaws.com/test/register?`;
    const requestParams = `username=${username}&password=${password}&firstname=${firstname}&lastname=${lastname}&email=${email}`
    
    axios
      .post(invokeURL+requestParams)
      .then((res) => {
        let dataObj = res.data;
        if(dataObj.Password !== undefined) {
          history.push("/login");
        }
        
        console.log(dataObj);
        //console.log(JSON.parse(data));
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    
    setTimeout(() => {console.log(User)}, 1000);
  }

  
  return (
    <div>
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="First Name" name="firstname" onChange={(event) => handleChange(event)}/>
        <input type="text" placeholder="Last Name" name="lastname" onChange={(event) => handleChange(event)}/>
        <input type="text" placeholder="Username" name="username" onChange={(event) => handleChange(event)}/>
        <input type="password" placeholder="Password" name="password" onChange={(event) => handleChange(event)}/>
        <input type="text" placeholder="Email" onChange={(event) => handleChange(event)}/>
        <input type="button" value="Register" name="email" onClick={() => handleSubmit()}/>
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
  
  