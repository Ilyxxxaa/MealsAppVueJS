import { createApp } from "vue";
// import App from "./App.vue";
import HelloWorld from "./components/Hello.vue";
import "./assets/tailwind.css";

createApp(HelloWorld).mount("#app");

const app = createApp(HelloWorld);
const vm = app.mount("#app");

console.log(vm.$data);
