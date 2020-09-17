import * as R from "ramda";
import i18n from "@/local";
import local from "@/local/languages/en_US";
const {validator} = local;

import * as _ from "lodash";

const attributeIsValid = R.curry((attribute,validation)=>
  !attribute[validation] && attribute.$dirty && attribute.$invalid
)

function getAllParamsNames(params){
  return Object.keys(params)
}


export function hasErrors({$dirty, $invalid}){
  return $dirty && $invalid;
}

export function getFirstErrorDescription(attribute, errorsList=undefined){
  
  const errorName = getFirstError(attribute);
  
  return getErrorDescription(
    errorName
    , attribute.$params[errorName]
    , errorsList)
  

  function getErrorDescription(errorName, parameters, customDescription, defaultErrorName="default"){
    if(errorName===defaultErrorName)
      return i18n.t(`validator.${defaultErrorName}.text`,"");
    
    if((customDescription || {})[errorName]){
      if(_.isFunction(customDescription[errorName])){
        return customDescription[errorName](parameters);
      }else{
        return customDescription[errorName];
      }
    }

    //Gettin error from locale
    const errorLocale = validator[errorName] || {};
    if(errorLocale.template){
      return i18n.t(`validator.${errorName}.template`,{...parameters});
    }else if(errorLocale.text){
      return i18n.t(`validator.${errorName}.text`,"");
    }else{
      return i18n.t(`validator.${defaultErrorName}.text`);
    }
  }
}

export function getFirstError(attribute){
  let {$params, $dirty, $invalid} = attribute;
  return getAllParamsNames($params)
  .filter(attributeIsValid(attribute))[0] || "default"
}

export function getAllErrors(attribute){
  let {$params, $dirty, $invalid} = attribute;
  return getAllParamsNames($params)
  .filter(attributeIsValid(attribute)) || []
}

export function isAllValid({$touch, $invalid}){
  $touch()
  return !$invalid
}

//Export all useful functions
export const allValidatorMethods = {
  hasErrors
  , getFirstErrorDescription
  , getFirstError
  , getAllErrors
  , isAllValid
}

/**
 * Export the mixin mode to add these methods to the vue component methods.
 */
export const allValidatorsMixin = {
  methods:{
    ...allValidatorMethods
  }
}