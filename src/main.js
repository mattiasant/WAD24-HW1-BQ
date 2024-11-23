import { createApp } from 'vue';
import App from './App.vue';
import Router from './Router.js';
import Store from './Store.js';
import './assets/styles.css'; 

createApp(App).use(Router).use(Store).mount('#app');

