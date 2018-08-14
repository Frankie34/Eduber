//Uber for education
//解决问题: 教育培训行业，商家与客户对接

import React, { Component } from 'react';
import logo from './logo.svg';
import image0 from './static/img/camp.jpg';
import image1 from './static/img/test.jpg';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const crypto = require('crypto');
const nkn = require('nkn-client');


const timeout = 5000;
var timeSent, timeReceived;


class App extends Component {

findTutor() {
  //psuedocode:
  //request = "Math" + "Location" + "Grade"
  //spreadMessage(request,fromclient,toFriends)
  //getToClient()
  //generateMessage()
}

generateMessage() {
  let fromClient = nkn({
    // neither of these are required, as shown in toClient below
    identifier: crypto.randomBytes(8).toString('hex'),
    privateKey: 'cd5fa29ed5b0e951f3d1bce5997458706186320f1dd89156a73d54ed752a7f37',
  });

  fromClient.on('connect', () => {
    try {
      let toClient = nkn();
      toClient.on('connect', () => {
        try {
          fromClient.send(
            toClient.addr,
            'This is a generated message.',
          ).then(() => {
            timeReceived = new Date();
            console.log('Receive ACK from', toClient.addr, 'after', timeReceived - timeSent, 'ms');
          }).catch((e) => {
            console.log('Catch: ', e);
          });
          timeSent = new Date();
          console.log('Send message from', fromClient.addr, 'to', toClient.addr);
          setTimeout(function () {
            try {
              toClient.close();
              if (timeReceived === undefined) {
                console.log('Message from', fromClient.nodeAddr, 'to', toClient.nodeAddr, 'timeout');
              }
            } catch (e) {
              console.error(e);
            }
          }, timeout);
        } catch (e) {
          console.error(e);
        }
      });
      toClient.on('message', (src, payload) => {
        timeReceived = new Date();
        console.log('Receive message from', src, 'after', timeReceived - timeSent, 'ms');
      });
      setTimeout(function () {
        try {
          fromClient.close();
        } catch (e) {
          console.error(e);
        }
      }, timeout);
    } catch (e) {
      console.error(e);
    }
  });
}


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EDUber</h1>
        </header>
        
         <div className="txtContent">
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Hi, welcome to nknTech
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper>
            <input className="inputBox" type="text" placeholder="Grade" /></Paper><Paper>
            <input className="inputBox" type="text" placeholder="Location" /></Paper><Paper>
            <input className="inputBox" type="text" placeholder="Subject" />
          </Paper>
         </div>
         
         <p className="App-intro">
          To start the service</p>
        <Button variant="contained" color="primary" onClick={()=>{this.generateMessage()}} > <code>  PRESS </code> </Button>
        

        <div className="picDiv">
          <Avatar className="Avatar" src={image0} /><Avatar className="Avatar" src={image0} /><Avatar className="Avatar" src={image0} />
        </div>
        <code>These guy helped you find your ideal tutor</code>
        <div>
          <Card className="card">
            <CardMedia className="media" image={image1} title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Lee
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      </div>
      </div>

    );
  }
}

export default App;
