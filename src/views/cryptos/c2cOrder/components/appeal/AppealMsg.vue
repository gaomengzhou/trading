<template>
  <div id="cryptos">
    <div class="w-600 p-50 box-border rounded-2xl c2cColor">
      <div v-if="show">
        <h2 class="font-35 font-400">{{ $t('温馨提示') }}</h2>
        <div class="mt-38 mb-44 font-26">
          <div>
            <p class="lh-40">{{ $t('解决方案1：') }}</p>
            <p class="lh-40">{{ $t('如果您付款但订单被取消，您的资产将无 法自动退回。请与卖家沟通并要求卖家退款。') }}</p>
          </div>
          <div class="mt-39">
            <p class="lh-40">{{ $t('解决方案2：') }}</p>
            <p class="lh-40">{{ $t('单击下面的按钮，从卖家的个人详情页再下一笔') }}<span style="color: #E35461">{{ $t('相同金额') }}</span>{{
              $t('的订单。然后点击“我已付款，通知卖家”，通过聊天向卖家说明情况。如果卖家没有任何在线广告，请点击【申诉】按钮。') }}
            </p>
          </div>
        </div>
        <van-button color="#1D91FF" class="w-full h-80
        rounded-xl" type="info" @click="$router.push({ path: '/cryptos/wantBuy/c2cBuy' })">{{ $t('再下一单')
        }}</van-button>
        <div class="mt-22 font-30 text-center c2cColor" @click="show = false">{{ $t('申诉') }}</div>
      </div>
      <div v-else>
        <h2 class="font-35 font-400">{{ $t('温馨提示') }}</h2>
        <div class="mt-38 mb-44 font-26">
          <p>· {{ $t('如有疑问，请先联系对方处理。') }}</p>
          <p class="my-40">· {{ $t('客服介入后会协助您处理纠纷，但不保证追回资金。') }}</p>
          <p>· {{ $t('恶意申诉属于扰乱平台正常运营秩序的行为，情节严重将冻结账户。') }}</p>
        </div>
        <van-button color="#1D91FF" class="w-full h-80
        rounded-xl" type="info" @click="$router.push({ path: '/cryptos/appeal/page' })">{{ $t('我知道了') }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Button,
} from "vant";

export default {
  name: "Appeal",
  data() {
    return {
      show: true,
    }
  },
  components: {
    [Button.name]: Button,
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;

  .van-popup {
    border-radius: 10px;
  }

  .van-cell {
    background: $main_background;
  }

  .van-button--info {
    background: $btn_main;
    border-color: $btn_main;
    color: $main-btn-color;
  }
}
</style>