import State from '@/helpers/pattern/state';
import {modelIsModified} from "@/helpers/vue-mc";
import {EmployeeModel} from "@/models/catalog/employee";
import EmployeeAPI from "@/services/catalog/employee";
import {EventBus} from '@/events/event-bus';
import * as events from '@/constants/event-names';
import {scrollToForm} from "@/helpers/form-scroll-to";

/**
 * State Pattern for Employee form
 */
export default class EmployeeStates extends  State{
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
        $data.employee = new EmployeeModel();
      }
      , resetValidators({$data}){
        $data.$v.$reset();
      }
      , isDisableButtonSubmit({$data}){
        return $data.hasErrors($data.$v.employee) || $data.view.action.submit.busy;
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
        , async submit({$data},{name, status}){
          try{
            if(!$data.isAllValid($data.$v)){
              EventBus.$emit(events.SHOW_TOASTER_MESSAGE,'error', 'VL0000','Please, Validate mandatory fields')
              EventBus.$emit(events.SCROLL_TOP);
              return false;
            }
            $data.view.action.submit.busy=true;
            const response = await EmployeeAPI.save({id:null, name, status});
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
        $constructor:function({$data}, employee){
          let {id, name, status} = employee;
          $data.view.elem.button.clear.visible=true;
          $data.view.elem.button.audit.visible=true;
          $data.view.elem.input.id.visible=true;
          $data.view.elem.input.id.disabled=true;
          $data.view.elem.button.submit.class.current = $data.view.elem.button.submit.class.update;
          $data.view.elem.button.submit.type = "update";
          $data.view.elem.button.submit.data.title.current = $data.view.elem.button.submit.data.title.update;
          /*
          try{
          } catch(error){
            console.log(error);
          }
          */
          $data.employee = new EmployeeModel({id, name, status});
          this.resetValidators();
          scrollToForm($data);
        }
        , async submit({$data, $setState}, employee){
          let {id, name, status} = employee;
          try{
            if(!$data.isAllValid($data.$v)){
              EventBus.$emit(events.SHOW_TOASTER_MESSAGE,'error', 'VL0000','Please, Validate mandatory fields')
              EventBus.$emit(events.SCROLL_TOP);
              return false;
            }
            $data.view.action.submit.busy=true;
            const response = await EmployeeAPI.update({id, name, status});
            $data.view.action.submit.busy=false;
            $setState('initial')
            return response;
          }catch(error){
            console.log(error)
            return error;
          }
        }
        , isDisableButtonSubmit({$data}){
          return $data.hasErrors($data.$v.employee) 
            || $data.view.action.submit.busy
            || !modelIsModified($data.employee)
        }
      }
    }
  }
}