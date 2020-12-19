# Bruin Quest Web App
## Overview
This repository contains the web app that the Hack, Cyber, and ICPC committes of ACM at UCLA used to host Bruin Quest 2020 which took place November 21 to November 22. Bruin Quest is similar to a puzzle hunt, but with some extra puzzles that focus on creating something instead of discovering a secret key. The site uses a MERN stack (Mongodb, Express, React, Node).

## Setting Up Dev Environment
1. Clone this repository
2. Install MongoDB
   1. [These instructions are good](https://docs.mongodb.com/manual/tutorial/)
3. Type  `yarn` inside the root directory  (Download Server Dependencies) 
4. Type `yarn` inside the client directory (Download Front-end Dependencies)
5. Make dev.js file inside config folder
6. Put mongoDB info into dev.js file
   1. You can probably just copy `prod.js` 

## Starting the App
### Starting (and Stopping) the DB
[Those instructions are good](https://docs.mongodb.com/manual/tutorial/)
### Starting the Client
1. Go into client folder
2. `yarn start`
### Starting the Server 
1. Go into server folder
2. `yarn start`

## Making it pretty
### Run eslint for server
``` bash
cd server
yarn eslint .
yarn eslint --fix . # to autofix some problems
```
### Run eslint for client
```bash
cd client
yarn eslint .
yarn eslint --fix . # to autofix some problems
```
