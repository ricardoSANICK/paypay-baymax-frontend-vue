import {Model} from 'vue-mc';

export class FeedbackModel extends Model{
  
  // Default attributes that define the "empty" state.
  defaults() {
    return {
        id: null,
        description: "",
        assigner: null,
        assigned: null,
        review: null,
        status: true
    }
  }

  // Attribute mutations.
  mutations() {
    return {
        id:id=>id,
        description:description=>description,
        assigner:assigner=>assigner,
        assigned:assigned=>assigned,
        review:review=>review,
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