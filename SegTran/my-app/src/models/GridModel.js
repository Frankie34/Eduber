import { observable } from "mobx";

export default class GridModel {
  ID = Math.random();
  @observable title;  
  @observable contentInput;
  @observable contentOutput0;
  @observable contentOutput1;
  @observable contentOutput2;
  @observable finished = false;

  constructor(title, contentInput) {
    this.title = title;
    this.contentInput = contentInput;

  }

}
