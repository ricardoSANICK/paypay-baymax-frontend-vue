import * as types from '@/constants/mutation-names';
import i18n from "@/local";

const state = {
  language: 'en'
};

/* gets data from store in a fancy way */
const getters = {
  getAppLanguage : state => state.language
};

/* executes actions mainly async actions */
const actions = {
  [types.APP_SET_LANGUAGE]({commit, state}, data){
    commit(types.APP_SET_LANGUAGE, data);
  }
}

/* mutates the state of the vue store app */
const mutations = {
  [types.APP_SET_LANGUAGE](state, data){
    i18n.locale = data;
    state.language = data;
  }
};

/* Exporting the State for Auth State Module*/
export default {
  state 
  , getters
  , actions
  , mutations
}