<template>
  <!--  <div class="flex flex-row flex-wrap">-->
  <!--    <div class="flex align-items-center">-->
  <!--      <Dropdown v-model="selectedFormat" :options="formats" optionLabel="name" placeholder="Select format"/>-->
  <!--    </div>-->
  <!--    <div class="flex align-items-center">-->
  <!--      <Slider v-model="quality" :min="0" :max="100"/>-->
  <!--    </div>-->
  <!--  </div>-->

  <a-upload
      v-model:file-list="fileList"
      action="#"
      list-type="picture"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Select file(s)
    </a-button>
  </a-upload>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import type {UploadProps} from "ant-design-vue";
import type {UploadRequestOption} from "ant-design-vue/es/vc-upload/interface";
import {UploadOutlined} from "@ant-design/icons-vue";
import * as helpers from "../../helpers";

const formats = [
  {name: "JPG", code: "jpeg"},
  {name: "PNG", code: "png"},
  {name: "WebP", code: "webp"},
];

const imageConverter = async (event: any) => {
  const [file] = event.files instanceof Array ? event.files : [event.files];

  const dataUrl = await helpers.readFileAsDataUrl(file);
  const image = await helpers.loadImageFromUrl(dataUrl);
  const canvas = await helpers.createCanvasFromImage(image);

  const resultDataUrl = canvas.toDataURL(`image/${selectedFormat.value.code}`, quality.value / 100.0);
  const fileName = helpers.changeExtension(file.name, selectedFormat.value.code);

  helpers.downloadDataUrl(resultDataUrl, fileName);
};

export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    const selectedFormat = ref(formats[0]);
    const quality = ref(85);
    const fileList = ref<UploadProps['fileList']>([]);

    return {
      selectedFormat,
      quality,
      fileList,
    };
  }
});
</script>
