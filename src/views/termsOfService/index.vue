<template>
  <div class="CommonProblem">
    <fx-header>
      <template #title>
        {{ $t('termsOfService') }}
      </template>
    </fx-header>
    <!-- <div class="lang">
      <iframe style="width: 100%;height:700px;" src="pdf/web/viewer.html?file=white_paper.pdf"></iframe>
    </div> -->
    <div class="CommonProblem-padding">
      <p class="textColor" v-html="content"></p>
    </div>
  </div>
</template>
<script setup>
import { _getCms } from "@/service/login.api";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
const { locale } = useI18n()

const content = ref('')



onMounted(() => {
  getCms();
})


const getCms = () => {
  _getCms({
    content_code: '020',
    language: locale.value,
  }).then((res) => {
    content.value = res ? res.content : ''
  })
}

</script>
<style lang="scss" >
.CommonProblem {
  width: 100%;
  box-sizing: border-box;
}

pre {
  white-space: pre-wrap;
}

.CommonProblem-padding {
  padding-left: 18px;
  padding-right: 18px;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: $text_color4;
}

.CommonProblem-title {
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  /* identical to box height */
  color: $text_color4;
  padding-left: 18px;
  padding-right: 18px;
  margin-top: 29px;
  margin-bottom: 11px;
}
</style>
