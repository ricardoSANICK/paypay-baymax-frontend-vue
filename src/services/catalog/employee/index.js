import {HTTP} from "@/helpers/http-common"

const getAll = () =>new Promise((resolve,reject)=>{
  HTTP.get(
    '/api/v1/paypay/employee'
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error);
  });
});

const save = (employee) =>new Promise((resolve,reject)=>{
    const {id, name, status} = employee;
    const operation = {employee:{id, name, status} } 
  HTTP
  .post(
    '/api/v1/paypay/employee'
    , operation
  ).then(response=>{
    console.log(response)
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
});

const update = (employee) =>new Promise((resolve,reject)=>{
    const {id, name, status} = employee;
    const operation = {employee:{id, name, status} } 
  HTTP
  .put(
    '/api/v1/paypay/employee'
    , operation
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
});

const get = (employee) =>new Promise((resolve,reject)=>{
    const {id} = employee;
  HTTP.get(
    `/api/v1/paypay/employee/${id}`
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
