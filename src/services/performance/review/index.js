import {HTTP} from "@/helpers/http-common"

const getAll = () =>new Promise((resolve,reject)=>{
  HTTP.get(
    '/api/v1/paypay/review'
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error);
  });
});

const save = (review) =>new Promise((resolve,reject)=>{
    const {id, description, assigners, status} = review;
    const operation = {review:{id, description, assigners, status} } 
  HTTP
  .post(
    '/api/v1/paypay/review'
    , operation
  ).then(response=>{
    console.log(response)
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
});

const update = (review) =>new Promise((resolve,reject)=>{
    const {id, description, assigners, status} = review;
    const operation = {review:{id, description, assigners, status} } 
  HTTP
  .put(
    '/api/v1/paypay/review'
    , operation
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
});

const get = (review) =>new Promise((resolve,reject)=>{
    const {id} = review;
  HTTP.get(
    `/api/v1/paypay/review/${id}`
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error);
  });
});

const disable = (review) =>new Promise((resolve,reject)=>{
  const {id} = review;
  HTTP.delete(
    `/api/v1/paypay/review/${id}`
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
});


//Export methods
export default {
  getAll
  , get
  , save
  , update
  , disable
}
