<script setup lang='ts'>
import {ref} from 'vue';
import * as helpers from '../helpers';
import Dropdown from 'primevue/dropdown';
import Slider from 'primevue/slider';
import FileUpload, {FileUploadUploaderEvent} from 'primevue/fileupload';

const selectedFormat = ref("jpg");
const formats = [
  {name: 'JPG', code: 'jpg'},
  {name: 'PNG', code: 'png'},
  {name: 'WebP', code: 'webp'},
];

const quality = ref(85);

const imageConverter = async (event: FileUploadUploaderEvent) => {
  const [file] = event.files instanceof Array ? event.files : [event.files];

  const dataUrl = await helpers.readFileAsDataUrl(file);
  const image = await helpers.loadImageFromUrl(dataUrl);
  const canvas = await helpers.createCanvasFromImage(image);

  const resultDataUrl = canvas.toDataURL(`image/${selectedFormat.value}`, quality.value / 100.0);
  resultDataUrl
};
</script>

<template>
  <Dropdown v-model="selectedFormat" :options="formats" optionLabel="name" placeholder="Select format" />
  <Slider v-model="quality" :min="0" :max="100" />

  <FileUpload name="images[]" :customUpload="true" @uploader="imageConverter"/>
</template>

