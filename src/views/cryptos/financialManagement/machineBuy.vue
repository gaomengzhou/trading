<template>
  <div id="cryptos">
    <div id="financialOrder" class="financialOrder">
      <assets-head :title="$i18n.locale === 'CN'  ? data.name_cn : $i18n.locale === 'zh-CN' ? data.name : data.name_en"></assets-head>
      <div class="box-border  ">
        <div class="w-full h-1 bgDark"></div>
        <div class="mt-48 font-36 font-600 px-33 textColor">{{ $t('购买金额') }}</div>
        <div class="flex justify-center mt-17">
          <div class="flex">
            <input :placeholder="$t('输入金额')" v-model="form.amount" type="number"
              class="h-98 pl-30 w-580 border-none text-grey inputBackground textColor font-28" @input="changeMount">
            <div class="h-98 lh-98 w-180 flex justify-end pr-5 inputBackground textColor" @click="form.amount = bal">
              {{ data.buyCurrency ? data.buyCurrency.toUpperCase() : '' }} <span class="colorMain pr-10 font-28">{{
                $t('全部')
              }}</span></div>
          </div>
        </div>

        <div class=" px-33">
          <div class="flex justify-between flex-row items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('可用余额') }}</div>
            <div class="font-31 font-400 textColor">{{ bal }}
              {{ data.buyCurrency ? data.buyCurrency.toUpperCase() : '' }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('数量限制') }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('最少可投') }}</div>
            <div class="font-31 font-400 textColor">{{ data.investment_min }}
              {{ data.buyCurrency ? data.buyCurrency.toUpperCase() : '' }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('最大可投') }}</div>
            <div class="font-31 font-400 textColor">{{ data.investment_max }}
              {{ data.buyCurrency ? data.buyCurrency.toUpperCase() : '' }}</div>
          </div>
        </div>
        <div class=" h-28 px-33 mt-83 mb-22 textColor font-30">{{ $t('概览') }}</div>
        <div class="px-33">
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('购买日') }}</div>
            <div class="font-31 font-400 textColor">{{ dateBuy }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('起息日') }}</div>
            <div class="font-31 font-400 textColor">{{ earn_time ? earn_time : '--' }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('派息时间') }}</div>
            <div class="font-31 font-400 textColor">{{ $t('每天') }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('预计今日收益') }}</div>
            <div class="font-31 font-400 textColor">{{ (data.investment_min * (data.daily_rate / 100)).toFixed(2) }} - {{
              (data.investment_max * (data.daily_rate / 100)).toFixed(2) }}&nbsp;{{ data.outputCurrency ?
    data.outputCurrency.toUpperCase() : '' }}</div>
          </div>
        </div>
      </div>
      <div @click="handleBuy" class="text-white btnMain h-97 lh-97 w-762 rounded-lg text-center fixed wz  font-30">{{
        $t('购买') }}
      </div>

    </div>
  </div>
</template>

<script>
import { machineMakeOrder } from '@/service/financialManagement.api.js'
import assetsHead from '@/components/Transform/assets-head/index.vue';
import dayjs from 'dayjs'
// import { _getBalance } from "@/service/user.api.js";
import { _getAllWallet } from '@/service/fund.api';
import { showToast } from 'vant';
export default {
  name: "MachineBuy",
  components: {
    assetsHead
  },
  data() {
    return {
      bal: 0,
      earn_time: '--',
      dateBuy: dayjs().format('YYYY-MM-DD'),
      data: {
      },
      form: {
        minerId: '',
        amount: '',
      },
    }
  },
  methods: {
    changeMount() {
      if (this.form.amount == '') {
        return
      }
      machineMakeOrder(this.form).then(res => {
        this.earn_time = res.earn_time
        console.log(res.earn_time)
      })
    },
    handleBuy() {
      if (!this.data.test && !this.form.amount) {
        showToast(this.$t('请输入金额'))
        return
      } else if (this.data.test && this.form.amount == '') {
        this.form.amount = 0
      }
      if (this.form.amount * 1 < this.data.investment_min) {
        showToast(this.$t('最低金额') + ':' + this.data.investment_min)
        return
      } else if (this.form.amount * 1 > this.data.investment_max) {
        if (this.data.investment_max != 0) {
          showToast(this.$t('最大数量') + ':' + this.data.investment_max)
          return
        }
      }

      this.$router.push({ path: '/cryptos/machine-confirm', query: { ...this.form } })

    },
    //获取钱包余额
    getAvailable(symbol) {
      _getAllWallet().then((res) => {
        console.log(res, '余额')
        let walletList = res.extends;
        let initObj = walletList.find(item => {
          return item.symbol.toLowerCase() == symbol.toLowerCase()
        })
        this.bal = initObj.usable
        console.log(this.bal)
      });
    },
  },
  created() {
    this.data = JSON.parse(this.$route.query.obj)
    this.getAvailable(this.data.buyCurrency || 'usdt')
    this.form.minerId = this.data.id
    if (this.data.test) {
      this.form.amount = ''
      machineMakeOrder({ amount: 0, minerId: this.form.minerId }).then(res => {
        this.earn_time = res.earn_time
        console.log(res.earn_time)
      })
    }
  }
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
}
</style>
