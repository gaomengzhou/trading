<template>
  <div id="cryptos">
    <div class="w-full h-full">
      <order-nav :back="false" @back="hide">
        <template #title>
          {{ $t('申述提交') }}
        </template>
      </order-nav>

      <div class="mt-70">
        <div class="text-center">
          <img class="w-122 h-122 group100-img" src="~@/assets/image/c2c/Group100.png" alt="">
          <div class="mt-35 font-700 font-56 textColor">{{ $t('提交成功') }}</div>
          <div class="mt-10 font-28 text-grey">
            <p class="mb-15">{{ $t('您的资料已成功上传!') }}</p>
            <p>{{ $t('系统将在三个工作日内审核完毕，请您耐心等候。') }}</p>
          </div>
        </div>
      </div>
      <div class="px-33 mt-92">
        <van-button color="#1D91FF" class="w-full h-100 rounded-xl" type="info" @click="tokefu">{{ $t('联系客服') }}
        </van-button>
        <div @click="hide" class="mt-34 font-36 text-center" style="color: #1D91FF">{{ $t('返回') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import OrderNav from "@/components/Transform/order-nav/OrderNav.vue";
export default {
  name: "AppealWaiting",
  components: {
    [Button.name]: Button,
    OrderNav,
  },
  methods: {
    tokefu() {
      this.$router.push('/customerService')
    },
    hide() {
      this.$emit("back");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;
  .group100-img{
    margin: 0 auto;
  }
}
</style>
