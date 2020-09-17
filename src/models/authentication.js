import {Model} from 'vue-mc';
//import { boolean , equal , integer , min , required , string , and , length , alphanumeric } from 'vue-mc/validation';

export class AuthenticationModel extends Model{
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      username         : ""
      , password       : ""
      , newpassword    : ""
      , confirmpassword: ""
    }
  }

  // Attribute mutations.
  mutations() {
    return {
      username:username=>username
      ,password:password=>password
      ,newpassword:newpassword=>newpassword
      ,confirmpassword:confirmpassword=>confirmpassword
    }
  }

  // Attribute validation
  validation() {
    return {
    }
  }

  // Model Options
  options() {
    return {
      validateOnSave     : false
      , validateOnChange   : false 
      , validateRecursively: false
    }
  }

  // Route configuration
  /*routes() {
    return {
      fetch: '/task/{id}'
    }
  }*/

}