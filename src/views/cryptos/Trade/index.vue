<template>
  <div id="cryptos">
    <div class="pb-108 no_touch">
      <!-- <div class="px-30 pt-20">
        <div class="flex h-88 w-full box-border border-solid-grey rounded-lg">
          <div @click="$router.push('/cryptos/exchangePage')"
            class="font-bold font-32 flex justify-center items-center flex-1">
            <span class="h-60 lh-60 font-16  px-40 borderColor rounded-lg textColor">{{ $t('闪兑') }}</span>
          </div>
          <div class="font-bold flex font-32 justify-center items-center flex-1">
            <span class="h-60 lh-60 btnMain px-40 rounded-lg text-white font-16">{{ $t('现货') }}</span>
          </div>
        </div>
      </div> -->
      <trade-head :isReturn="true" :backFunc="() => $router.push('/')" :symbolName="symbolName" :symbol="symbol"
        :price="price" :range="range" :isTrade="true" @update-coin="onUpdate" @data="quote = $event" />

      <div class="trade-buy-sell flex justify-between px-30 py-30">
        <trade-order-area :symbol="symbol" :symbolName="symbol_data" :init-open="initOpen" :init-close="initClose"
          :price="price" @ordered="onOrdered" />
        <keep-alive>
          <cryptos-trade-deep-data :selectValue="selectValue" @getList="getList" :showType="showType" :symbol="symbol"
            v-if="symbol" :price="price" class="w-290 ml-30" />
        </keep-alive>
      </div>
      <div class="flex k-select-box">
        <div class="mt-20 mb-22 select-box" style="position:relative;">
          <div class=" flex justify-between  items-center w-full h-70" @click="selectBtn">
            <!-- <img src="@/assets/image/public/warn.png" alt="warn-icon" class="w-25 h-25 pl-20"/> -->
            <div class="pl-16 font-28 textColor" style="width:80%;">{{ title }}</div>
            <img src="../../../assets/image/public/grey-select.png" alt="select-icon" class="w-22 h-11 mr-20" />
          </div>
          <div class="option-box" v-show="isShow">
            <div class="font-28" v-for="(item, index) in sortList" :key="index" @click="selectItem(item)">{{
              item.name
            }}
            </div>
          </div>
        </div>
        <div class="ml-10" @click="isSelectShow = true">
          <img src="../../../assets/image/selectIcon.png" alt="warn-icon" class="w-36 h-30" />
        </div>
      </div>
      <div class="h-16 diviLine"></div>
      <div>
        <div class="flex justify-between border-b-color items-center">
          <div class="flex  pl-30">

            <div class="px-10 py-10 flex items-center text-grey font-28" @click="tabClick('1')"
              :class="tabType == '1' ? 'active-line' : ''">{{ $t('当前委托') }}<span v-if="tabType == '1'">({{
                entrustList.length }})</span></div>
            <div class="px-10  ml-50  py-10 flex  items-center text-grey font-28" @click="tabClick('2')"
              :class="tabType == '2' ? 'active-line' : ''">{{ $t('历史委托') }}</div>
            <div class="px-10 py-10 flex items-center  ml-50 text-grey font-28" @click="tabClick('3')"
              :class="tabType == '3' ? 'active-line' : ''">{{ $t('资产') }}</div>
          </div>
          <img src="../../../assets/image/public/record.png" alt="record-img" class="w-64 h-35 pr-30 "
            @click="goHistory" />
        </div>
      </div>
      <div class="py-20 px-20" v-if="tabType == '1'">
        <entrust-item v-for="item in entrustList" :key="item.order_no" :entrust="item" state="submitted"
          @cancelOrder="cancelOrder" />
      </div>
      <div class="py-20 px-20" v-else-if="tabType == '2'">
        <history-item unit="USDT" v-for="item in entrustList" :key="item.order_no" :coinPrice="coinPrice" :entrust="item"
          :state="item.state" @cancelOrder="cancelOrder" />
      </div>
      <div class="py-20 px-20" v-else>
        <div class="mb-20 border-b">
          <p class="font-28 text-grey mt-24 mb-22">{{ $t('当前币对资产') }}</p>
          <ul>
            <li v-for="item in pairsList" :key="item.symbol" class="flex justify-between py-10">
              <div class="flex items-center">
                <img
                  :src="item.symbol ? `${HOST_URL}/symbol/${item.symbol_data}.png` : handleImage('../../../assets/loading-default.png')"
                  class="w-52 h-52 rounded-full mr-16" />
                <p class="flex flex-col">
                  <strong class="font-28 textColor mb-6">{{ item.symbol_data.toUpperCase() }}</strong>
                  <span class="font-20 text-grey">{{ item.full_name }}</span>
                </p>
              </div>
              <div class="flex flex-col items-end">
                <strong class="font-28 textColor mb-6">{{ item.volume }}</strong>
                <span class="font-20 text-grey">{{ currency.currency_symbol }} {{ (item.usdt ? (currency.rate *
                  item.usdt).toFixed(2) :
                  '--') }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="mb-20 border-b">
          <p class="font-28 text-grey mt-14 mb-42">{{ $t('其他非0资产') }}</p>
          <ul>
            <li v-for="item in no_zeroList" :key="item.symbol" class="flex justify-between py-10">
              <div class="flex items-center">
                <img
                  :src="item.symbol ? `${HOST_URL}/symbol/${item.symbol_data}.png` : handleImage('../../../assets/loading-default.png')"
                  class="w-52 h-52 rounded-full mr-16" />
                <p class="flex flex-col">
                  <strong class="font-28 textColor mb-6">{{ item.symbol_data.toUpperCase() }}</strong>
                  <span class="font-20 text-grey">{{ item.full_name }}</span>
                </p>
              </div>
              <div class="flex flex-col items-end">
                <strong class="font-28 textColor mb-6">{{ item.volume }}</strong>
                <span class="font-20 text-grey">{{ currency.currency_symbol }} {{ (item.usdt ? (currency.rate *
                  item.usdt).toFixed(2) :
                  '--') }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div v-if="tabType == '1' && entrustList.length === 0"
        class="flex flex-col justify-center items-center pt-185 pb-100">
        <img src="../../../assets/image/assets-center/no-data.png" alt="no-date" class="w-120 h-120" />
        <p class="textColor">{{ $t('暂无数据') }}</p>
      </div> -->
      <!-- <div class="fixed w-full shadow-box z-100 inputBackground">
        <div class="flex justify-between px-30 py-10">
          <span class="font-24 textColor2">{{ symbol.toUpperCase() }}/USDT&nbsp;{{ $t('k线图表') }}</span>
          <van-icon class="textColor" :name="showCharts ? 'arrow-down' : 'arrow-up'"
            @click="showCharts = !showCharts"></van-icon>
        </div>
        <k-line-charts :update-key="updateKey" :update-data="quote" :symbol="symbol" v-if="symbol && showCharts"
          :showBottom="false" />
      </div> -->
      <div class="fixed-box">
        <div class="flex justify-between items-center px-30 py-20" @click.stop="handleClickShowKlineChart()">
          <span class="font-30  textColor">{{ symbol_data.toUpperCase() }}/USDT&nbsp;&nbsp;{{ $t('k线图表') }}</span>
          <van-icon class="textColor font-20" :name="showCharts ? 'arrow-down' : 'arrow-up'"></van-icon>
        </div>
        <!-- <section class="indicator-index-container" v-if="showKlineChart">
          <div class="indicator-index-box">
            <div class="flex-l">
              <ul>
                <li v-for="(item, index) in filterOne" :key="item" @click="handleClickSelectTime(item, index)"
                  :class="[item.index === timeLabelActive ? 'active' : '']">{{
                    item.name
                  }}</li>
                <li @click="handleClickMoreBtn">{{ $t('更多') }}</li>
              </ul>
            </div>
          </div>
          <div class="indicator-index-box-second" v-if="showMore">
            <ul>
              <li v-for="(item, index) in filterTwo" :key="item" @click="handleClickSelectTime(item, index)"
                :class="[item.index === timeLabelActive ? 'active' : '']">{{
                  item.name
                }}</li>
            </ul>
          </div>
        </section> -->
        <div class="kline-container flex" v-if="showKlineChart">
          <div class="chart-index">
            <!-- <fx-kline :height="500" :symbol="symbol" :isShowsolid="true" :chartType="chartType" v-if="symbol" @data="onData"
            :key="`${symbol}-${timeValue}`" /> -->
            <k-line-charts :update-key="updateKey" :update-data="quote" :symbol="symbol" :showBottom="true" />
          </div>
        </div>
      </div>
      <van-action-sheet class="action-sheet" v-model:show="isSelectShow" @select="onSelect" :actions="actions"
        :cancel-text="$t('取消')" close-on-click-action @cancel="onCancel" />

    </div>

  </div>
</template>

<script>
import TradeHead from '@/components/Transform/trade-head/index.vue'
import TradeOrderArea from '@/components/Transform/trade-order-area/index.vue'
import CryptosTradeDeepData from '@/components/Transform/cryptos-trade-deep-data/index.vue'
import EntrustItem from '@/components/Transform/entrust-item/index.vue'
import KLineCharts from '@/components/Transform/kline-charts/index.vue'
import historyItem from '@/components/Transform/history-item/index.vue'
import fxKline from '@/components/fx-kline/index.vue'

import Axios from '@/service/trading'
import { _getHomeList } from '@/service/home.api'
import { Popup, Swipe, SwipeItem, Circle, Icon, showSuccessToast, showFailToast } from 'vant';
import { mapActions, mapGetters } from 'vuex'
import { SET_COIN_LIST } from '@/store/const.store'
import { WS_URL, HOST_URL } from '@/config'
import TradeApi from "@/service/trading.js";
import { getStorage, handleImage } from '@/utils/utis'
import { useQuotesStore } from '@/store/quotes.store'
import { SET_STAGE } from '@/store/types.store';
import { _getExchangeRate } from '@/service/home.api'
const quotesStore = useQuotesStore()
export default {
  name: "TradePage",
  components: {
    TradeHead,
    TradeOrderArea,
    CryptosTradeDeepData,
    [Popup.name]: Popup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Circle.name]: Circle,
    [Icon.name]: Icon,
    EntrustItem,
    KLineCharts,
    historyItem,
    fxKline,
    KLineCharts
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapGetters({
      coinList: 'home/coinList',
    }),
  },
  data() {
    const initArr = []
    for (let i = 0; i < 8; i++) {
      initArr.push({
        volume: '--',
        price: '--'
      })
    }
    return {
      HOST_URL,
      quote: {},
      showCharts: false,
      updateKey: 1,
      initTimer: null,
      keyIndex: 0,
      timeout: null,
      timer: null, // 底部持仓等的公用定时器
      timer2: null, // 交割合约底部持仓等的公用定时器
      symbol: '',
      price: '',
      range: '',
      initOpen: {},
      initClose: {},
      asks: initArr, // 卖单
      bids: initArr, // 买单
      orderCur: [], // 当前委托
      orderHold: [], // 持有仓位
      futrueHold: [], // 交割持仓
      futrueHistroy: [], // 交割历史
      socket: null, // 行情
      sockets: {
        quotes: null, // 行情
        deep: null /// 深度
      },
      curTab: '', // 当前委托还是持有仓位
      selectIndex: 1, // 当前tab
      initFutrue: {}, /// 交割合约
      show: false, // popup
      entrustList: [], //当前委托订单
      tabType: 1,
      no_zeroList: [], //其他非0资产数组
      pairsList: {}, //当前资产
      // curRequest: [], //
      isShow: false,
      title: 1,
      isSelectShow: false,
      actions: [{ name: this.$t('默认'), value: 0, className: 'actions-active' }, { name: this.$t('展示买单'), value: 1, className: "" }, { name: this.$t('展示卖单'), value: 2, className: '' }],
      showType: 0,
      sortList: [],
      selectValue: 0,
      coinPrice: 0,
      type: 'cryptos',
      filterOne: [
        { name: this.$t('分时'), paramsValue: 'timeSharing', seconds: 1 * 60 * 1000, index: 0, },
        { name: '1' + this.$t('天'), paramsValue: '1day', seconds: 1 * 24 * 60 * 60 * 1000, index: 1, },
        { name: '1' + this.$t('周'), paramsValue: '1week', seconds: 7 * 24 * 60 * 60 * 1000, index: 2, },
        { name: '1' + this.$t('月'), paramsValue: '1mon', seconds: 30 * 24 * 60 * 60 * 1000, index: 3, },
        { name: '5' + this.$t('天'), paramsValue: '5day', seconds: 5 * 24 * 60 * 60 * 1000, index: 4, },
        { name: this.$t('season'), paramsValue: '1quarter', seconds: 3 * 30 * 24 * 60 * 60 * 1000, index: 5, },
        { name: this.$t('Year'), paramsValue: '1year', seconds: 12 * 30 * 24 * 60 * 60 * 1000, index: 6, },
      ],
      filterTwo: [
        { name: '120' + this.$t('分'), paramsValue: '120min', seconds: 2 * 60 * 60 * 1000, index: 7, },
        { name: '60' + this.$t('分'), paramsValue: '60min', seconds: 1 * 60 * 60 * 1000, index: 8, },
        { name: '30' + this.$t('分'), paramsValue: '30min', seconds: 30 * 60 * 1000, index: 9, },
        { name: '15' + this.$t('分'), paramsValue: '15min', seconds: 15 * 60 * 1000, index: 10, },
        { name: '5' + this.$t('分'), paramsValue: '5min', seconds: 5 * 60 * 1000, index: 11, },
        { name: '1' + this.$t('分'), paramsValue: '1min', seconds: 1 * 60 * 1000, index: 12, },
      ],
      showKlineChart: false,
      chartType: '',
      timeValue: '',
      chartData: {},
      timeLabelActive: 1,
      showMore: false,
      symbolName: '',
      updateKey: 1,
      currency: {},
      timer3: null,
      symbol_data: ''
    }
  },
  async created() {
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
    await this.SET_COIN_LIST(this.type)
    this.getExchangeRate()
  },
  methods: {
    handleImage,
    ...mapActions('home', [SET_COIN_LIST]),
    onUpdate(symbol) { // 更新
      this.symbol = symbol
      this.closeSocket()
      this.init(symbol)
    },
    getExchangeRate() {
      _getExchangeRate().then((res) => {
        this.currency = res
      })
    },
    handleClickShowKlineChart() {
      this.showKlineChart = !this.showKlineChart
    },
    handleClickSelectTime(params) {
      const { paramsValue, seconds, index } = params;
      this.timeLabelActive = index;
      quotesStore[SET_STAGE]({ stage: paramsValue, seconds })
      this.onSelectTime(paramsValue)
    },
    onSelectTime(evt) {
      this.timeValue = evt
      if (evt == 'timeSharing') {
        this.chartType = 'area'
      } else {
        this.chartType = 'candle_solid'
      }
    },
    // 事件
    onData(data) {
      this.chartData = data
    },
    handleClickMoreBtn() {
      this.showMore = !this.showMore
    },
    getCoinPrce(val) {
      _getHomeList(val).then((res) => {
        this.symbolName = res[0].name
        this.coinPrice = res[0].close
        this.symbol_data = res[0].symbol_data
      })
    },
    tabClick(type) {
      this.tabType = type;
      this.entrustList = []
      if (type == 3) {
        if (!this.userInfo.token) {
          this.$router.push('/login')
        } else {
          this.getWallet()
        }
      } else {
        if (!this.userInfo.token) {
          this.$router.push('/login')
        } else {
          this.getOrderList()
        }
      }
    },
    onOrdered(evt) { // 下单过后的回调
      this.clearTimer()
      // this.clearTimeout()
      this.initParam(this.symbol, evt) // 重新初始化
      //console.log('下单后更新数据')
    },
    onTab(evt) { // 点击tab后的回调
      // console.log('evt', evt)
      this.clearTimer()
      // this.clearTimeout()
      this.curTab = evt
      this[evt](this.symbol)
    },
    handleQoutes(data) {
      if (data && data.length) {
        const cur = data[0]
        this.price = cur.close
        this.range = cur.change_ratio + ''
        this.quote = cur
        this.updateKey++
      }
    },
    startQuoteSocket() { // 行情socket
      // console.log('symbol', this.symbol)
      if (!this.symbol) {
        return
      }
      this.socket = new WebSocket(`${WS_URL}/1/${this.symbol}`)
      this.socket.onmessage = (evt) => {
        const { data } = evt
        const { code, data: _data } = JSON.parse(data)
        if (code / 1 === 0) {
          this.handleQoutes(_data)
        }
      }
    },
    initParam(symbol, type) { // 初始化参数
      if (this.userInfo.token) {
        if (type === 'open' || !type) {
          //console.log('开仓数据')
          Axios.tradeBuyToken({})
            .then(res => {
              this.initOpen = res
              // console.log(this.initOpen.volume, res.data.volume, type)
            })
        }
        if (type === 'close' || !type) {
          Axios.tradeSellToken({
            symbol
          }).then(res => {
            this.initClose = res
          })
        }

        if (this.userInfo.token) {
          this.getWallet()
          this.timer3 = setInterval(() => {
            this.getOrderList();
          }, 2000)
        }
      }
    },
    init(symbol) { // 初始化页面
      this.symbol = symbol
      if (!this.socket) {
        this.startQuoteSocket()
      }
      this.initParam(symbol) // 'open'
      this.clearTimer()
      this.getCoinPrce(symbol)
    },
    closeSocket() {
      this.socket && this.socket.close()
      this.socket = null
    },
    clearTimer() {
      clearInterval(this.timer)
      clearInterval(this.timer3)
      this.timer = null
    },
    tradeBuy() {
      Axios.tradeBuy({
        volume: 1,
        session_token: '',
        symbol: '',
        price: 1,
        order_price_type: '' //limit限价  opponent市价
      }).then((res) => {
        console.log(res);
      }).catch((error) => {
        if (error.code === 'ECONNABORTED') { showFailToast(this.$t('网络超时！')); }
        else if (error.msg !== undefined) { showFailToast(this.$t(error.msg)); }
      });
    },
    getOrderList() {
      TradeApi.tradeRecord({
        page_no: 1,
        symbol: this.$route.params.symbol,
        type: this.tabType == 1 ? 'orders' : 'hisorders'
      }).then(res => {
        console.log(res);
        this.entrustList = res
      }).catch(() => {

      })
    },
    cancelOrder(order) {
      TradeApi.tradeCancel({
        order_no: order,
      }).then(res => {
        this.initParam(this.symbol)
        showSuccessToast(this.$t('成功'))
      }).catch(() => {

      })
    },
    getWallet() {
      TradeApi.getPairs({
        pairs: `${this.symbol}/usdt`,
        symbolType: 'cryptos'
      })
        .then(res => {
          this.pairsList = res.pairs;
          this.no_zeroList = res.no_zero;
        })
    },
    goHistory() {
      if (this.userInfo.token) {
        let type = 'cryptos'
        if (this.$route.query.type) {
          type = this.$route.query.type
        }
        this.$router.push(`/cryptos/tradeRecord/${this.symbol}/?type=${type}`)
      } else {
        this.$router.push('/login')
      }
    },
    //价格类型下拉框切换
    selectBtn() {
      this.isShow = !this.isShow;
    },
    //选择价格类型
    selectItem(item) {
      this.title = item.name;
      this.isShow = false;
      this.selectValue = item.value
    },
    onSelect(item) {
      this.showType = item.value
      this.actions.map((item) => {
        item.className = ''
      })
      item.className = 'actions-active'
    },
    onCancel() {
      this.isSelectShow = false
    },
    getList(val) {
      if (val.numberLength <= 2) {
        this.title = val.arry[0].name
      } else {
        this.title = val.arry[val.arry.length - 1].name
      }
      this.sortList = val.arry
    }
  },
  beforeRouteEnter(to, from, next) {
    let { params: { symbol } } = to
    // console.log('to', to)
    // let catchTradeSymbol = getStorage('tradeSymbol') || null
    // if (catchTradeSymbol != null) {
    //   symbol = catchTradeSymbol
    // }
    if (symbol) {
      next(vm => {
        vm.symbol = symbol
        vm.init(symbol)
      })
    } else {
      next()
    }
  },
  activated() {
    // if (!this.socket) {
    //     this.startQuoteSocket()
    // }
  },
  deactivated() {
    this.closeSocket()
    this.clearTimer()
  },
  beforeUnmount() {
    this.closeSocket()
    // this.clearTimeout(true)
    this.clearTimer()
  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  :deep(.px-4) {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }

  :deep(.py-4) {
    padding-top: 30px !important;
    padding-bottom: 30px !important;
  }


  //.list-enter-active, .list-leave-active {
  //  transition: all .5s;
  //  transform: translateY(30px)
  //}
  //.list-enter, .list-leave-to
  //  /* .list-leave-active for below version 2.1.8 */ {
  //  transform: translateY(0)
  //}
  :deep(.action-sheet .van-popup) {
    height: 100%;
    width: 670px;
  }

  .no_touch {
    -webkit-user-select: none;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
  }

  .list-enter-active,
  .list-leave-active {
    will-change: transform;
    transition: all 250ms;
  }

  .list-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .list-leave {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .rounded-view {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 0 30px;
    box-sizing: border-box;
  }

  .my-swipe {
    width: 100%;
  }

  .active-line {
    position: relative;
    // padding-bottom: 18px;
    color: $white !important;
    background-color: $color_main
  }

  .active-line::after {
    content: '';
    position: absolute;
    left: 0px;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 4px;
    background-color: $btn_main;
  }

  .shadow-box {
    bottom: 0;
  }
}

.border-b {
  border-color: $border_color;
}

.k-select-box {
  position: relative;
  top: -30px;
  justify-content: flex-end;
  padding: 0 30px !important;
  align-items: center;

  .select-box {
    width: 220px;

    background: $recommend_bg;

    margin-right: 20px;
  }

}

.z-100 {
  z-index: 100;
}

.option-box {
  z-index: 99;
}

:deep(.van-action-sheet__content) {
  background: transparent;

  .van-action-sheet__item {
    background: transparent;
    color: $text_color;
  }

}

:deep(.van-action-sheet__gap) {
  background: transparent;
}

:deep(.van-action-sheet__cancel) {
  background: transparent;
}

.fixed-box {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: $recommend_bg;
}

.indicator-index-container {
  .indicator-index-box {
    padding: 24px;
    display: flex;
    // justify-content: space-between;
    align-items: center;



    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        text-align: center;
        margin: 0 8px;
        padding: 0px 8px;
        font-size: 24px;
        border-radius: 8px;
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

.indicator-index-box-second {
  ul {
    display: flex;
    border: 1px solid $border_color;
    align-items: center;
    border-right: none;
  }

  li {
    flex: 1;
    height: 64px;
    line-height: 64px;
    text-align: center;
    font-size: 12px;
    border-right: 1px solid $border_color;
  }
}

.kline-container {
  margin-top: 10px;

  .order-book-container {
    padding: 100px 2px 0 6px;
    width: 130px;
    border-left: 1px solid $border_color;
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
</style>
