// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import 'bootstrap/dist/css/bootstrap.css'
import '~/assets/CSS/stylesheet.css'
import '../node_modules/vue-on-toast/dist/vue-on-toast.css'


import VueOnToast from 'vue-on-toast';
import Cryptoicon from 'vue-cryptoicon';
import icon from 'vue-cryptoicon/src/icons';
import VTooltip from 'v-tooltip'
Cryptoicon.add(icon);
 


export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout)
  Vue.use(VueOnToast)
  Vue.use(Cryptoicon) // <cryptoicon symbol="btc" size="24" />  
  Vue.use(VTooltip)   // v-tooltip="'You have ' + count + ' new messages.'"
}

