import { observable, computed, action } from "mobx";
import GridModel from "./GridModel";


var lEngth = 0;

export default class HiveModel {
  @observable grids = [];


  @computed
  get unfinishedgridsCount() {
    return this.grids.filter(grid => !grid.finished).length;
  }

  @action
  addgrid(title, contentInput) {
    this.grids.push(new GridModel(title, contentInput));
  }

  @action
  rango(ID) {
    var pieces = [];

    this.grids[ID].contentOutput0 = "";
    this.grids[ID].contentOutput1 = "";
    this.grids[ID].contentOutput2 = "";  

    pieces = (String(this.grids[ID].contentInput)).split("");
    
    for (var j = 0; j < pieces.length;j++) {
      if(j%6 == 0){this.grids[ID].contentOutput0 += String(pieces[j]);}
      else if(j%6 == 1 || j%6 == 2){this.grids[ID].contentOutput1 += String(pieces[j]);}
      else{this.grids[ID].contentOutput2 += String(pieces[j]);}
    }

 
    console.log(pieces);  

  }
/*
  @action
  derango(ID, lEngth) {

    var m = 0;
    var n = 0;
    var k = 0;

    for (var j = 0; j < lEngth;j++) {
      if(j%6 == 0){this.grids[ID].contentInput += (String(this.grids[ID].contentOutput0)).split("")[m];m++;}
      else if(j%6 == 1 || j%6 == 2){this.grids[ID].contentInput += (String(this.grids[ID].contentOutput1)).split("")[n];n++}
      else{this.grids[ID].contentInput += (String(this.grids[ID].contentOutput1)).split("")[k];k++}
    }

 
    console.log(pieces);  

  }
*/

  @action
  destroy(ID) {
    var i = ID;
    this.grids.splice(i,1);
  }

}