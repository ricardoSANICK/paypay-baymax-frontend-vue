import {HTTP} from "@/helpers/http-common"

const getAll = () =>new Promise((resolve,reject)=>{
  HTTP.get(
    '/api/v1/paypay/feedback'
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error);
  });
});

const save = (feedback) =>new Promise((resolve,reject)=>{
    const {id, description, assigner, assigned, review, status} = feedback;
    const operation = {
      feedback :{
        id, 
        description, 
        assigner, 
        assigned, 
        review, 
        status
      } 
    } 
  HTTP
  .post(
    '/api/v1/paypay/feedback'
    , operation
  ).then(response=>{
    console.log(response)
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
});

const update = (feedback) =>new Promise((resolve,reject)=>{
    const {id, description, assigner, assigned, review, status} = feedback;
    const operation = {
      feedback:{
        id, 
        description, 
        assigner, 
        assigned, 
        review, 
        status
      } 
    } 
  HTTP
  .put(
    '/api/v1/paypay/feedback'
    , operation
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
});

const get = (feedback) =>new Promise((resolve,reject)=>{
    const {id} = feedback;
  HTTP.get(
    `/api/v1/paypay/feedback/${id}`
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error);
  });
});


//Export methods
export default {
  getAll
  , get
  , save
  , update
}
