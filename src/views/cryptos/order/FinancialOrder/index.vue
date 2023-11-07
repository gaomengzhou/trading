<template>
  <div id="cryptos">
    <div id="financialOrder" class="financialOrder">
      <assets-head :title="title" :back-func="backFunc"></assets-head>
      <div class="box-border  pb-144">
        <div class="flex flex-col justify-center items-center px-33">
          <div class="font-32 font-400 my-34 textColor">{{ $t('托管金额') }}（USDT）</div>
          <div class="font-66 mb-65 textColor">{{ dataObj.amount }}</div>
        </div>
        <div class="px-33 boderT12">
          <div class="flex justify-between flex-row items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('托管时间') }}</div>
            <div class="font-31 font-400 textColor">{{ timeFomat(dataObj.create_timeStr) }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('当日收益') }}</div>
            <div class="font-31 font-400 textColor">{{ (dataObj.daily_rate_max * dataObj.amount / 100).toFixed(2)
            }}&nbsp;USDT
            </div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('已获收益') }}</div>
            <div class="font-31 font-400 textColor">{{ dataObj.profit }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('剩余天数') }}</div>
            <div class="font-31 font-400 textColor">{{ dataObj.days }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('赎回时间') }}</div>
            <div class="font-31 font-400 textColor">{{ timeFomat(dataObj.close_timeStr) }}</div>
          </div>
        </div>
        <div class="px-33 boderT12">
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('预期收益') }}</div>
            <div class="font-31 font-400 textColor">{{((dataObj.daily_rate.split('~')[0]) / 1 * dataObj.amount / 100).toFixed(2)}} ~
            {{((dataObj.daily_rate.split('~')[1]) / 1 * dataObj.amount / 100).toFixed(2)}}&nbsp;USDT</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('日收益率') }}</div>
            <div class="font-31 font-400 textColor">{{ dataObj.daily_rate }}%</div>
          </div>
        </div>
        <div class="px-33 boderT12">
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('起息时间') }}</div>
            <div class="font-31 font-400 textColor">{{ dataObj.earn_timeStr }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('到期时间') }}</div>
            <div class="font-31 font-400 textColor">{{ dataObj.stop_timeStr }}</div>
          </div>
        </div>
        <div class="px-33 boderT12">
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('违约金') }}(USDT)</div>
            <div class="font-31 font-400 textColor">{{ dataObj.default_amount }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('赎回本金') }}(USDT)</div>
            <div class="font-31 font-400 textColor">{{ dataObj.principal_amount }}</div>
          </div>
        </div>
        <div class="px-33 boderT12">
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('订单编号') }}</div>
            <div class="font-31 font-400 textColor">{{ dataObj.order_no }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('订单时间') }}</div>
            <div class="font-31 font-400 textColor">{{ dataObj.create_timeStr }}</div>
          </div>
        </div>
      </div>
      <div v-if="this.showBtn" @click="ransom"
        class="text-white btnMain h-97 lh-97 w-762 rounded-lg text-center fixed wz ">
        {{ $t('我要赎回') }}</div>
    </div>
  </div>
</template>

<script>
import assetsHead from '@/components/Transform/assets-head/index.vue';
import dayjs from 'dayjs'
import { ransomFinacialProduct, getFinanceOrder } from '@/service/financialManagement.api.js'
import { showSuccessToast } from 'vant';
export default {
  name: "index",
  components: {
    assetsHead
  },
  data() {
    return {
      type: '',
      order_no: '',
      showBtn: false,
      goBack: false,
      id: '',
      title: '',
      dataObj: {
        amount: 0,
        cycle: '--',
        daily_profit: '--',
        profit: '--',
        days: '--',
        daily_rate: '--',
        earn_time: '',
        stop_time: '',
        order_no: '--',
        create_time: '',
        default_amount: '--',
        principal_amount: '--'
      }
    }
  },
  computed: {
    timeFomat() {
      return (value) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.type = this.$route.query.type
    this.order_no = this.$route.query.order_no
    this.showBtn = this.$route.query.showBtn === 'true' ? true: false 
    this.goBack = this.$route.query.goBack
    this.id = this.$route.query.id
    this.getOrderDetail()
  },
  methods: {
    backFunc() {
      if (this.goBack) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          path: '/cryptos/funds',
          query: {
            tab: 3,
            index: 0, // 0: 查看理财订单 1: 矿机
            type: 'cryptos'
          }
        })
      }
    },
    ransom() { // 赎回
      ransomFinacialProduct({
        id: this.id
      }).then(res => {
        console.log(res)
        showSuccessToast(this.$t('赎回成功'))
        setTimeout(() => {
          this.backFunc()
        }, 1000)
      })
    },
    getOrderDetail() {
      getFinanceOrder({
        order_no: this.order_no
      }).then(res => {
        console.log(res);
        this.dataObj = res
        let title = this.$i18n.locale === 'en' ? res.name_en : res.name
        this.title = title + ' ' + this.$t('详情')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;

  .financialOrder {
    width: 100%;
    box-sizing: border-box;
  }

  .wz {
    bottom: 44px;
    left: 32px;
    right: 32px;
  }

  .boderT12 {
    // @include themify() {
    //   border-top: 12px solid themed("cont_background");
    // }
  }
}
</style>
