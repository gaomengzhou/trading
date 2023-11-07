<template>
  <div id="cryptos">
    <div class="w-full">
      <trade-success>
        <template #price>
          <div class="w-full text-center">
            <div class="info-title">
              <span>{{ detail.symbol == 'usdt' ? Math.floor(detail.amountUsdt * 100) / 100 :
                Math.floor(detail.coinAmount * 10000) / 10000 }}</span>
              <span class="ml-15 font-36">{{ detail.symbol && detail.symbol.toUpperCase() }}</span>
            </div>
            <div class="mt-14 font-400 font-28 text-grey">{{ $t('已存入您的资金账户') }}</div>
          </div>
        </template>
        <template #desc>
          <span>{{ $t('请您对买家进行评价') }}</span>
        </template>
      </trade-success>
    </div>
  </div>
</template>

<script>
import TradeSuccess from "@/views/cryptos/c2c-trade/components/TradeSuccess.vue";
import otcApi from "@/service/otc.api";

export default {
  name: "TradeSuccessBuyer",
  components: {
    TradeSuccess,
  },
  data() {
    return {
      detail: {}
    }
  },
  created() {
    const order_no = this.$store.state.c2c.order_no
    otcApi.ctcOrderGetDetail({ order_no, language: this.$i18n.locale }).then(res => {
      this.detail = res
    })
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;

  .info-title {
    color: $text_color;
  }
}
</style>