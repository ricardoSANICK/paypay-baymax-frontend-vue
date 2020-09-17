import * as types from '@/constants/mutation-names';
import Auth from "@/services/auth";
import {HTTP} from "@/helpers/http-common";

const state = {
    username   : undefined
  , fullName   : undefined
  , avatar     : undefined
  , groups     : undefined
  , roles      : []
};

/* gets data from store in a fancy way */
const getters = {
  getUserData : state => ({...state})
  , getUserPermissions:state=>state.roles
};

/* executes actions mainly async actions */
const actions = {
  [types.USER_SET_DATA]({commit, state, dispatch}, data){
    /* Change store's state */
    commit(types.USER_SET_DATA, data);
  }
  , [types.USER_CLEAN_DATA]({commit, state, dispatch}){
    commit(types.USER_CLEAN_DATA);
  }
  , [types.USER_SET_AVATAR]({commit, state, dispatch}, data){
    commit(types.USER_SET_AVATAR, data);
  }
}

/* mutates the state of the vue store app */
const mutations = {
  [types.USER_SET_DATA](state, data){
    Object.keys(data).map(value=>{
      state[value] = data[value];
    });
  }
  , [types.USER_CLEAN_DATA](state){
    Object.keys(state).map(value=>{
      state[value] = undefined;
    })
  }
  , [types.USER_SET_AVATAR](state, {avatar}){
    state.avatar = avatar;
  }
};

/* Exporting the State for Auth State Module*/
export default {
  state
  , getters
  , actions
  , mutations
}