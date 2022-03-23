import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// https://vue-toastification.maronato.dev/
import '../main.css'

const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    position: "bottom-right",
    draggable: true,
}

createApp(App).use(Toast,options).mount('#app')

