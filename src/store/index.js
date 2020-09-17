import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import notifications from "@/store/modules/notifications";
import appSettings from "@/store/modules/app-settings";

const {state, actions, mutations} = appSettings;

// Default getter for root Store
const getAllState = stateStore => stateStore;

// Add plugin to Vue
Vue.use(Vuex);

// Add localstorage persistence for Vuex
const vuexLocalStorage = new VuexPersist({
  key: 'paypay-vuex'                  // The key to store the state on in the storage provider.
  , storage: window.localStorage // or window.sessionStorage or localForage or localStorage
})

//Create Store
const store = new Vuex.Store({
  state
  , actions
  , mutations
  , getters:{
    getAllState
  }
  , modules:{
    auth
    , user
    , notifications
  } 
  //Adding plugins to vuex instance
  , plugins: [
    vuexLocalStorage.plugin
  ]
});

export default store;