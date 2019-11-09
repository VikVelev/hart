import { observable, action } from "mobx"

class Store {
    /*
    { 
        key: "",
        accepted: bool,
    }
    */
    @observable choices = [];

    @action addSite = (key, accepted)  =>{
        this.choices.push({key:key, accepted:accepted});
    }
}
let store = new Store();
export default store