import React, { Component } from 'react';
import logo from './icon.svg';
import './App.css';
import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
import TodoModel from "./models/TodoModel";
import GridModel from "./models/GridModel";
import Grid from "./components/Grid";


const store = new TodoListModel();
const grid = new GridModel();

class App extends Component {


  render() {
    return (
      <div className="App">
       <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to EDUBER</h2>
        </div>
        


        <div className="gridformat0">
          <Grid grid = {grid} />
        </div><div className="gridformat0">
          <Grid grid = {grid} />
        </div>
        <div className="gridformat1">
          <Grid grid = {grid} />
        </div><div className="gridformat1">
          <Grid grid = {grid} />
        </div>
        <div className="gridformat1">
          <Grid grid = {grid} />
        </div>
        <div className="gridformat0">
          <Grid grid = {grid} />
        </div>
        <div className="gridformat0">
          <Grid grid = {grid} />
        </div>
      </div>

    );
  }
}

export default App;
