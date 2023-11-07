<template>
  <div id="cryptos">
    <div id="financialOrder" class="financialOrder">
      <assets-head
        :title="$i18n.locale === 'CN' || $i18n.locale === 'zh-CN' ? data.finance_name_cn : data.finance_name_en"></assets-head>
      <div class="box-border  ">
        <div class="mt-48 font-36 font-600 px-33 mb-22 textColor">{{ $t('理财金额') }} (USDT)</div>
        <div class=" px-33" v-for="(item, index) in list" :key="index">
          <div class="flex justify-center mt-17 mb-32">
            <div class="flex">
              <input type="number" v-model="data.amount" disabled
                class="disabInput h-98 pl-30 w-640 border-none text-grey inputBackground textColor">
              <div class="h-98 lh-98 w-120 inputBackground textColor">USDT </div>
            </div>
          </div>
          <div class="flex justify-between flex-row items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('预期收益') }}</div>
            <div class="font-31 font-400 textColor">{{ $t('每天') }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('日收益') }}</div>
            <div class="font-31 font-400 textColor">{{ data.daily_rate }}%</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('起息日') }}</div>
            <div class="font-31 font-400 textColor">{{ data.earn_time }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('计息结束日') }}</div>
            <div class="font-31 font-400 textColor">{{ data.stop_time }}</div>
          </div>
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
          @click="$router.go(-1)">{{ $t('取消') }}</div>
        <div class="rounded-lg font-32 w-360 h-80 lh-80 text-center text-white btnMain" @click="confirm">{{ $t('确定') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import assetsHead from '@/components/Transform/assets-head/index.vue';
import { confirmFundOrder } from '@/service/financialManagement.api.js'
export default {
  name: "financialOrderConfirm",
  components: {
    assetsHead
  },
  data() {
    return {
      data: {},
      list: [
        {
          //expected_profit:'到期返还',
          expected_profit: this.$t('到期返还'),
          daily_return: '0.5～0.5%',
          start_time: '2022-09-02',
          expire_date: '2022-09-17',
          order_number: '22902837689172972927927',
          order_time: '2022-09-01 17:05:34',
        }
      ]
    }
  },
  methods: {
    confirm() {
      confirmFundOrder({
        session_token: this.data.session_token,
        financeId: this.data.financeId,
        amount: this.data.amount
      }).then((res) => {
        //console.log('订单确认成功', res)
        this.$router.push({
          path: '/cryptos/order-success',
          query: {
            type: '0', // 查看理财订单
          }
        })
      })
    }
  },
  created() {
    this.data = this.$route.query
  },
}
</script>

<style lang="scss" >
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

  .disabInput {
    opacity: 1;
    -webkit-text-fill-color: $dark-grey;
  }
}
</style>
