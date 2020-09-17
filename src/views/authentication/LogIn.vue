<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-form>
              <v-text-field prepend-icon="person" name="login" label="Iniciar sesión" type="text" v-model.trim="auth.username">
              </v-text-field>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Contraseña" type="password" v-model.trim="auth.password">
              </v-text-field>
            </v-form>
            <v-spacer></v-spacer>
            <v-btn @submit="logIn()" @click="logIn()">Login</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>

import Auth from "@/services/auth";
import transform from "@/helpers/transformations";
import {AuthenticationModel} from "@/models/authentication";
import {required, minLength} from "vuelidate/lib/validators";
import * as actions from "@/constants/mutation-names";

export default {
  name: 'LogIn',
  data() {
    return {
      auth:undefined
      , captcha:{
        value:false
      }
      , locale: this.$i18n.locale
      , view:{
        title:"Login"
        , action: {
          login:{
            busy:false
          }
        }
        , elem:{
          label: {
            loginError:{
              visible:false
              , text : ""
            }
          }
          , button: {
              login:{
                enable:true
              }
            }
          , captcha:{
            domElement:undefined
            , canvas:undefined
            , visible:false 
          }
        }
      }
      , validationStrategy: null
      , submitButtonValidationStrategy: null
    };
  }
  , methods:{
    setInitialState(){
      this.auth = new AuthenticationModel();
    }
    , async logIn() {
      try{
        /*
        this.hideErrorLogIn();
        if(!this.validateForm()){
          return;
        }
        */

        this.view.action.login.busy=true;
        const response = await Auth.logIn(this.auth);      
        console.log('LoginResponse-->',response)
        this.view.action.login.busy=false;
        let {data:{results:{token:userToken, users, roles}}} = response;
        const data = {...transform.ResponseToUserStore(users), userToken, roles};
        this.$store.dispatch(actions.AUTH_LOGIN,data);
        this.$userPermission.set({roles});
        this.$router.push("/");
      }catch(error){
        console.log("error--->",error);
      }
    }
  }, computed:{

  }, mounted(){
  }
  , updated(){
  }
  , validations:{
    auth:{
      username:{
        required
      }
      , password:{
        required
      }
    }
  }
  , components: {
  }
  , created(){
    this.setInitialState();
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>