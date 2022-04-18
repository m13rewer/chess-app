# Chess

## About

Chess App is an online chess website where the users can create games
and play against other users remotely. Registration and login required to create games.
Credentials are sent to AWS via API Gateway, which triggers a Lambda function to persist the
data to a DynamoDB table. Upon successful login the user is redirected to the homepage for
gameplay. When a game is created, the request goes to a Socket.io server hosted on an EC2
instance. The game server runs in a Docker container and handles matchmaking. The React
front-end is hosted on AWS S3. AWS CodePipeline deploys to the bucket when it’s triggered by a
push to my GitHub repository main branch. I am the sole contributor to this project and intend to
continue adding new features and fix bugs.

