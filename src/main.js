import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'

import { store } from './store'
import { router } from './helpers'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VeeValidate)
Vue.use(Vuetify)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});