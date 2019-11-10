import { observable, action } from "mobx"

class Store {
    /*
    { 
        key: "",
        accepted: bool,
    }
    */
    @observable choices = [];
    @observable choosenLocations = [];
    @observable computedPath = [];
    @observable location = "";

    @action addSite = (key, accepted)  =>{
        this.choices.push({key:key, accepted:accepted});
    }
    @action changeLocation = (loc)  =>{
        this.location = loc
    }
}
let store = new Store();
export default store