<template>
  <div id="cryptos">
    <div id="financialOrder" class="financialOrder">
      <assets-head :title="$t('确认订单')"></assets-head>
      <div class="box-border  ">
        <div class="w-full h-1 bgDark"></div>
        <div class="mt-48 font-36 font-600 px-33 mb-22 textColor">{{ $i18n.locale === 'CN' || $i18n.locale === 'zh-CN' ?
          data.miner_name_cn : data.miner_name_en
        }}</div>
        <div class=" px-33">
          <div class="flex justify-between flex-row items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('矿机金额') }}</div>
            <div class="font-31 font-400 textColor">{{ data.amount }} {{ data.buyCurrenc ?
              data.buyCurrenc.toUpperCase() : '' }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('30天预期收益') }}</div>
            <div class="font-31 font-400 textColor">{{ data.profit_may }} {{ data.outputCurrency ?
              data.outputCurrency.toUpperCase() : '' }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('周期') }}</div>
            <div class="font-31 font-400 textColor">{{ data.cycle == 0 ? $t('无限期') : data.cycle + $t('天') }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('日收益') }}</div>
            <div class="font-31 font-400 textColor">{{ data.daily_rate }}%</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('起息日') }}</div>
            <div class="font-31 font-400 textColor">{{ data.earn_time }}</div>
          </div>
          <!-- <div class="flex justify-between items-center h-72">
          <div class="font-31 font-400 text-grey">{{$t('计息结束日')}}</div>
          <div class="font-31 font-400 textColor">{{'--'}}</div>
        </div> -->
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('订单编号') }}</div>
            <div class="font-31 font-400 textColor">{{ data.order_no }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('订单时间') }}</div>
            <div class="font-31 font-400 textColor">{{ data.create_time }}</div>
          </div>
        </div>
      </div>
      <div class="flex  justify-center items-center mt-120">
        <div class="financialBut rounded-lg font-32 w-360 h-80 lh-80 mr-36 text-center textColor"
          @click="$router.go(-1)">{{ $t('取消') }}
        </div>
        <div class="rounded-lg font-32 w-360 h-80 lh-80 text-center text-white btnMain" @click="confirm">{{ $t('确认') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import assetsHead from '@/components/Transform/assets-head/index.vue';
import { confirmMichineOrder, machineMakeOrder } from "@/service/financialManagement.api.js";
export default {
  name: "machineConfirm",
  components: {
    assetsHead
  },
  data() {
    return {
      data: {},
    }
  },
  methods: {
    machineMakeOrderFn() {
      machineMakeOrder(this.$route.query).then(res => {
        //console.log('矿机认购', res)
        this.data = res
      })
    },
    confirm() {
      confirmMichineOrder({
        session_token: this.data.session_token,
        minerId: this.data.minerId,
        amount: this.data.amount
      }).then((res) => {
        //console.log('订单确认成功', res)
        this.$router.push({
          path: '/cryptos/order-success',
          query: {
            type: '1', // 结束后查看矿机订单
          }
        })
      }).catch((res) => {
        this.machineMakeOrderFn()
      })
    }
  },
  created() {
    this.machineMakeOrderFn()
  },
}
</script>

<style lang="scss">
@import "@/assets/init.scss";

#cryptos {
  .financialOrder {
    width: 100%;
    box-sizing: border-box;
  }

  .wz {
    bottom: 44px;
    left: 32px;
    right: 32px;
  }
}
</style>
