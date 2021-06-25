var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  
});

var docClient = new AWS.ApiGatewayV2();

var params = {
    TableName: "Account",
    Key:{
        "Username": "m13rewer"
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});

// // const POOL_ID = "us-west-1:9baa28a7-f0bc-4a1b-af01-bd6a69aa52be";

//const COGNITO_CREDS = new AWS.CognitoIdentityCredentials({IdentityPoolId:POOL_ID});

// var myConfig = new AWS.config({
//   credentials: COGNITO_CREDS, region: 'us-west-1'
// });