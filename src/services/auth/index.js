import {HTTP} from "@/helpers/http-common";

const logOut = () =>new Promise((resolve,reject)=>{
  HTTP.get(
    '/api/v1/paypay/logout'
  ).then(response=>{
    if(HTTP.defaults.headers.common['Authorization']);
      delete HTTP.defaults.headers.common['Authorization'];
    resolve(response);
  }).catch(error=>{
    reject(error);
  });
})
  
const logIn = (data)=>new Promise((resolve,reject)=>{
  //Request params
  const {username, password} = data;
  HTTP
  .post(
    '/api/v1/paypay/login'
    , { username , password }
  ).then(response=>{
    /* Set axios header authorization config */
    const {data:{results:{token:userToken}}} = response;
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
});

const changePassword = (data)=>new Promise((resolve,reject)=>{
  //Request params
  const {username, password, newpassword, confirmpassword} = data;
  HTTP
  .post(
    '/api/changePassword'
    , { username, password, newpassword, confirmpassword }
  ).then(response=>{
    /* Set axios header authorization config */
    const {data:{results:{token:userToken}}} = response;
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
})

const requestResetPassword = (data)=>new Promise((resolve,reject)=>{
  //Request params
  const {username} = data;
  HTTP
  .post(
    '/api/requestResetPassword'
    , { username}
  ).then(response=>{
    resolve(response);
  }).catch(error=>{
    reject(error.response);
  });
})

const resetPassword = (data)=>new Promise((resolve,reject)=>{
  if(HTTP.defaults.headers.common['Authorization']);
    delete HTTP.defaults.headers.common['Authorization'];
  //Request params
  const {newpassword, confirmpassword, token} = data;
  HTTP.defaults.headers.common['Authorization'] = `RstpaypayPwd ${token}`;
  
  HTTP
  .post(
    '/api/resetPassword'
    , { newpassword, confirmpassword}
  ).then(response=>{
    if(HTTP.defaults.headers.common['Authorization']);
      delete HTTP.defaults.headers.common['Authorization'];

    /* Set axios header authorization config */
    const {data:{results:{token:userToken}}} = response;
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

    resolve(response);
  }).catch(error=>{
    if(HTTP.defaults.headers.common['Authorization']);
      delete HTTP.defaults.headers.common['Authorization'];
    reject(error.response);
  })
})

//Export methods
export default {
  logIn
  , logOut
  , changePassword
  , requestResetPassword
  , resetPassword
}


