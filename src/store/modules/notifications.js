import * as types from '@/constants/mutation-names';

const state = {  
  notifications : []
};

/* gets data from store in a fancy way */
const getters = {
  getUserNotifications:state=>state.notifications
};

/* executes actions mainly async actions */
const actions = {
  [types.NOTIFICATION_SET_DATA]({commit, state, dispatch}, data){
    /* Change store's state */
   commit(types.NOTIFICATION_SET_DATA, data);
  }
}

/* mutates the state of the vue store app */
const mutations = {};

/* Exporting the State for Auth State Module*/
export default {
  state
  , getters
  , actions
  , mutations
}