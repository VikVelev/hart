import { observable, action, computed } from "mobx"

class Store {
    /*
    { 
        key: "",
        accepted: bool,
    }
    */
    @observable choices = [];
    @observable choosenLocations = [];
    @observable tripRoute = [];        // The full trip route
    @observable location = "";
    @observable update = false;

    @computed get currentTripRoute() {
        return this.tripRoute.filter((el) => el.visible)
    }

    @action toggleTripRoute = (index) =>{
        this.tripRoute[index].visible =  !this.tripRoute[index].visible 
    }
    @action setTripRoute = (route) =>{
        this.tripRoute = route
    }

    @action onTripChange = (route) =>{
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