<template>
  <!-- 历史持仓 -->
  <div id="cryptos">
    <template v-if="listData.length > 0">
      <div class="border-b-color" v-for="item in listData" :key="item.order_no">
        <div class="flex justify-between pt-3 pb-28 font-28">
          <div class="flex items-center">
            <div class="pl-3 pr-5 pt-10 pb-10 text-white rounded-md"
              :class="item.direction == 'buy' ? ' bg-green' : 'bg-red'">
              {{ item.direction == 'buy' ? $t('开多') : $t('开空') }}
            </div>
            <div class="ml-22 font-30 font-700 textColor">{{ item.name }} {{ $t('永续') }}</div>
          </div>

        </div>
        <div class="flex justify-between pb-28 font-28">
          <div class="text-grey">{{ $t('订单号') }}</div>
          <div class="textColor">{{ item.order_no }}</div>
        </div>
        <div class="flex justify-between pb-28 font-28">
          <div class="text-grey">{{ $t('价格') }}</div>
          <div class="textColor">{{ item.trade_avg_price }}</div>
        </div>
        <div class="flex justify-between pb-28 font-28">
          <div class="text-grey">{{ $t('成交数量') }}</div>
          <div class="textColor">{{ item.volume_open }}</div>
        </div>
        <div class="flex justify-between pb-28 font-28">
          <div class="text-grey">{{ $t('手续费') }}</div>
          <div class="textColor">{{ item.fee }}</div>
        </div>
        <div class="flex justify-between pb-28 font-28">
          <div class="text-grey">{{ $t('实现盈亏') }}</div>
          <div :class="{
            'text-green': item.profit / 1 > 0,
            'text-red': item.profit / 1 < 0,
          }">{{ item.profit / 1 > 0 ? '+' + item.profit : item.profit }}</div>
        </div>
        <div class="flex justify-between pb-28 items-center font-28">
          <div class="text-grey">{{ $t('操作') }}</div>
          <button class="border-none pl-34   text-blue bg-none colorMain" @click="goDetail(item)">{{ $t('详情') }}</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "perpetualHistoryPosition",
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      historyData: [
        { name: "BTC/USDT", direction: "buy", amount: "200", price: "23000", create_time: "2022-07-20 10:05:15" },
      ]
    }
  },
  methods: {
    goDetail(item) {
      this.$router.push({ path: "/cryptos/orderDetail", query: { order_no: item.order_no } });
    }
  }

}
</script>
<style lang="scss">
@import "@/assets/init.scss";
// .pb-28 {
//   padding-bottom: 10px;
// }
</style>