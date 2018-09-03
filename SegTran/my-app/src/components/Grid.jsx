import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import $ from 'jquery';



const Grid = observer(({ grid }) => (
    <div>
    <input className = "checkBox"
      type="checkbox"
      checked={grid.finished}
      onClick={() => (grid.finished = !grid.finished)}
    />
    <ul>
    	<li>id: {grid.id} </li>
    	<li>title: {grid.title}</li> 
    	<li>inputContent:{grid.contentInput}</li> 
    </ul>
    <ul>
      <li>outputContentI:{grid.contentOutput0}</li>
      <li>outputContentII:{grid.contentOutput1}</li>
      <li>outputContentIII:{grid.contentOutput2}</li>
    </ul>
    </div>
));

export default Grid;
