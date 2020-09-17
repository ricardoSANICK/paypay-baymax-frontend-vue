import Auth from "@/services/auth";
import * as types from '@/constants/mutation-names';
import * as events from '@/constants/event-names';
import {HTTP} from "@/helpers/http-common";
import moment from "moment";
import {EventBus} from '@/events/event-bus';

// store's state
const state = {
    userToken          : undefined
  , userIsAuthenticated: undefined
  , startSessionDate : undefined
  , idSessionTimeInterval : undefined
};

// gets data from store in a fancy way (formatted, transformed)
const getters = {
      getUserToken          : (state, getters) => state.userToken
    , getUserIsAuthenticated: (state, getters) => state.userIsAuthenticated
    , getIdSessionTimeINterval:(state, getters) => state.idSessionTimeInterval
    , getStartSessionDate:(state,getters)=>moment(state.startSessionDate)
};

// executes actions mainly async functions
const actions = {
  [types.AUTH_LOGIN]({commit, state, dispatch}, data){ 
    /* Change store's state */
    commit(types.AUTH_SUCCESS, data);
    /* Set user data store*/
    dispatch(types.USER_SET_DATA,data);
    /* Start session time */
    dispatch(types.AUTH_START_SESSION_TIME);
  }
  , [types.AUTH_ERROR]({commit, state, dispatch}){
    /* Change store's state */
    commit(types.AUTH_ERROR);
  }
  , [types.AUTH_LOGOUT]({commit, state, dispatch}){
    //Stop SessionTimeInterval
    clearInterval(state.idSessionTimeInterval);
    /* Change store's state */
    commit(types.AUTH_LOGOUT);
    /* Set user data store*/
    dispatch(types.USER_CLEAN_DATA);
  }
  , [types.AUTH_START_SESSION_TIME]({state,getters,commit, dispatch}){
    const {username} = getters.getUserData;
    //Set Time Interval
    const idSessionTimeInterval = setInterval(() => {  
    if(moment().diff(getters.getStartSessionDate,'minutes') >= process.env.VUE_APP_SESSION_TIME_EXPIRATION)
      EventBus.$emit(events.SESSION_TIME_FINISHED, {username});
    }, process.env.VUE_APP_SESSION_TIME_INTERVAL_EVALUATION);
    commit(types.ID_SESSION_TIME_INTERVAL,{idSessionTimeInterval})
  }
  , [types.STOP_ID_SESSION_TIME_INTERVAL]({state,getters,commit, dispatch}){
    clearInterval(state.idSessionTimeInterval);
    commit(types.STOP_ID_SESSION_TIME_INTERVAL);
  }
}

/// mutates the state of the vue store
const mutations = {
  [types.AUTH_SUCCESS](state, {userToken}){
    /* Change State */
    state.userToken           = userToken;
    state.userIsAuthenticated = true;
    state.startSessionDate = moment();
  }
  , [types.AUTH_ERROR](state,){
    /* Reset State */
    Object.keys(state).map(attr=>{
      state[attr] = undefined;
    })
  }
  , [types.AUTH_LOGOUT](state){
    /* Reset State */
    Object.keys(state).map(attr=>{
      state[attr] = undefined;
    })
  }
  , [types.ID_SESSION_TIME_INTERVAL](state,{idSessionTimeInterval}){
    state.idSessionTimeInterval=idSessionTimeInterval;
  }
  , [types.STOP_ID_SESSION_TIME_INTERVAL](state){
    state.idSessionTimeInterval=undefined;
  }
};

/* Exporting the State for Auth State Module*/
export default {
  state
  , getters
  , actions
  , mutations
}