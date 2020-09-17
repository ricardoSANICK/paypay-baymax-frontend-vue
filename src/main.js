import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import Vuelidate from 'vuelidate';
import head from 'vue-head';
import i18n from "@/local";
import vuetify from './plugins/vuetify';
import store from '@/store';
import VueUserPermissions from '@/plugins/vue-user-permissions';
import { validateCheckListAfterRefresh } from "@/helpers/app-refresh-check-list";
import { EventBus } from '@/events/event-bus';
import { HTTP } from "@/helpers/http-common";
import * as events from '@/constants/event-names';


Vue.config.productionTip = false

// Add plugins
Vue.use(head);
Vue.use(Vuelidate);
Vue.use(VueUserPermissions, { router, store, strict: true, defaultRoute: 'Feed' });

new Vue({
  beforeCreate() {
    validateCheckListAfterRefresh(this.$store, HTTP, this.$userPermission);
  }
  , router
  , vuetify
  , i18n
  , store
  , onIdle() {
    if (this.$store.getters.getUserIsAuthenticated) {
      const { username } = this.$store.getters.getUserData;
      EventBus.$emit(events.SESSION_TIME_FINISHED, { username });
    }
  }
  , components: {App}
  , render: h => h(App),
}).$mount('#app')
