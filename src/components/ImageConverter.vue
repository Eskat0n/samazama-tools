<script setup lang='ts'>
import {ref} from 'vue';
import * as helpers from '../helpers';
import Dropdown from 'primevue/dropdown';
import Slider from 'primevue/slider';
import FileUpload, {FileUploadUploaderEvent} from 'primevue/fileupload';

const formats = [
  {name: 'JPG', code: 'jpeg'},
  {name: 'PNG', code: 'png'},
  {name: 'WebP', code: 'webp'},
];

const selectedFormat = ref(formats[0]);
const quality = ref(85);

const imageConverter = async (event: FileUploadUploaderEvent) => {
  const [file] = event.files instanceof Array ? event.files : [event.files];

  const dataUrl = await helpers.readFileAsDataUrl(file);
  const image = await helpers.loadImageFromUrl(dataUrl);
  const canvas = await helpers.createCanvasFromImage(image);

  const resultDataUrl = canvas.toDataURL(`image/${selectedFormat.value.code}`, quality.value / 100.0);
  const fileName = helpers.changeExtension(file.name, selectedFormat.value.code);

  helpers.downloadDataUrl(resultDataUrl, fileName);
};
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div class="flex align-items-center justify-content-center"></div>
    <div class="flex align-items-center"></div>
  </div>
  <div class="card py-6">
    <div class="card-container">
      <div class="inline-block">
        <Dropdown v-model="selectedFormat" :options="formats" optionLabel="name" placeholder="Select format" />
      </div>
      <div class="inline-block">
        <Slider v-model="quality" :min="0" :max="100" />
      </div>
    </div>
  </div>

  <FileUpload name="images[]" :customUpload="true" @uploader="imageConverter"/>
</template>

