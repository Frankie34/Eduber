import React, { Component } from "react";
import { observer } from "mobx-react";


const Todo = observer(({ todo }) => (
  <li>
    <input className = "checkBox"
      type="checkbox"
      checked={todo.finished}
      onClick={() => (todo.finished = !todo.finished)}
    />
    id: {todo.id} todo: {todo.title} user: {todo.user} priority :{todo.priority} 
  </li>
));

export default Todo;
