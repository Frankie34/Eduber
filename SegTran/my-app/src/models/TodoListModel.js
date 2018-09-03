import { observable, computed, action } from "mobx";
import TodoModel from "./TodoModel";

export default class TodoListModel {
  @observable todos = [];


  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action
  addTodo(title, user, priority) {
    this.todos.push(new TodoModel(title, user, priority));
  }

  @action
  updateTodo(ID, title, user, priority) {
    this.todos[ID].title = title;
    this.todos[ID].user = user;
    this.todos[ID].priority = priority;

  }

  @action
  destroy(ID) {
    var i = ID;
    this.todos.splice(i,1);
  }

}

