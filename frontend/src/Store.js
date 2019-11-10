import { observable, action } from "mobx"

class Store {
    /*
    { 
        key: "",
        accepted: bool,
    }
    */
    @observable choices = [];
    @observable tripRoute = [];

    @action addTripRoute = (route) =>{
        this.tripRoute = route
    }

    @action addSite = (key, accepted)  =>{
        this.choices.push({key:key, accepted:accepted});
    }
    @action changeLocation = (loc)  =>{
        this.location = loc
    }
}
let store = new Store();
export default store