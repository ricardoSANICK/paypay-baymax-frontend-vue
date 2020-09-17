import State from '@/helpers/pattern/state';
import {modelIsModified} from "@/helpers/vue-mc";
import {ReviewModel} from "@/models/performance/review";
import ReviewAPI from "@/services/performance/review";
import {EventBus} from '@/events/event-bus';
import * as events from '@/constants/event-names';
import {scrollToForm} from "@/helpers/form-scroll-to";

/**
 * State Pattern for Review form
 */
export default class ReviewStates extends  State{
  /**
   * Class constructor, important pass the required data within the states methods
   * @param {*} data Any type of data that you want available within the states methods
   */
  constructor(data){
    super(data)
  }
  /**
   * General Methods
   */
  base(){
    return {
      clear({$setState}){
        $setState('initial');
      }
      , async askForClear(){
        this.clear();
      }
      , resetModel({$data}){
        $data.review = new ReviewModel();
      }
      , resetValidators({$data}){
        $data.$v.$reset();
      }
      , isDisableButtonSubmit({$data}){
        return $data.hasErrors($data.$v.review) || $data.view.action.submit.busy;
      }
    }
  }
  /**
   * States and its methods
   */
  states(){
    return {
      initial:{
        $constructor:function({$data}){
            //Reset Models and validators
            this.resetModel();
            this.resetValidators();
            //View configuration
            $data.view.elem.button.clear.visible=true;
            $data.view.elem.button.audit.visible=false;
            $data.view.elem.input.id.visible=false;
            $data.view.elem.input.id.disabled=true;
            $data.view.elem.button.submit.class.current = $data.view.elem.button.submit.class.save;
            $data.view.elem.button.submit.type = "add";
            $data.view.elem.button.submit.data.title.current = $data.view.elem.button.submit.data.title.save;
        }
        , async submit({$data},{description, assigners, status}){
          try{
            if(!$data.isAllValid($data.$v)){
              EventBus.$emit(events.SHOW_TOASTER_MESSAGE,'error', 'VL0000','Please, Validate mandatory fields')
              EventBus.$emit(events.SCROLL_TOP);
              return false;
            }
            let assignersByCommas = assigners.map(item=> item.id).toString();
            $data.view.action.submit.busy=true;
            const response = await ReviewAPI.save({id:null, description, assigners: assignersByCommas, status});
            $data.view.action.submit.busy=false;
            this.resetModel();
            this.resetValidators();
            return response;
          }catch(error){
            console.log(error)
            return error;
          }
        }
      }
      , editing:{
        $constructor:function({$data}, review){
          let {id, description, assigners, status} = review;
          let arrAssigners = [];
          $data.view.elem.button.clear.visible=true;
          $data.view.elem.button.audit.visible=true;
          $data.view.elem.input.id.visible=true;
          $data.view.elem.input.id.disabled=true;
          $data.view.elem.button.submit.class.current = $data.view.elem.button.submit.class.update;
          $data.view.elem.button.submit.type = "update";
          $data.view.elem.button.submit.data.title.current = $data.view.elem.button.submit.data.title.update;

          try{
            if(assigners){
              $data.view.elem.select.assigners.completeList.map(itemCombo=>{
                assigners.split(",").map(item=>{
                  if(item == itemCombo.id){
                    arrAssigners.push(itemCombo);
                  }
                });
              });
              assigners = arrAssigners;
            }
          } catch(error){
            console.log(error);
          }

          $data.review = new ReviewModel({id, description, assigners, status});
          this.resetValidators();
          scrollToForm($data);
        }
        , async submit({$data, $setState}, review){
          let {id, description, assigners, status} = review;
          try{
            if(!$data.isAllValid($data.$v)){
              EventBus.$emit(events.SHOW_TOASTER_MESSAGE,'error', 'VL0000','Please, Validate mandatory fields')
              EventBus.$emit(events.SCROLL_TOP);
              return false;
            }
            $data.view.action.submit.busy=true;
            let assignersByCommas = assigners.map(item=> item.id).toString();
            const response = await ReviewAPI.update({id, description, assigners: assignersByCommas, status});
            $data.view.action.submit.busy=false;
            $setState('initial')
            return response;
          }catch(error){
            console.log(error)
            return error;
          }
        }
        , isDisableButtonSubmit({$data}){
          return $data.hasErrors($data.$v.review) 
            || $data.view.action.submit.busy
            || !modelIsModified($data.review)
        }
      }
    }
  }
}