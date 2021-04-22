import Vue from "vue";

import App from "./vue/App.vue";
import Vuex from "vuex";
Vue.use(Vuex);
import storeData from "./vue/store/index";

import "bootstrap";
import VueFlashMessage from "vue-flash-message";
Vue.use(VueFlashMessage);

const store = new Vuex.Store(storeData);
const app = new Vue({
    el: "#app",
    store,
    components: { App }
}).$mount("#app");
