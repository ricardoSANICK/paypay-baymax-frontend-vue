import async from 'async';
import * as actions from "@/constants/mutation-names";
import {HTTP} from "@/helpers/http-common";
import * as R from "ramda";

function setHTTPAuthorizationHeader({getters:{getUserIsAuthenticated:userIsAuthenticated, getUserToken:userToken}}, HTTP, callback){
  if(userIsAuthenticated){
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
  }
  callback(null,"HTTP Authorization Header reviewed")
}

function setStartSessionTime({dispatch ,getters:{getUserIsAuthenticated:userIsAuthenticated}},callback){
  if(userIsAuthenticated){
    dispatch(actions.AUTH_START_SESSION_TIME);
  }
  callback(null,"Session Time Interval reviewed")
}

function validateCheckListAfterRefresh(store, HTTP){
  async.series(
    [
      callback=>{setHTTPAuthorizationHeader(store,HTTP,callback)}
      , callback=>{setStartSessionTime(store,callback)}
    ]
    , function(error,results){
      if(error)console.log(error)
      //if(results)console.log(results)
    }
  );
}

export {
  validateCheckListAfterRefresh
}