<template>
  <div id="cryptos">
    <div class="w-full h-full c2cPay-page">
      <order-nav :back="false" @back="hide" />
      <div class="text-center">
        <div class="font-48 ">{{ $t('付款遇到问题？') }}</div>
        <!-- <div class="flex justify-center items-center mt-18 font-28">
        <span class="mr-6">{{ $t('付款剩余时间')}}</span>
        <van-count-down class="flex font-700" :time="time">
          <template #default="timeData">
            <span class="font-26 block" v-if="timeData.hours">{{ timeData.hours }}</span>
            <span class="font-26 colon" v-if="timeData.hours">:</span>
            <span class="font-26 block">{{ timeData.minutes }}</span>
            <span class="font-26 colon">:</span>
            <span class="font-26 block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div> -->
      </div>
      <div class="px-32 font-32 mt-18">
        <div class="mt-100">
          <p class="text-grey">Q：{{ $t('不知道如何付款？') }}</p>
          <p class="mt-28">A：{{ $t('为保障交易安全，部分卖家可能先需要您提供额外资料来证明您的身份，资金来源等真是可信。请与卖家聊天沟通获取交易方式。') }}</p>
        </div>
        <div class="mt-80">
          <p class="text-grey">Q：{{ $t('向卖家提供的收款方式付款，但支付失败了') }}</p>
          <p class="mt-28">A：{{ $t('请联系卖家确认卖家是否支持其他交易方式。') }}</p>
        </div>
        <div class="mt-80">
          <p class="text-grey">Q：{{ $t('我不想交易了？') }}</p>
          <p class="mt-28">A：{{ $t('您可以点击取消订单按钮取消该笔订单。') }}</p>
        </div>
      </div>
      <div class="mt-492 px-30">
        <van-button class="w-full h-96  mr-16 font-32 rounded-2xl text-white bg-blue border-none" type="primary"
          @click="$router.push('/cryptos/chat')">{{ $t('联系卖家') }}
        </van-button>
        <van-button class="w-full h-96  mt-42 font-32 rounded-2xl bg-grey text-black border-none" type="primary"
          @click="$router.push({ path: '/cryptos/cancelOrder' })">{{ $t('取消订单') }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, CountDown } from "vant"
import OrderNav from "@/components/Transform/order-nav/OrderNav.vue";

export default {
  name: "Question",
  props: ["time"],
  methods: {
    hide() {
      console.log(123)
      this.$emit('back')
    }
  },
  components: {
    [CountDown.name]: CountDown,
    [Button.name]: Button,
    OrderNav,
  }
}
</script>

<style scoped lang="scss" >
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;

  .c2cPay-page {
    color: #fff;
  }
}
</style>