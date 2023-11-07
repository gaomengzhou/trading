<template>
  <div class="w-full h-full box-border">
    <!--  <e-n :data="data" v-if="type === 'EN'"/>-->
    <c-n :id="id" :configType="configType" />
  </div>
</template>

<script>
import otcApi from "@/service/otc.api";

import CN from "@/views/cryptos/placeAnOrder/components/bankCardDetail/CN.vue";
import EN from "@/views/cryptos/placeAnOrder/components/bankCardDetail/EN.vue";
export default {
  name: "index",
  data() {
    return {
      paymentMethodConfig: '',
      configType: '',
      type: '',
      id: ''
    }
  },
  created() {
    // const res = await otcApi.ctcPaymentMethodConfig({ language: this.$i18n.locale });
    // this.paymentMethodConfig = res.data;
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
    if (this.$route.query.configType) {
      this.configType = this.$route.query.configType
    }
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
  },
  components: {
    CN,
    EN,
  }
}
</script>

<style scoped></style>