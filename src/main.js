import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import { ValidationProvider,ValidationObserver} from 'vee-validate';
import '@/assets/VeeValidateExtend'
// import VConsole from 'vconsole'           
import { Checkbox,Menu,MenuItem,Icon,Table,TableColumn,DatePicker,Popover,Pagination,Alert,Radio,Message} from 'element-ui';

Vue.use(VueAxios, axios)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.component('El-CheckBox', Checkbox);
Vue.component('El-Menu', Menu);
Vue.component('El-MenuItem', MenuItem);
Vue.component('El-Icon', Icon);
Vue.component('El-Table', Table);
Vue.component('El-TableColumn', TableColumn);
Vue.component('El-DatePicker', DatePicker);
Vue.component('El-Popover', Popover);
Vue.component('El-Pagination', Pagination);
Vue.component('El-Alert',Alert);
Vue.component('El-Radio',Radio);

Message.install = function (Vue) {
  Vue.prototype.$message = Message
}
Vue.use(Message)

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'dev') {
  // new VConsole()
}
if(process.env.NODE_ENV === 'prod'){
    Vue.config.debug = false;
    Vue.config.devtools = false;
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
