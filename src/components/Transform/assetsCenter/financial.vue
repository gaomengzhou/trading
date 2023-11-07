<template>
  <div class="financial">
    <div class="flex justify-between box-border px-30 mt-43">
      <div @click="onTab(0)" :class="{ active: tapIndex === 0 }"
        class=" w-370 h-75 lh-75 rounded-lg font-27 text-center mr-20">{{ $t('货币理财') }}</div>
      <div @click="onTab(1)" :class="{ active: tapIndex === 1 }" class=" w-370 h-75 lh-75 rounded-lg font-27 text-center">
        {{ $t('矿池理财') }}</div>
    </div>
    <div class="box-border px-30 mt-42">
      <div class="flex justify-between text-grey relative">
        <div class="flex items-center">
          <span class="text-grey font-30">{{ $t('总资产') }}（USDT）</span>
          <div @click.stop="changeEyes">
            <img src="@/assets/image/assets-center/eye-open.png" class="w-32 h-18"
              v-show="!eyetel" />
            <img src="@/assets/image/assets-center/eye-close.png" class="w-32 h-18"
              v-show="eyetel" />
          </div>
        </div>
        <div class="right-clock">
          <img v-if="tapIndex === 0" @click="$router.push({ path: '/cryptos/financialHistory', query: { type: 0 } })"
            src="@/assets/image/assets-center/Subtract.png" class="subtract-icon"  />
          <img v-if="tapIndex === 1" @click="$router.push({ path: '/cryptos/financialHistory', query: { type: 1 } })"
            src="@/assets/image/assets-center/Subtract.png" class="subtract-icon"  />
        </div>
      </div>
      <div class="font-700 font-66 mt-18 textColor" v-if="!eyetel">
        <template v-if="tapIndex === 0">{{ funds.money_finance || '--' }}</template>
        <template v-if="tapIndex === 1">{{ funds.money_miner || '--' }}</template>
        <span class="font-39 text-grey" v-if="tapIndex === 0">≈{{ currency.currency_symbol }}{{ funds.money_finance ?
          (funds.money_finance *
            currency.rate).toFixed(2) : ' --' }}</span>
        <span class="font-39 text-grey" v-if="tapIndex === 1">≈{{ currency.currency_symbol }}{{ funds.money_miner ?
          (funds.money_miner *
            currency.rate).toFixed(2) : ' --' }}</span>
      </div>
      <div class="font-70 font-66 mt-18" v-else>********</div>
      <div class="flex font-26 lh-32 mb-35 mt-40">
        <div class="flex flex-col ">
          <div>{{ $t('预计日收益') }}（{{ finData.outputCurrency ? finData.outputCurrency.toUpperCase() : 'USDT' }}）</div>
          <template v-if="!eyetel">
            <div class="font-40 mt-17 mb-9 textColor">{{ finData.today_profit || '--' }}</div>
            <!-- <div>≈{{currency.currency_symbol}}{{ finData.today_profit ? (finData.today_profit *
            currency.rate).toFixed(2) : ' --' }}</div> -->
          </template>
          <template v-else>
            <div class="font-40 mt-17 mb-9 textColor">********</div>
          </template>
        </div>
        <div class="flex flex-col ml-110">
          <div>{{ $t('累计收益') }}（{{ finData.outputCurrency ? finData.outputCurrency.toUpperCase() : 'USDT' }}）</div>
          <template v-if="!eyetel">
            <div class="font-40 mt-17 mb-9 textColor">{{ finData.aready_profit || '0.00' }}</div>
            <!-- <div>≈{{currency.currency_symbol}}{{ finData.aready_profit ? (finData.aready_profit *
            currency.rate).toFixed(2) : '0.00' }}</div> -->
          </template>
          <template v-else>
            <div class="font-40 mt-17 mb-9 textColor">********</div>
          </template>
        </div>
      </div>
      <div class="flex flex-col lh-32 mb-35 font-28 ">
        <div>{{ $t('托管中总订单') }}</div>
        <template v-if="!eyetel">
          <div class="font-40 mt-17 mb-9 textColor">{{ finData.order_sum || 0 }}</div>
        </template>
        <template v-else>
          <div class="font-40 mt-17 mb-9 textColor">********</div>
        </template>
      </div>
    </div>
    <!-- <div class="w-full h-13 contBackground"></div> -->
    <div class="px-30">
      <div class="flex justify-between h-36 mt-37">
        <div v-if="tapIndex === 0" class=" font-30 h-36 lh-36 textColor">{{ $t('所有理财') }}</div>
        <div v-if="tapIndex === 0" class="font-26 blue h-36 lh-36 colorMain"
          @click="$router.push({ path: '/cryptos/fund-rule', query: { back: 0 } })">{{ $t('规则') }}</div>
        <div v-if="tapIndex === 1" class=" font-30  h-36 lh-36 textColor">{{ $t('所有矿机') }}</div>
        <div v-if="tapIndex === 1" class="font-26 blue h-36 lh-36 colorMain"
          @click="$router.push({ path: '/cryptos/machine-rule', query: { back: 0 } })">{{ $t('规则') }}</div>
      </div>
      <template v-if="tapIndex === 0">
        <financial-list :list="finList" :type="tapIndex" :btnShow="true"></financial-list>
      </template>
      <template v-else>
        <financial-list :list="machineList" :type="tapIndex" :btnShow="true"></financial-list>
      </template>

    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
import { mapGetters } from "vuex";
import financialList from "./financialList.vue";
import { financeStatics, getMiningRevenueStatisticsList, getMachineBought, getfinacialProductsBought } from '@/service/financialManagement.api.js'
export default {
  name: "financial",
  components: {
    [Icon.name]: Icon,
    financialList
  },
  props: ['funds', 'index'],
  data() {
    return {
      tapIndex: 0,
      eyetel: false,
      total: "",
      finData: {},
      finList: [],
      machineList: []
      // minData: {}
    }
  },
  watch: {
    index: {
      handler: function (val) {
        this.tapIndex = val / 1
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters('home', ['currency'])
  },
  mounted() {
    console.log(this.currency)
    this.onTab(this.tapIndex)
  },
  methods: {
    handleImage(url) {
      return new URL(url, import.meta.url).href
    },
    onTab(index) {
      this.tapIndex = index
      if (index === 0) { // 理财
        this.getFin()
        getfinacialProductsBought({
          page_no: this.page,
          state: '1'
        }).then(res => {
          this.finList = res
          console.log('已购理财', res)
          // console.log(data)
        })
      } else { // 矿机
        this.getMin()
        getMachineBought({
          page_no: 1,
          state: 1
        }).then(res => {
          this.machineList = res
          console.log('已购矿机产品', res)
        })
      }
    },
    getFin() {
      financeStatics().then(data => {
        this.finData = data
      })
    },
    getMin() {
      getMiningRevenueStatisticsList().then(data => {
        this.finData = data
      })
    },
    changeEyes() {
      this.eyetel = !this.eyetel;
    },
  }
}
</script>

<style  lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;
  .w-370 {
    border: 1px solid #EAEDF2;
    color: $text_color1;
  }

  .active {
    color: $white;
    background: $btn_main;
    border-color: $btn_main;
  }

  .lh-32 {
    color: $text_color5;
  }

  .font-40 {
    font-weight: 700;
  }

  .cl {
    color: $text_color4;
    background: #EBECF0;
  }

  .mr-13 {
    font-weight: 600;
    color: $text_color4;
  }

  .col {
    color: $text_color5;
  }

  .font-6 {
    font-weight: 600;
  }

  .font-4 {
    font-weight: 400;
  }

  .cl-33 {
    color: $text_color4;
  }
  .subtract-icon{
    width: 32px;
    height: 40px;
  }
}</style>
