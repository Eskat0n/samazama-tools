import {Component} from "vue"
import ImageConverter from "../components/ImageConverter/ImageConverter.vue";
import Base64Converter from "../components/Base64Converter.vue";

export interface IFeature {
    path: string;
    name: string;
    altNames: string[];
    description: string;
    category?: string;
    component: Component;
}

const features: IFeature[] = [
    {
        path: "/image-converter",
        name: "Image Converter",
        altNames: [],
        description: "",
        category: "Images",
        component: ImageConverter
    },
    {
        path: "/base64-converter",
        name: "Base64 Converter",
        altNames: [],
        description: "",
        category: "Data",
        component: Base64Converter
    }
];

export default features;
