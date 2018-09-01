import React, { Component } from "react";
import { observer } from "mobx-react";


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
    	<li>user: {grid.user}</li>
    	<li>priority :{grid.priority}</li> 
    </ul>
    </div>
));

export default Grid;
