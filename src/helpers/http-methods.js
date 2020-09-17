import {EventBus} from '@/events/event-bus';
import async from 'async';
import * as events from '@/constants/event-names';
import * as R from 'ramda';
import store from '@/store';

const passHTTP = R.curry((error,callback)=>{callback(null,error)})
function HTTPErrorValidation(data,callback){
  //Validate if exits the needed data for the handler
  if( ((data || {}).response || {}).status 
    && ((((data || {}).response || {}).data || {}).meta || {}).code){
    callback(null, data, data.response.status, data.response.data.meta.code)
  }else{
    callback(null,"ok")
  }
}
function HTTPResponseValidation(response,callback){
  //Validate if exits the needed data for the handler
  if( (response || {}).status
    && (((response || {}).data || {}). meta || {}).code
  ){
    callback(null, response, response.status, response.data.meta.code)
  }else{
    callback(null,"ok")
  }
}
const SessionFinishedValidation = R.curry(({getters},response,status,code,callback)=>{
  if(status==202 && code.trim() == "LOGOUT"){
    const {username,fullName} = getters.getUserData
    callback(()=>{
      EventBus.$emit(events.SESSION_TIME_FINISHED, {username,fullName});
    },null)
    return;
  }
  //Return normal reponse to the next function
  callback(null,response,status,code)

  return;
})

export const handleError = httpError =>{
  // Pipe's function to validate and filter global response actions
  async.waterfall(
    [
      passHTTP(httpError)
      , HTTPErrorValidation
    ] 
    , function(error,result){
      if(error && typeof error === 'function'){
        error()
      }
      if(result && typeof result==='function'){
        result()
      }
    }
  )
}

export const handleResponse = httpResponse=>{
  // Pipe's function to validate and filter global response actions
  async.waterfall(
    [
      passHTTP(httpResponse)
      , HTTPResponseValidation
      , SessionFinishedValidation(store)
    ] 
    , function(error,result){
      if(error && typeof error === 'function'){
        error()
      }
      if(result && typeof result==='function'){
        result()
      }
    }
  )
}