import {createApp} from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./routes/router";
import "ant-design-vue/dist/antd.css";

createApp(App)
    .use(Antd)
    .use(router)
    .mount("#app")
