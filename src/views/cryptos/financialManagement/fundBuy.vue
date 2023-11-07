<template>
  <div id="cryptos">
    <div id="financialOrder" class="fundBuy">
      <assets-head :title="$i18n.locale === 'CN' || $i18n.locale === 'zh-CN' ? data.name_cn : data.name_en"></assets-head>
      <div class="box-border  ">
        <div class="w-full h-1 bgDark"></div>
        <div class="mt-48 font-36 font-600 px-33 textColor">{{ $t('购买金额') }}</div>
        <div class="flex justify-center mt-17">
          <div class="flex ">
            <input :placeholder="$t('输入金额')" type="number" v-model="form.amount"
              class="h-98 pl-30 w-580 border-none inputBackground textColor font-28" @input="changeMount">
            <div class="h-98 lh-98 w-180 flex inputBackground textColor font-28" @click="form.amount = bal">USDT <span
                class="colorMain pl-10" @click="handleAll">{{ $t('全部') }}</span></div>
          </div>
        </div>

        <div class=" px-33">
          <div class="flex justify-between flex-row items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('可用余额') }}</div>
            <div class="font-31 font-700 textColor">{{ bal }} USDT</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('数量限制') }}</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('最少可投') }}</div>
            <div class="font-31 font-700 textColor">{{ data.investment_min }} USDT</div>
          </div>
          <div class="flex justify-between items-center h-72">
            <div class="font-31 font-400 text-grey">{{ $t('最大可投') }}</div>
            <div class="font-31 font-700 textColor">{{ data.investment_max }} USDT</div>
          </div>
        </div>
        <div class=" h-12 px-33 mt-83 mb-22 textColor font-28">{{ $t('概览') }}</div>
        <div class="px-33">
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('购买日') }}</div>
            <div class="font-31 font-700 textColor">{{ dateBuy }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('起息日') }}</div>
            <div class="font-31 font-700 textColor">{{ earn_time ? earn_time : '--' }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('派息时间') }}</div>
            <div class="font-31 font-700 textColor">{{ $t('每天') }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('计息结束日') }}</div>
            <div class="font-31 font-700 textColor">{{ dayjs().add(data.cycle, 'day').format('YYYY-MM-DD') }}</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('提前赎回') }}</div>
            <div class="font-31 font-700 textColor">{{ data.default_ratio }}%</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('预计收益') }}</div>
            <div class="font-31 font-700 textColor">{{ ((data.daily_rate.split(' ~ ')[0]) / 1 * form.amount /
              100).toFixed(2) }} ~
              {{ ((data.daily_rate.split(' ~ ')[1]) / 1 * form.amount / 100).toFixed(2) }} USDT</div>
          </div>
          <div class="flex justify-between items-center h-98">
            <div class="font-31 font-400 text-grey">{{ $t('今日（日收益）') }}</div>
            <div class="font-31 font-700 textColor">{{ data.daily_rate_max }}%</div>
          </div>
        </div>
      </div>
      <div class="text-white btnMain h-97 lh-97 w-762 rounded-lg text-center fixed wz " @click="handleBuy">{{ $t('购买') }}
      </div>
    </div>
  </div>
</template>

<script>
import assetsHead from '@/components/Transform/assets-head/index.vue';
import { _getBalance } from "@/service/user.api.js";
import { fundMakeOrder } from '@/service/financialManagement.api.js'
import dayjs from 'dayjs'
import { showToast } from 'vant';
export default {
  name: "funBuy",
  components: {
    assetsHead
  },
  data() {
    return {
      dayjs,
      earn_time: '',
      dateBuy: dayjs().format('YYYY-MM-DD'),
      bal: 0,
      data: {},
      form: {
        financeId: '',
        amount: '',
      },
    }
  },
  methods: {
    changeMount() {
      if (this.form.amount == '') {
        return
      }
      fundMakeOrder(this.form).then(res => {
        this.earn_time = res.earn_time
      })
    },
    handleBuy() {
      if (!this.form.amount) {
        showToast(this.$t('请输入金额'))
        return
      }
      fundMakeOrder(this.form).then(res => {
        //console.log('认购', res)
        this.$router.push(
          { path: '/cryptos/financial-confirm', query: { ...res } })
      })
    },
    handleAll() {
      this.input.value = this.form.amount
    }

  },
  created() {
    _getBalance().then(res => {
      //console.log('可用余额', res)
      this.bal = res.money
    })
    this.data = this.$route.query
    this.form.financeId = this.data.id
    console.log(this.data)
  }
}
</script>

<style lang="scss" >
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;
  .fundBuy {
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
