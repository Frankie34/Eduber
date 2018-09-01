import React, { Component } from 'react';
import logo from './icon.svg';
import './App.css';
import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
import TodoModel from "./models/TodoModel";


const store = new TodoListModel();

class App extends Component {


  render() {
    return (
      <div className="App">
       <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to EDUBER</h2>
        </div>

        <div className="txt">
          <TodoList store={store} />
        </div>
      </div>

    );
  }
}

export default App;
