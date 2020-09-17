<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.action">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" :to="item.action" >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dense :clipped-left="$vuetify.breakpoint.lgAndUp" app :color="colorMenu" dark :extension-height="extensionHeight">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 202px" class="ml-0 pl-4">
        <router-link :to="{name:'Feed'}">
          <h2 style="color:LightGray">PayPay</h2>
        </router-link>
      </v-toolbar-title>
      <v-btn text @click="logOut()" >LogOut</v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content id="container">
      <router-view :key="$route.path"></router-view>
    </v-content>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-actions class="grey darken-3 justify-center">
          {{ new Date().getFullYear() }} —  <strong> &copy; Paypay - Baymax</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Auth from '@/services/auth';
import * as actions from '@/constants/mutation-names';
export default {
  name: 'Home',
  data() {
    return {
      colorMenu: "indigo darken-1",
      drawer: false,
      extensionHeight: 48,
      extendedSlot: false,
      items: [
        { icon: 'supervisor_account', text: 'Employee', action:{name:'Employee'} }
        , { icon: 'preview', text: 'Review', action:{name:'Review'} }
        , { icon: 'feedback', text: 'Feedback', action:{name:'Feedback'} }
      ],
    }
  }, methods:{
    router(route) {
      this.$router.push({name:route})
    }
    , async logOut() {
      try {
        this.$store.dispatch(actions.STOP_ID_SESSION_TIME_INTERVAL);
        const respuesta = await Auth.logOut();
        this.$store.dispatch(actions.AUTH_LOGOUT);
        if(this.$route.path === '/'){
          this.$router.go();
        }else{
          this.$router.push({name:'Feed'});
        }
      } catch (error) {
       throw error;
      }
    }
  }, computed:{

  }, mounted(){
  }
  , updated(){
  }
  , components: {
  }
  , created(){
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
#styled-input {
  height: 90px;
  padding: 1px;
}
.styled-input label[for] {
  height: 90 px;
  padding: 1px;
}
</style>