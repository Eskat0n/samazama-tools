import {RouteRecordRaw} from "vue-router";
import features from "./features";
import Home from "../components/Home.vue";

const routes: RouteRecordRaw[] = [
    {path: "/", component: Home},
    ...features.map(feature => ({
        path: feature.path,
        component: feature.component
    })),
];

export default routes;