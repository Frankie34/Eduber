import { observable } from "mobx";

export default class GridModel {
  ID = Math.random();
  @observable title;  
  @observable user;
  @observable priority;
  @observable id;
  @observable finished = false;

  constructor(title, user, priority, id) {
    this.title = title;
    this.user = user;
    this.priority = priority;
    this.id = id;
  }

}
