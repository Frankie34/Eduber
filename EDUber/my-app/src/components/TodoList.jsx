import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import $ from 'jquery';
import Todo from "./Todo";


const crypto = require('crypto');
const nkn = require('nkn-client');

// Use default seed rpc server:

// Use local seed rpc server:
// const seedRpcServerAddr = 'http://127.0.0.1:30003';
const timeout = 5000;
var timeSent, timeReceived;

@observer
class TodoList extends React.Component {

  @observable newTodoTitle = "";
  @observable newTodoUser = "";
  @observable newTodoPriority = "";
  @observable num = "";
  @observable num1 = "";

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
    this.generateMessage();
    return (
      <div>
      <div>
        <form onSubmit={this.handleFormSubmit1}>
          Todo:
          <input className = "input"
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange0}
          />
          <input className = "input"
            type="text"
            value={this.newTodoUser}
            onChange={this.handleInputChange1}
          />
          <input className = "input"
            type="text"
            value={this.newTodoPriority}
            onChange={this.handleInputChange2}
          />
          <button className = "btn"type="submit">Add</button>
        </form>
      </div>
      <div>
        <form onSubmit={this.handleFormSubmit0}>
          Update Num:
          <input className = "input"
            type="text"
            value={this.num}
            onChange={this.handleInputChange3}
          />
          <button className = "btn" type="submit">Update</button>
        </form>
      </div>
      <div>
        <form onSubmit={this.handleFormSubmit2}>
          Delete Num:
          <input className = "input"
            type="text"
            value={this.num1}
            onChange={this.handleInputChange4}
          />
          <button className = "btn" type="submit">Delete</button>
        </form>
      </div>
      <div>
        <form onSubmit={this.get0}>
        <button className = "btn" type="submit">Sync</button>
        </form>
      </div>


        <hr />
        <ul>
          {this.props.store.todos.map(todo => (
            <Todo todo={todo} key={todo.priority} />
          ))}
        </ul>
        Tasks left: {this.props.store.unfinishedTodoCount}
      </div>
    );
  }

  @action
  handleInputChange0 = e => {
    this.newTodoTitle = e.target.value;
  };
  @action
  handleInputChange1 = e => {
    this.newTodoUser = e.target.value;
  };
  @action
  handleInputChange2 = e => {
    this.newTodoPriority = e.target.value;
  };
  @action
  handleInputChange3 = e => {
    this.num = e.target.value;
  };
  @action
  handleInputChange4 = e => {
    this.num1 = e.target.value;
  };

  @action
  handleFormSubmit0 = e => {
    this.props.store.updateTodo(this.num, this.newTodoTitle, this.newTodoUser, this.newTodoPriority);
    this.newTodoTitle = "";
    this.newTodoUser = "";
    this.newTodoPriority = "";
    this.num = "";
    e.preventDefault();
  };
  @action
  handleFormSubmit1 = e => {
    const react_this = this;
    var url="http://127.0.0.1:8000/todo/";
    var user = 1;
    var title = "";
    var flag = "0";
    var priority = "0";
    this.props.store.addTodo(this.newTodoTitle, this.newTodoUser, this.newTodoPriority);

    title = this.newTodoTitle;
    priority = this.newTodoPriority;

    $.post(url,{user:user, title:title, flag:flag, priority:priority}, function(result){
            console.log(result)
        })
    this.newTodoTitle = "";
    this.newTodoUser = "";
    this.newTodoPriority = "";
    e.preventDefault();
  };

  @action
  handleFormSubmit2 = e => {
    this.props.store.destroy(this.num1);
    fetch("http://127.0.0.1:8000/todo/"+this.num1+"/",{
      method:'DELETE',
    }).then(function(result){
      console.log(result)
    })
    e.preventDefault();
  };

  @action
  get0 = e => {
    var url="http://127.0.0.1:8000/todo/";
    const react_this = this;
    $.get(url, function(result){
      react_this.props.store.todos = result;
      console.log(react_this.props.store.todos[1].id)
    })
    e.preventDefault();
  };
}

export default TodoList;
