import {Model} from 'vue-mc';

export class EmployeeModel extends Model{
  
  // Default attributes that define the "empty" state.
  defaults() {
    return {
        id: null,
        name: "",
        status: true
    }
  }

  // Attribute mutations.
  mutations() {
    return {
        id:id=>id,
        name:name=>name,
        status:status=>status
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
}