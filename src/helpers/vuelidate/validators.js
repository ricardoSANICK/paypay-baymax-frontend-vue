import {req, ref, withParams, regex} from "vuelidate/lib/validators/common";
import {email, maxLength} from "vuelidate/lib/validators"
import {isNotEmpty, isEmpty} from "@/helpers/validators";
import * as cuilcuit from '@/helpers/cuil-cuit';
import moment from 'moment';

/**
 * Custom validator to know if a given string separated with a delimiter is a valid Email List
 * Closure
 * @param {*} delimiter The character delimiter for the given list
 * @returns {function} Returns a function which receives a string to evaluate if it's a email list
 */
const emailList = (delimiter=';')=>{
  return function(param){
    if(param.trim().length<=0)
      return true;
  
    return param
      .split(`${delimiter}`)
      .map(value=>value.trim())
      .filter(value=>value.length>0)
      .every(email)
  }
};

/**
 * Custom validators to know if a value is boolean type
 * Closure
 * @param {*} expect The data to evaluate if it's a boolean value
 * @returns {boolean} Returns a boolean value to know if the given parameter is a boolean
 */
const isBooleanValue=(expect=true)=>(param)=>param==expect;

/**
 * Custom validators to know if a value is a number and its value is 0
 * Closure
 * @returns {function} Returns a function which receives a value and it evaluates if its value is not 0
 */
const isZeroValue=()=>(param)=>param!=0;

/**
 * Custom validators to know if a value is not a Post Code with only zeros
 * Closure
 * @returns {function} Returns a function which receives a value and it evaluates if its value is 0
 */
const isCPNotZeroValue=()=>(param)=>param!=0;

/**
 * Custom validator to know if a value has two decimal precision
 * Closure
 * @returns {function} Returns a function that evaluates if a given value has two decimal precision
 */
const isDecimalTwoPrecision=()=>{ 
  return function(value){ 
     return /^[0-9]*\.[0-9]{2}$/gm.test(value) || /^[0-9]*\.[0-9]{1}$/gm.test(value) || /^[0-9]$/gm.test(value);
  }
}

/**
 * Description: Evalutes a Number and format the value into a coordinate
 * @param {*} formatCoordinatesValue 
 * @returns {Number} Returns a boolean value resulting from the dates evaluated
 */
const formatCoordinates = (formatCoordinatesValue)=>withParams(
  {  type: 'formatCoordinates' , formatCoordinatesValue }
  , function(value, parentVm) {
    //if (!/[^a-zA-Z]/.test(value)){}
    let regExp = new RegExp('[^0-9'+ "" +'-]+', 'g');
    let numberFormat = value.toString().replace(regExp, '.');
    return Number(numberFormat);
  }
)

/**
 * Evaluates a date against a given date, it shouldn't be less than the given date
 * Closure
 * @param {*} minDateAttribute 
 * @returns {boolean} Returns a boolean value resulting from the dates evaluated
 */
const minDateFrom = (minDateAttribute) =>withParams(
  { 
    type: 'minDateFrom'
    , minDateAttribute 
  }
  , function(value, parentVm) {
    
    if(isEmpty(value) || isEmpty(ref(minDateAttribute, this, parentVm)))
      return true;
    
    const dateValue= moment(value);

    const minDateValue = moment(ref(minDateAttribute, this, parentVm));

    return dateValue.diff(minDateValue,'days')>=0;
  }
)

/**
 * Evaluates a date against a given date, it shouldn't be greater than the given date
 * Closure
 * @param {*} maxDateAttribute 
 * @returns {boolean} Returns a boolean value resulting from the dates evaluated
 */
const maxDateFrom = (maxDateAttribute) =>withParams(
  { 
    type: 'maxDateFrom'
    , maxDateAttribute 
  }
  , function(value, parentVm) {

    if(isEmpty(value) || isEmpty(ref(maxDateAttribute, this, parentVm)))
      return true;
    
    const dateValue= moment(value);

    const minDateValue = moment(ref(maxDateAttribute, this, parentVm));

    return dateValue.diff(minDateValue,'days')<=0;
  }
)

/**
 * Custom Validator includes all Alphabet, numbers and dot.
 * Regex
 */
const alphaNumDot = regex('alpha', /^[a-zA-Z0-9.]+$/);

/**
 * Custom Validator to avoid special characteres, includes all Alphabet, numbers and dot.
 * Regex
 */
const alphaNumDotSpaces = regex('alpha-spaces', /^[a-zA-Z0-9.(\s*)ñÑ]+$/);

/**
 * It validates a date in ISOFormat or dd-MM-YYYY Format.
 * @param {date || string} Receives a date value in ISO or dd-MM-YYYY Format
 * @returns {boolean} Returns a boolean value, true if it's a valid date, the opposite for invalid dates
 */
const validDate = ()=>(date, isoFormat=false)=>{

  if(!date)
  return false;
  
  let dateDivided = date.split('-').map(value=>value.trim())
  if(dateDivided.length!=3)
    return false

  let year, month, day;
  if(isoFormat)
    [year, month, day] = dateDivided
    
  if(!isoFormat)
    [day, month, year] = dateDivided

  let momentDate = moment(`${year}-${month}-${day}`)
  
  if(!momentDate.isValid())
    return false
  
  if(!momentDate.isBetween(`${moment().year()-100}-01-01`, `${moment().year()+100}-12-31`))
    return false;

  return true;
  
}
/**
 * Exports all the declared functions in this file
 */
export {
  emailList
  , isBooleanValue
  , minDateFrom
  , maxDateFrom
  , alphaNumDot
  , alphaNumDotSpaces
  , isCPNotZeroValue
  , isZeroValue
  , isDecimalTwoPrecision
  , validDate
  , formatCoordinates
}