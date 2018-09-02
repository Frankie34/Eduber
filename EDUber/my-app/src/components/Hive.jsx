import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import $ from 'jquery';
import Grid from "./Grid";


const crypto = require('crypto');
const nkn = require('nkn-client');

// Use default seed rpc server:

// Use local seed rpc server:
// const seedRpcServerAddr = 'http://127.0.0.1:30003';
const timeout = 5000;
var timeSent, timeReceived;


@observer
class Hive extends React.Component {

  @observable newGridTitle = "";
  @observable newGridContentInput = "";
  @observable num = "";


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
            'Hello world!',
            // For byte array:
            // Uint8Array.from([1,2,3,4,5]),
          ).then((data) => {
            timeReceived = new Date();
            console.log('Receive', '"' + data + '"', 'from', toClient.addr, 'after', timeReceived - timeSent, 'ms');
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
      toClient.on('message', (src, payload, payloadType) => {
        timeReceived = new Date();
        var type;
        if (payloadType === nkn.PayloadType.TEXT) {
          type = 'text';
        } else if (payloadType === nkn.PayloadType.BINARY) {
          type = 'binary';
        }
        console.log('Receive', type, 'message', '"' + payload + '"','from', src, 'after', timeReceived - timeSent, 'ms');
        // Send a text response
        return 'Well received!';
        // For byte array response:
        // return Uint8Array.from([1,2,3,4,5])
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
    return(
      <div>
      	<div>
      	      <div>
      	      	<div>
        		<form onSubmit={this.handleFormSubmit1}>
          			Grid:
		          <input className = "input"
		            type="text"
		            value={this.newGridTitle}
		            onChange={this.handleInputChange0}
		          />
		          <input className = "input"
		            type="text"
		            value={this.newGridContentInput}
		            onChange={this.handleInputChange1}
		          />
		          <button className = "btn"type="submit">BLANK</button>
		        </form>
      		  </div>
        		<form onSubmit={this.get0}>
        		<button className = "btn" type="submit">Log</button>
        		</form>
      		  </div>
             <div>
        <form onSubmit={this.handleFormSubmit0}>
          Range Num:
          <input className = "input"
            type="text"
            value={this.num}
            onChange={this.handleInputChange3}
          />
          <button className = "btn" type="submit">BLANK</button>
        </form>
      </div>
      	</div>

      	<div className = "listPart">
      	<ul>
          {this.props.store.grids.map(grid => (
            <Grid grid={grid} key={grid.title}/>
          ))}
        </ul>
        </div>

      </div>
    );

  }

  @action
  handleInputChange0 = e => {
    this.newGridTitle = e.target.value;
  };
  @action
  handleInputChange1 = e => {
    this.newGridContentInput = e.target.value;
  };
  @action
  handleInputChange3 = e => {
    this.num = e.target.value;
  };

  @action
  handleFormSubmit0 = e => {
  this.props.store.rango(this.num);
 	this.newGirdTitle = "";
  this.newGridContentInput = "";

    e.preventDefault();
  };

  @action
  handleFormSubmit1 = e => {
    const react_this = this;
    var url="http://127.0.0.1:8000/grid/";
    var title = "";
    title = this.newGridTitle;
    var flag = "0";
    var contentInput = "";
    contentInput = this.newGridContentInput;
    var contentOutput0 = "BLANK";
    var contentOutput1 = "BLANK";
    var contentOutput2 = "BLANK";
    
    
    $.post(url,{
    title:title, 
    flag:flag, 
    contentInput:contentInput, 
    contentOutput0:contentOutput0, 
    contentOutput1:contentOutput1,
    contentOutput2:contentOutput2
    }, function(result){
            console.log(result)
    })
    this.newGridTitle = "";
    this.newGridContentInput = "";
    e.preventDefault();
  };



  @action
  get0 = e => {
    var url="http://127.0.0.1:8000/grid/";
    const react_this = this;
    $.get(url, function(result){
      react_this.props.store.grids = result;
    })
    e.preventDefault();
  };
}

export default Hive;
