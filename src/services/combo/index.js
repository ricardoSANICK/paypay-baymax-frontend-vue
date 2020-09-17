import {HTTP} from "@/helpers/http-common";

const get = (combo) =>new Promise((resolve,reject)=>{
  const {option} = combo;
  HTTP.get(
    `/api/v1/paypay/combo/${option}`
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error);
  });
});

//Export methods
export default {
  get
}


