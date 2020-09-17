import * as R from "ramda";

const evaluateModelChangedFlag=(data)=>{
  if(!data && typeof data === "boolean") return data
  if(data && typeof data === "object") return data.length>=1;
}

const modelIsModified = R.curry((mod)=>R.compose(evaluateModelChangedFlag,mod.changed)());

export {
  modelIsModified
}