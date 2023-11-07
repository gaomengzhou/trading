<template>
  <div class="contract">
    <div class="flex justify-between box-border px-30 mt-43">
      <div @click="onTap(0)" :class="{ active: tapIndex === 0 }"
        class=" w-370 h-75 lh-75 rounded-lg font-27 text-center mr-20">{{ $t('永续合约') }}</div>
      <div @click="onTap(1)" :class="{ active: tapIndex === 1 }" class=" w-370 h-75 lh-75 rounded-lg font-27 text-center">
        {{ $t('交割合约') }}</div>
    </div>
    <div>
      <div class="box-border px-30 mt-42">
        <div class="flex justify-between text-grey relative">
          <div class="flex items-center">
            <span class="text-grey font-30">{{ $t('总资产') }}（USDT）</span>
            <div @click.stop="changeEyes">
              <img src="@/assets/image/assets-center/eye-open.png" class="w-32 h-18" v-show="!eyetel" />
              <img src="@/assets/image/assets-center/eye-close.png" class="w-32 h-18" v-show="eyetel" />
            </div>
          </div>
          <div class="right-clock">
            <img @click="goHistory" src="@/assets/image/assets-center/Subtract.png" class="subtract-icon" />
          </div>
        </div>
        <div class="font-700 font-66 mt-18 textColor" v-if="!eyetel">
          {{ tapIndex === 0 ? funds.money_contract : funds.money_futures }}
          <span class="font-39 text-grey">≈{{ currency.currency_symbol }}{{ funds.money_contract ? (((tapIndex === 0 ?
            funds.money_contract :
            funds.money_futures) * currency.rate).toFixed(2)) : ' --' }}</span>
        </div>
        <div class="font-70 font-66 mt-18 textColor" v-else>******** </div>
        <div class="flex font-26 lh-32 mb-35 mt-40">
          <div class="flex flex-col ">
            <div>{{ tapIndex === 0 ? $t('保证金余额') : $t('全部未实现盈亏') }}（USDT）</div>
            <template v-if="!eyetel">
              <div class="font-40 mt-17 mb-9 textColor">{{ tapIndex === 0 ? funds.money_contract_deposit :
                funds.money_futures_profit }}</div>
              <div>≈{{ currency.currency_symbol }}{{ funds.money_contract_deposit ? (((tapIndex === 0 ?
                funds.money_contract_deposit :
                funds.money_futures_profit) * currency.rate).toFixed(2)) : ' --' }}</div>
            </template>
            <template v-else>
              <div class="font-40 mt-17 mb-9 textColor">*********</div>
            </template>
          </div>
          <div class="flex flex-col ml-110">
            <div>{{ $t('钱包余额(USDT)') }}</div>
            <template v-if="!eyetel">
              <div class="font-40 mt-17 mb-9 textColor">{{ funds.money_wallet }}</div>
              <div>≈{{ currency.currency_symbol }}{{ funds.money_wallet ? (funds.money_wallet * currency.rate).toFixed(2)
                :
                ' --' }}</div>
            </template>
            <template v-else>
              <div class="font-40 mt-17 mb-9 textColor">*********</div>
            </template>
          </div>
        </div>
        <div v-if="tapIndex === 0" class="flex flex-col lh-32 mb-35 ">
          <template v-if="!eyetel">
            <div>{{ $t('全部未实现盈亏') }}（USDT）</div>
            <div class="font-40 mt-17 mb-9 textColor">{{ funds.money_contract_profit }}</div>
            <div>≈{{ currency.currency_symbol }}{{ funds.money_contract_profit ? (funds.money_contract_profit *
              currency.rate).toFixed(2) : ' --' }}</div>
          </template>
          <template v-else>
            <div class="font-40 mt-17 mb-9 textColor">*********</div>
          </template>
        </div>
      </div>
      <div class="w-full h-13 "></div>
      <!--永续合约持有仓位-->
      <div class="px-30">
        <template v-if="tapIndex === 0">
          <PerpetualPositionList :list-data="orderHold" @sell="onRecall"></PerpetualPositionList>
        </template>
        <!--交割合约持有仓位-->
        <template v-else>
          <div class="text-grey text-center py-300 font-30" v-if="futrueHold.length === 0">{{ $t('您目前没有持仓') }}</div>
          <futrue-hold-list v-else :list-data="futrueHold" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { _getAllAssets } from "@/service/user.api.js";
import { mapGetters } from "vuex";
import PerpetualPositionList from '../perpetual-position-list/index.vue';
import futrueHoldList from '../deliveryContract/hold.vue'
import { _futrueOrderList, contractOrder } from "@/service/trade.api";
export default {
  name: "contract",
  components: {
    PerpetualPositionList,
    futrueHoldList
  },
  data() {
    return {
      orderHold: [], // 永续持有仓位
      futrueHold: [], // 交割持有仓位
      tapIndex: 0,
      eyetel: false,
      total: "",
      timer: null,
      timer2: null
    }
  },
  props: ['funds', 'index'],
  computed: {
    ...mapGetters('home', ['currency'])
  },
  watch: {
    index: {
      handler: function (val) {
        console.log(val)
        this.tapIndex = val / 1
      },
      immediate: true
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    handleImage(url) {
      return new URL(url, import.meta.url).href
    },
    goHistory() {
      if (this.tapIndex === 0) {
        this.$router.push({ path: '/cryptos/perpetualHistory', query: { goback: 1, type: 'cryptos' } })
      } else {
        this.$router.push({ path: '/cryptos/deliveryContractHistory', query: { goback: 1, type: 'cryptos' } })
      }
    },
    onTap(index) {
      this.tapIndex = index
      this.fetch()
    },
    fetch() {
      this.clearTimer()
      if (this.tapIndex === 0) {
        this.fetchOrderListHold()
      } else {
        this.fetchFutrueHoldList()
      }
    },
    onRecall() { // 撤单or 平仓 evt
      // this.clearTimer()
      // this[this.curTab](this.symbol)
      // this.fetchOrderListHold()
    },
    clearTimer() {
      clearInterval(this.timer)
      clearInterval(this.timer2)
      this.timer = null
      this.timer2 = null
    },
    fetchOrderListHold() { // 获取永续当前持仓
      let obj = {
        type: 'orders',
        page_no: 1,
        symbolType: 'cryptos'
      }
      contractOrder(obj).then(data => {
        this.orderHold = data
      })
      //TODO:轮询
      this.timer = setInterval(() => {
        contractOrder(obj).then(data => {
          this.orderHold = data
        })
      }, 2000)
    },
    fetchFutrueHoldList() { // 获取交割当前持仓
      _futrueOrderList().then(data => {
        this.futrueHold = data
      })
      console.log('fetchFutrueHoldList')
      this.timer2 = setInterval(() => {
        _futrueOrderList().then(data => {
          this.futrueHold = data
        })
      }, 2000)
    },
    changeEyes() {
      console.log('666')
      this.eyetel = !this.eyetel;
    },
    getData() {
      console.log('sss')
      _getAllAssets().then((data) => {
        this.total = data.total;
        this.status = data.status;
      });
    },
  },
  beforeUnmount() {
    this.clearTimer()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
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

  .num {
    font-weight: 600;
    color: $text_color4;
  }

  .font-4 {
    font-weight: 400;
    color: $text_color4;
  }

  .blue {
    color: $color_main;
  }

  .active_green {
    color: $green;
  }

  .active_red {
    color: $red;
  }

  .active_tab1 {
    background: $red;
    color: $text_color;
  }

  .active_tab2 {
    background: $green;
    color: $text_color;
  }

  .font-6 {
    font-weight: 600;
  }
  .subtract-icon{
    width: 32px;
    height: 40px;
  }
}
</style>
