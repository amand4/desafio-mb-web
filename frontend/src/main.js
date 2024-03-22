import './assets/main.css'
import Notifications from '@kyvg/vue3-notification'
import { VueMaskDirective } from 'v-mask';

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
};

import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App).directive('mask', vMaskV3)
app.use(Notifications)
app.use(vMaskV3)

app.mount('#app')
