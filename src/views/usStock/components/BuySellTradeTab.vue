<template>
  <section class="inner-tab-container">
    <div class="line-first-container flex">
      <div class="line-first flex">
        <div class="line-first-l">
          <span>最新价 {{ chartData.close }}</span>&nbsp;
          <span class="red">{{ chartData?.changeRatio }}</span>&nbsp;
          <span class="red">{{ chartData?.netChange }}</span>&nbsp;
        </div>
        <!-- <div class="line-first-r">
          <div class="mt-22 mb-22" style="position:relative;">
            <div class="flex justify-between items-center w-full h-70" @click="selectBtn">
              <div class="select-label">5x</div>
              <img src="@/assets/image/quotes/grey-select.png" alt="select-icon" class="select-icon" />
            </div>
            <div class="option-box" v-show="isShow">
              <div class="font-30" v-for="item in selectData" :key="item.type" @click="selectItem(item)">{{
                item.title }}
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div @click="handleClickShowKlineChart()">
        <div class="title-box" v-if="!showKlineChart">
          <span class="text">{{ t('ExpandQuotes') }}</span>
          <img src="@/assets/image/down-arrow2.png" alt="arrow" />
        </div>
        <div class="title-box" v-else>
          <span class="text">{{ t('PutAwayQuotes') }}</span>
          <img src="@/assets/image/up-arrow2.png" alt="arrow" />
        </div>
      </div>
    </div>

    <div class="orderbook-container flex justify-between px-30 py-30">
      <div :class="{ 'trade-order-area': true, 'sell-box': props.isSell }">
        <!-- TODO: 搜索 -->
        <!-- <div class="name-input" @click="showSearch = true"> -->
        <div class="name-input">
          <van-field v-model="symbol" :placeholder="t('StockCodeShortPin')" autocomplete="off" readonly />
        </div>
        <div class="name-input type-input">
          <div class="mt-22 mb-22" style="position:relative;">
            <div class="flex justify-between items-center w-full h-70" @click="selectBtn">
              <div class="select-label">{{ selectData[curNameIndex]?.title }}</div>
              <img src="@/assets/image/quotes/grey-select.png" alt="select-icon" class="select-icon" />
            </div>
            <div class="option-box" v-show="isShow">
              <div class="font-30" v-for="(item, index) in selectData" :key="item.type" @click="selectItem(item, index)">
                {{
                  item.title }}
              </div>
            </div>
          </div>
        </div>
        <div class="name-input current-type">
          <van-field v-if="curNameIndex === 0" v-model="form.price" autocomplete="off" :readonly="curNameIndex === 0"
            :placeholder="t('价格')">
            <template #button>
              <span size="small" type="primary">USD</span>
            </template>
          </van-field>
          <van-field v-else v-model="form.price" autocomplete="off" :readonly="curNameIndex === 0" :placeholder="t('价格')">
            <template #button>
              <span size="small" type="primary">USD</span>
            </template>
          </van-field>
        </div>
        <div class="flex total-list">
          <div class="total-div" :class="activeBtn === item.type ? 'active-bg' : ''" v-for="item in btnList"
            :key="item.type" @click="onTriggerBtn(item)"> {{ item.title }} </div>
        </div>
        <div class="price-input" v-if="activeBtn === 2">
          <van-stepper v-model="form.total" input-width="142px" button-size="34px" class="price-stepper"
            :placeholder="t('(总额)')" allow-empty />
        </div>
        <div v-else class="number-input">
          <van-stepper v-model="form.volume" input-width="142px" button-size="34px" class="price-stepper"
            :placeholder="t('(数量)')" allow-empty />
        </div>
        <p class="buy-number">可用<span class="num">{{ initOpen.volume }}</span>USD</p>
        <div class="freight">
          <span :class="activePercenIndex === index ? 'active' : ''" v-for="(item, index) in percenList"
            @click="exchangeVal(item, index)">{{ item }}%</span>
        </div>
        <van-button type="danger" class="buy-btn" @click="handleOrder()">{{ props.isSell ? "卖出" : "买入"
        }}</van-button>
        <p class="desc">
          <span class="label">
            {{ t('IndividualStockPositions') }}:<span class="num">100%</span>
          </span>
          <span class="label">
            {{ t('totalPosition') }}:<span class="num">100%</span>
          </span>
        </p>
      </div>
      <div class="trade-deep-data">
        <keep-alive>
          <trade-deep-data :symbol="symbol" v-if="symbol" :price="form.price" class="trade-deep-container"
            @newPrice="getNewPrice" />
        </keep-alive>
      </div>
    </div>
    <div class="indicator-index-container">
      <div class="indicator-index-box">
        <div class="flex flex-1">
          <ul class="flex">
            <li :class="tabType === 1 ? 'active' : ''" @click="tabClick(1)">{{ t('当前委托') }}</li>
            <li :class="tabType === 2 ? 'active' : ''" @click="tabClick(2)">{{ t('历史委托') }}</li>
            <li :class="tabType === 3 ? 'active' : ''" @click="tabClick(3)">{{ t('资产') }}</li>
            <!-- <li>{{ t('成交历史') }}</li> -->
          </ul>

        </div>
        <img src="../../../assets/image/public/record.png" alt="record-img" class="pr-5 record-img " @click="goHistory" />
      </div>
    </div>
    <section class="etf-container">
      <div class="all-etf-ranking">
        <div class="etf-table">
          <div style="padding: 0 15px 47px;" v-if="tabType == '1'">
            <EntrustItem v-for="item in entrustList" :key="item.order_no" :entrust="item" state="submitted"
              @cancelOrder="cancelOrder" />
          </div>
          <div class="pl-10 pr-10 pb-50" v-else-if="tabType == '2'">
            <history-item unit="USD" v-for="item in entrustList" :key="item.order_no" :coinPrice="coinPrice"
              :entrust="item" :state="item.state" @cancelOrder="cancelOrder" />
          </div>
          <div class="pl-10 pr-10" v-else>
            <div class="mb-10 border-b">
              <p class="font-28 text-grey mt-4 mb-22">{{ $t('当前币对资产') }}</p>
              <ul>
                <li v-for="item in pairsList" :key="item.symbol" class="flex justify-between py-10">
                  <div class="flex items-center">
                    <!-- <img
                      :src="item.symbol ? `${HOST_URL}/symbol/${item.symbol}.png` : require('@/assets/loading-default.png')"
                      class="w-20 h-20 rounded-full mr-16" /> -->
                    <p class="flex flex-col">
                      <strong class="font-28 textColor mb-6">{{ item.symbol.toUpperCase() }}</strong>
                      <span class="font-20 text-grey">{{ item.full_name }}</span>
                    </p>
                  </div>
                  <div class="flex flex-col items-end text-grey">
                    <strong class="font-28 textColor mb-6">{{ item.volume }}</strong>
                    <span class="font-20 text-grey">
                      {{ currency.currency_symbol }}
                      {{ item.usdt ? (item.usdt * currency.rate).toFixed(2) : '0.0' }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mb-60 border-b">
              <p class="font-28 text-grey mt-14 mb-42">{{ $t('其他非0资产') }}</p>
              <ul>
                <li v-for="item in no_zeroList" :key="item.symbol" class="flex justify-between py-10">
                  <div class="flex items-center">
                    <img
                      :src="item.symbol ? `${HOST_URL}/symbol/${item.symbol_data}.png` : require('@/assets/loading-default.png')"
                      class="w-52 h-52 rounded-full mr-16" />
                    <p class="flex flex-col">
                      <strong class="font-28 textColor mb-6">{{ item.symbol.toUpperCase() }}</strong>
                      <span class="font-20 text-grey">{{ item.full_name }}</span>
                    </p>
                  </div>
                  <div class="flex flex-col items-end">
                    <strong class="font-28 textColor mb-6">{{ item.volume }}</strong>
                    <span class="font-20 text-grey">
                      {{ currency.currency_symbol }}
                      {{ item.usdt ? (item.usdt * currency.rate).toFixed(2) : '0.0' }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="tabType == '1' && !entrustList.length"
            class="nodata flex flex-col justify-center items-center pt-185 pb-100">
            <img src="@/assets/image/assets-center/no-data.png" alt="no-date" />
            <p class="textColor">{{ $t('暂无数据') }}</p>
          </div>
        </div>
      </div>
    </section>
    <van-popup v-model:show="showSearch" :close-on-click-overlay="false" closeable overlay-class="overlay-container"
      position="bottom" class="popup-container" safe-area-inset-bottom>
      <template #overlay-content>
        <van-search class="search-input flex-1" v-model="searchVal" @input="onInput" :placeholder="t('stockName')"
          @clear="onClearSearch" background="rgba(0,0,0,0.5)" />
      </template>
      <p class="title">搜索结果</p>
      <ul class="search-result">
        <li @click="handleClickSearchResultItem()">
          <div class="flex-l">
            <div class="icon shen">深A</div>
            <span>深物业A</span>
          </div>
          <div class="flex-r">
            <span>000011</span>
          </div>
        </li>
        <li>
          <div class="flex-l">
            <div class="icon us">美股</div>
            <span>特斯拉</span>
          </div>
          <div class="flex-r">
            <span>000011</span>
          </div>
        </li>
        <li>
          <div class="flex-l">
            <div class="icon module">板块</div>
            <span>创业板</span>
          </div>
          <div class="flex-r">
            <span>000011</span>
          </div>
        </li>
      </ul>
    </van-popup>

  </section>
</template>
    
<script setup>
import { ref, onMounted, onBeforeUnmount, computed, reactive, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Tab, Tabs } from 'vant';
import {
  _tradeBuy,
  _tradeSell,
  _getBalance,
  _openView,
  _closeView
} from "@/service/trade.api.js";
import { _queryBySymbol } from "@/service/etf.api.js";
import { _getQuotes } from '@/service/quotes.api'
import { useI18n } from 'vue-i18n'
import { useQuotesStore } from '@/store/quotes.store'
import { useUserStore } from '@/store/user';
import TradeDeepData from '@/components/trade-deep-data/index.vue'
import EntrustItem from './EntrustItem.vue'
import HistoryItem from '@/components/Transform/history-item/index.vue'
import { showToast } from 'vant';
import fxKline from '@/components/fx-kline/index.vue'
import { WS_URL, HOST_URL } from '@/config/index.js'
import Axios from '@/service/trading'
import TradeApi from "@/service/trading.js";
import { _getHomeList } from '@/service/home.api'
import store from '@/store/store'

const props = defineProps({
  symbolFlag: {
    type: String,
    default: ''
  },
  isSell: {
    type: Boolean,
    default: false
  },
  price: {
    type: [Number, String],
    default: '0.00'
  },
})
const quotesStore = useQuotesStore()
const userStore = useUserStore()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const pairsList = ref([])
const interval = ref(null)
const newPrice = ref(0) //最新价
const symbolType = ref('forex') //默认查询外汇
// const amountValue = ref('') // 张数文本框
const symbol = ref(route.query.symbol)
const showKlineChart = ref(false)
const showSearch = ref(false)
const isOpen = ref(false)
const searchVal = ref('')
const isShow = ref(false)
const currentType = ref(props.isSell ? 'close' : 'open')
const sessionToken = ref('')
const emits = defineEmits(['updateActive'])
const selectData = ref([

  {
    type: '1',
    title: '市价委托'
  },
  {
    type: '2',
    title: '限价委托'
  }
])
const btnList = ref([
  {
    type: 1,
    title: '数量'
  },
  {
    type: 2,
    title: '总额'
  }
])
const activeBtn = ref(1)
const curNameIndex = ref(0)
const percenList = ref([
  25, 50, 75, 100
])
const activePercenIndex = ref(-1)
const percentageVal = ref(0)
const initOpen = reactive({})
const no_zeroList = ref([])
const entrustList = ref([])
const tabType = ref(1) // 1: 当前委托 2: 历史委托, 3： 资产， 4：成交历史


const isTotal = computed(() => {
  return activeBtn.value == 2
})
const form = reactive({
  volume: '',
  session_token: '',
  price: '',
  total: '',
  order_price_type: 'opponent', // 市价or限价
})
const chartData = ref({})
const currency = ref(store.state.home.currency)
let socket = null


onMounted(async () => {
  if (!socket) {
    startQuoteSocket()
  }
  queryBySymbol()
  initParam(symbol.value, currentType.value)
  tabClick(1)
  getCoinPrice(symbol.value)
  // props.isSell ? closeView() : openView()
})

onBeforeUnmount(() => {
  // if (interval.value) {
  //   clearInterval(interval.value)
  // }
})
const tabClick = (type) => {
  tabType.value = type;
  if (type == 2 && !userStore.userInfo.token) {
    router.push('/login')
    return
  }
  entrustList.value = []
  getOrderList()
}
const exchangeVal = (val, index) => {
  activePercenIndex.value = index
  percentageVal.value = val
  if (!isTotal.value) {
    if (form.price === '0.00' || initOpen.volume === '0') return
    let sum = (parseFloat(initOpen.volume) * (val / 100) / parseFloat(form.price))
    form.volume = Math.floor(sum * 100000) / 100000
  } else {
    form.total = initOpen.volume * (val / 100)
  }
}
const onTriggerBtn = (item) => {
  activeBtn.value = item.type
  form.volume = ''
  form.total = ''
  activePercenIndex.value = -1
}
const selectBtn = () => {
  isShow.value = !isShow.value
}
const selectItem = (item, index) => {
  form.order_price_type = item.type === '1' ? 'opponent' : 'limit'
  curNameIndex.value = index
  isShow.value = false
}

const getNewPrice = (value) => {
  newPrice.value = value
}

const handleClickSearchResultItem = (value) => {
  console.log(value, 'value')
}

const handleClickShowKlineChart = () => {
  showKlineChart.value = !showKlineChart.value
}

const onClearSearch = () => {
  searchVal.value = ''
}

// 事件
const onData = (data) => {
  chartData.value = data
}

const queryBySymbol = () => {
  _queryBySymbol(symbol.value).then(data => {
    isOpen.value = data.open
  })
}

const openView = () => {
  console.log('openView')
  _openView({
    token: userStore.userInfo.token,
  }).then(res => {
    console.log(sessionToken.value, 'sessionToken.value')
    sessionToken.value = res.session_token
  })
}

const closeView = () => {
  console.log('closeView')
  _closeView({
    token: userStore.userInfo.token,
    symbol: symbol.value
  }).then(res => {
    sessionToken.value = res.session_token || '',
      volume.value = res.volume || 0
  })
}

// 开仓
const handleOrder = () => {
  if (!userStore.userInfo?.token) {
    router.push('/login')
    return
  }
  let volume = ''
  if (isTotal.value) {
    if (!form.total) {
      showToast(t('请输入总额'))
      return
    }
    if (currentType.value === 'open') {
      form.volume = parseFloat(form.total).toFixed(5)
    } else {
      form.volume = (parseFloat(form.total) / parseFloat(form.price))
      form.volume = form.volume.toFixed(5)
    }
    volume = form.volume
  } else {
    if (!form.volume) {
      showToast(t('请输入数量'))
      return
    }
    if (currentType.value === 'open') {
      volume = (parseFloat(form.volume) * parseFloat(form.price))
    } else {
      volume = form.volume
    }
  }
  // if (currentType.value === 'open') {
  //   form.session_token = this.initOpen.session_token
  // } else {
  //   form.session_token = this.initClose.session_token
  // }
  const emitFunc = currentType.value

  let _order = currentType.value === 'open' ? _tradeBuy : _tradeSell
  const params = {
    volume,
    session_token: sessionToken.value,
    symbol: symbol.value, // 币种
    price: form.price,
    total: form.total,
    order_price_type: form.order_price_type, // 市价or限价
  }

  _order(params).then((res) => {
    showToast(t('successfullyOrdered'))
    form.volume = ''
    form.total = ''
    _getBalance({
      token: userStore.userInfo.token
    }).then(data => { // 刷新余额
      userStore['SET_USERINFO'](
        { balance: data.money }
      )
      store.commit('user/SET_USERINFO', { balance: data.money })
    })
    initParam(symbol.value, emitFunc)
  }).catch(() => { // 也需要重新初始化
    initParam(symbol.value, emitFunc)
  })

}
const closeSocket = () => {
  socket && socket.close()
  socket = null
}
const startQuoteSocket = () => { // 行情socket
  if (!symbol.value) {
    return
  }
  socket = new WebSocket(`${WS_URL}/1/${symbol.value}`)
  socket.onmessage = (evt) => {
    const { data } = evt
    const { code, data: _data } = JSON.parse(data)
    if (code / 1 === 0) {
      handleQoutes(_data)
    }
  }
}
const handleQoutes = (data) => {
  if (data && data.length) {
    const cur = data[0]
    chartData.value = cur
    if (curNameIndex.value === 0) {
      form.price = cur.close
    }
  }
}

const initParam = (symbol, type) => { // 初始化参数
  if (type === 'open') {
    //console.log('开仓数据')
    Axios.tradeBuyToken({})
      .then(res => {
        initOpen.volume = res.volume
        initOpen.fee = res.fee
        initOpen.session_token = res.session_token
        sessionToken.value = res.session_token
      })
  }
  if (type === 'close') {
    Axios.tradeSellToken({
      symbol
    }).then(res => {
      console.log('close res:', res)
      initOpen.volume = res.volume
      initOpen.fee = res.fee
      initOpen.session_token = res.session_token
      sessionToken.value = res.session_token
    })
  }
  getWallet()
  if (userStore.userInfo.token) {
    getOrderList()
  }
}
const getWallet = () => {
  TradeApi.getPairs({
    pairs: `${symbol.value}/usdt`
  })
    .then(res => {
      pairsList.value = res.pairs;
      no_zeroList.value = res.no_zero;
    })
}
const getOrderList = () => {
  TradeApi.tradeRecord({
    page_no: 1,
    symbol: symbol.value,
    type: tabType.value == 1 ? 'orders' : 'hisorders'
  }).then(res => {
    entrustList.value = res
  }).catch(() => {

  })
}
const cancelOrder = (order) => {
  console.log('order:', order)
  TradeApi.tradeCancel({
    order_no: order,
  }).then(res => {
    console.log(res, 'res')
    initParam(symbol.value, currentType.value)
    showToast(this.$t('成功'))
  }).catch(() => {

  })
}
const coinPrice = ref(0)
const getCoinPrice = (val) => {
  _getHomeList(val).then((res) => {
    coinPrice.value = res[0].close
  })
}
const goHistory = () => {
  emits('updateActive')
}
onUnmounted(() => {
  closeSocket()
})

</script>
<style lang="scss" scoped>
:deep(.van-popup) {
  height: 75%;
}

:deep(.van-overlay) {
  background: rgba(0, 0, 0, .5);
}

:deep(.van-popup) {
  background-color: $main2_background;
}

:deep(.van-search__content) {
  height: 32px;
  background: $border_color;
}

:deep(.van-field__control) {
  color: $text_color;
}

:deep(.van-field__control::placeholder) {
  color: #747A8F;
  font-size: 12px;
}

:deep(.van-search__field.search-input) {
  line-height: 32px;
}

:deep(.van-search__action:active) {
  background: $selectSymbol_background;
  color: $color_main;
  font-size: 12px;
}

:deep(.search-result .van-cell) {
  background: $mainBgColor;
}

:deep(.van-tabs__nav) {
  background: $selectSymbol_background;
}

:deep(.van-tab) {
  font-size: 14px;
  color: $text_color;
  font-weight: 400;
}

:deep(.van-tabs__content) {
  margin-top: 20px;
}

:deep(.van-tab.van-tab--active) {
  font-weight: 700;
}

:deep(.van-button--danger) {
  border: none;
  background-color: $red;
}

:deep(.sell-box .van-button--danger) {
  border: none;
  background-color: $btn_main;
}

:deep(.trade-order-area .van-field) {
  padding: 4px 6px;
  background: $selectSymbol_background;
  border: 1px solid $red;
  border-radius: 2px;
}

:deep(.trade-order-area.sell-box .van-field) {
  padding: 4px 6px;
  background: $selectSymbol_background;
  border: 1px solid $color_main;
  border-radius: 2px;
}

:deep(.trade-order-area .van-field__control) {
  color: $text_color;
}

:deep(.van-stepper__minus) {
  background: $input_background;
  border: 1px solid $red;
  border-radius: 2px;
  color: $red;
}

:deep(.van-stepper__plus) {
  background: $input_background;
  border: 1px solid $red;
  border-radius: 2px;
  color: $red;
}

:deep(.van-stepper__input) {
  background: $input_background;
  color: $text_color;
  border-top: 1px solid $red;
  border-bottom: 1px solid $red;
  margin: 0;
}

:deep(.sell-box .van-stepper__minus) {
  background: $input_background;
  border: 1px solid $color_main;
  border-radius: 2px;
  color: $color_main;
}

:deep(.sell-box .van-stepper__plus) {
  background: $input_background;
  border: 1px solid $color_main;
  border-radius: 2px;
  color: $color_main;
}

:deep(.sell-box .van-stepper__input) {
  background: $input_background;
  color: $text_color;
  border-top: 1px solid $color_main;
  border-bottom: 1px solid $color_main;
  margin: 0;
}

:deep(.orderbook) {
  margin-bottom: 14px !important;
}

:deep(.van-popup.popup-container) {
  padding: 12px;

  .title {
    color: #747A8F;
    font-size: 12px;
  }

  .search-result {
    li {
      display: flex;
      padding: 12px;
      border-bottom: 1px solid #1F2944;
      font-size: 14px;

      .flex-l {
        width: 160px;
        display: flex;
        align-items: center;

        .icon {
          font-size: 10px;
          border-radius: 3px;
          line-height: 16px;
          height: 18px;
          width: 30px;
          text-align: center;
          margin-right: 10px;
        }

        .us,
        .sh {
          color: #893559;
          border: 1px solid #893559;
        }

        .shen {
          color: #DB9461;
          border: 1px solid #DB9461;
        }

        .module {
          color: #5F5F5F;
          border: 1px solid #5F5F5F;
        }
      }

    }
  }
}

.sell-box {
  .type-input {
    padding: 4px 6px;
    background: $selectSymbol_background;
    border: 1px solid $color_main !important;
    border-radius: 2px;
  }

  .total-div {
    flex: 1;
    text-align: center;
    padding: 4px 0;
    border: 1px solid $color_main !important;
  }

  .active-bg {
    background-color: $btn_main !important;
    color: $white;
  }


}

.container-box {
  .green {
    color: $green;
  }

  .red {
    color: $red;
  }


  .line-first-container {
    padding: 0 12px;
    justify-content: space-between;
    align-items: center;



    .line-first {
      display: flex;
      width: 210px;
      margin-right: 12px;
      justify-content: space-between;
      font-size: 12px;

      .select-label {
        padding-left: 4px;
      }

      .select-icon {
        height: 11px;
        width: 14px;
        padding-right: 4px;
      }

    }

    .line-first-l {
      flex: 1;
    }

    .line-first-r {
      width: 50px;
      padding: 0 2px;
      border: 1px solid$border_color;
      border-radius: 2px;
      color: $text_color6;
    }

    .title-box {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;
      text-align: right;

      span {
        color: #747A8F;
      }

      img {
        margin-left: 10px;
        width: 12px;
        height: 12px;
      }
    }
  }

  .option-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 4.625rem;
    width: 100%;
    background: $grey_bg;
    text-align: center;
    border-radius: 0.25rem;
    color: $text_color4;
    z-index: 9;
    font-size: 14px;
    font-weight: 700;
    color: $text_color;

    >div {
      padding: 1.875rem 0;
    }
  }


  .order-book-container {
    padding: 100px 2px 0 6px;
    width: 130px;
    border-left: 1px solid #2E364F;
  }

  .chart-index {
    flex: 1;
    min-width: 200px;
  }



  .text-sm {
    position: relative;
  }

  .select-div {
    width: 100px;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 100;

    ul {
      box-shadow: 0px 3px 11px 0px rgb(0 0 0 / 10%);

      li {
        background: $mainbgWhiteColor;
        text-align: center;
        padding: 10px 0;
        font-size: 16px;
      }

      li:not(:last-child) {
        border-bottom: 1px solid $border-grey;
      }
    }
  }

  .active {
    background: $btn_main !important;
    color: $text_color;
  }
}


.inner-tab-container {
  margin-top: 8px;
}

.orderbook-container {
  padding: 0 12px 16px;

  .trade-order-area {
    display: flex;
    flex-direction: column;
    width: 210px;
    font-size: 12px;
    margin-right: 12px;

    .buy-btn {
      height: 32px;
    }

    .type-input {
      padding: 4px 6px;
      background: $selectSymbol_background;
      border: 1px solid $red;
      border-radius: 2px;
    }

    .name-input {
      margin-top: 10px;
    }

    .price-input {
      margin-top: 10px;
    }

    .number-input {
      margin-top: 10px;
    }

    .value-input {
      margin-top: 10px;
    }

    .buy-number {
      margin-top: 10px;
    }

    .num {
      color: #E19841;
      margin: 0 4px;
    }

    .freight {
      margin: 10px 0 14px;
      display: flex;

      span {
        flex: 1;
        background: $input_background;
        border-radius: 2px;
        text-align: center;

        &.active {
          color: $red;
        }
      }

      span:not(:last-child) {
        margin-right: 8px;
      }
    }

    .desc {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }

  .trade-deep-data {
    flex: 1;
    margin-top: 10px;
  }

  .total-list {
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
    position: relative;
    margin-top: 10px;

    .total-div {
      flex: 1;
      text-align: center;
      padding: 4px 0;
      border: 1px solid $red;
    }

    .active-bg {
      background-color: $red;
      color: $white;
    }
  }
}

.indicator-index-container {
  .indicator-index-box {
    padding: 12px;
    display: flex;
    // justify-content: space-between;
    align-items: center;



    ul {
      display: flex;

      li {
        text-align: center;
        margin: 0 4px;
        padding: 4px 10px;
        font-size: 14px;
        border-radius: 4px;
      }
    }


    .flex-r {
      display: flex;
      justify-content: flex-end;
      width: 80px;

      img {
        width: 12px;
        height: 16px;
      }

    }
  }

  .active {
    background: $btn_main;
    color: $white;
  }
}

.etf-container {
  padding: 0;

  .nodata {
    margin-top: 80px;

    img {
      width: 85px;
      height: 85px;
    }
  }

  .hot-container {
    margin: 20px 0;
    padding: 0 8px;

    .header-box {
      display: flex;

      .title {
        flex: 1;
        font-size: 16px;
        padding: 0 8px;
        font-weight: 700;
      }

      .icon-group {
        display: flex;
        align-items: center;

        .icon.arrow {
          margin-left: 10px;
          width: 7px;
          height: 9px;
        }
      }

    }

    .hot-box {
      display: grid;
      grid-template-columns: 33.33% 33.33% 33.33%;
      grid-template-rows: repeat(2, 100px);
    }

    .hot-item {
      padding: 6px 2px;
      margin: 4px;
      text-align: center;
      font-size: 12px;
      line-height: 18px;
      color: #B8BDD1;
      background: $input_background;
      border-radius: 4px;

      .value {
        font-weight: 700;
        color: $text_color;
        line-height: 24px;
      }

      .num {
        .num-left {
          margin-right: 6px;
        }
      }
    }
  }

  .all-etf-ranking,
  .other-etf-ranking {
    margin-top: 10px;

    .title {
      font-weight: 700;
      padding: 0 12px;
    }

    .tabs {
      padding: 0 12px;
      margin-top: 10px;
      height: 40px;
      line-height: 24px;
      color: #BBBCBD;

      .tab-item {
        margin: 4px;
        text-align: center;
        padding: 4px 6px;
        font-size: 12px;
        color: $text_color5;
        background: $US_tab_background;
        border-radius: 10px;
        background-size: cover;
      }

      .active {
        font-weight: 700;
        color: $color_main !important;
        background: $US_tabActice_background;
        border-radius: 10px;
        background-size: cover;
      }
    }

    .etf-table {
      .right {
        text-align: right;
      }

      ul {
        margin-top: 10px;
      }

      .title-line {
        color: #747A8F;
        font-size: 12px;
        font-weight: 400;
        padding: 0 12px;
        border: none;
      }

      li {
        padding: 14px 12px;
        display: flex;
        font-size: 12px;
        line-height: 18px;
        border-bottom: 1px solid $border_color;

        .gray-text {
          color: #BCBDC2;
          font-size: 12px;
        }

        .flex-l {
          width: 100px;
        }

        .flex-r {
          display: inline-flex;
          flex: 1;

          .flex-r-item {
            flex: 1;
            align-self: center;
            text-align: center;
          }
        }
      }
    }
  }

}

.overlay-container {
  .search-input {
    width: 100%;
    position: absolute;
    top: 148px;
  }

}

.border-b {
  border-color: $border_color;
}

.record-img {
  display: block;
  width: 26px;
  height: 18px;
}

.kline-container {
  margin-top: 10px;

  .order-book-container {
    padding: 100px 2px 0 6px;
    width: 120px;
    border-left: 1px solid #2E364F;
  }

  .chart-index {
    flex: 1;
    min-width: 200px;
  }



  .text-sm {
    position: relative;
  }

  .select-div {
    width: 100px;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 100;

    ul {
      box-shadow: 0px 3px 11px 0px rgb(0 0 0 / 10%);

      li {
        background: $mainbgWhiteColor;
        text-align: center;
        padding: 10px 0;
        font-size: 16px;
      }

      li:not(:last-child) {
        border-bottom: 1px solid $border-grey;
      }
    }
  }

  .active {
    background: $btn_main !important;
    color: $text_color;
  }
}

.fixed-box {
  position: fixed;
  width: 100%;
  height: 300px;
  left: 0;
  bottom: 0;
  background: $red;
}
</style>