<template>
  <!-- 永续合约开仓页 -->
  <div class="perpetual-open">
    <div class="pt-2 pb-10">
      <div class="flex">
        <div class="w-full flex flex-col">
          <p class="status-info" v-if="chartData.market && chartData.market.status">
            <span>{{ chartData.market.status && $t(chartData.market.status) }},</span>
            <span class="time">{{ chartData.market.time_str }}</span>&nbsp;
            <span>{{ chartData.market.time_zone && $t(chartData.market.time_zone) }}</span>
          </p>
          <div>
            <div class="flex-1 pb-5 font-16 font-700">{{ $t('现价') }} <span class="text-red ">{{ price || '--'
            }}</span></div>
            <div class="flex textColor font-16 borderColor items-center h-40" style="border-radius:4px;">
              <div class="flex-1 text-center lh-40" style="border-top-left-radius:4px;border-bottom-left-radius:4px;"
                :class="currentType == 'long' ? 'bg-green text-white' : ''" @click="changeTab('long')">{{ $t('buy') }}
              </div>
              <div class="flex-1 text-center lh-40" style="border-top-right-radius:4px;border-bottom-right-radius:4px;"
                :class="currentType == 'short' ? 'bg-red text-white' : ''" @click="changeTab('short')">{{ $t('sell') }}
              </div>
            </div>
            <div class="flex justify-between h-30 items-center mt-10">
              <span class="textColor3 font-14">{{ $t('time') }}</span>
              <span class="textColor3">{{ timeStr }}</span>
            </div>
            <div class="flex justify-between h-30 items-center">
              <span class="textColor3 font-14">{{ $t('tradingAssets') }}</span>
              <span class="textColor3 font-14" style="color:#d6cc62;">USD</span>
            </div>
            <div class="flex justify-between h-30 items-center">
              <span class="textColor3 font-14">{{ $t('可用数量') }}</span>
              <span class="textColor3">{{ nan(initFutrue.amount) }}</span>
            </div>
            <div class="flex justify-between h-30 items-center mb-8">
              <span class="textColor3 font-14">{{ $t('transactionPeriod') }}</span>
            </div>
            <div v-if="!initFutrue.para" class="h-40"></div>
            <contract-futrue v-else :initFutrue="initFutrue" @paraId="onParaId" :key="initFutrue.para" />
            <div class="flex justify-between h-30 items-center">
              <span class="textColor3 font-14">{{ $t('number') }}</span>
            </div>
          </div>
          <div class="flex items-center border-main h-38 lh-38 rounded-lg">
            <input :placeholder="$t('最小金额') + buyMin" class="border-none rounded-xl text-center textColor w-full h-full"
              v-model="form.amount" />
          </div>
          <div class="flex items-center mt-10 textColor1">
            <span :class="[tabIndex == 0 ? 'active' : '']" class="flex-1 text-center border-main rounded-lg mr-5 py-6"
              @click="selectMount(0.25, 0)">25%</span>
            <span :class="[tabIndex == 1 ? 'active' : '']" class="flex-1 text-center border-main rounded-lg mr-5 py-6"
              @click="selectMount(0.5, 1)">50%</span>
            <span :class="[tabIndex == 2 ? 'active' : '']" class="flex-1 text-center border-main rounded-lg mr-5 py-6"
              @click="selectMount(0.75, 2)">75%</span>
            <span :class="[tabIndex == 3 ? 'active' : '']" class="flex-1 text-center border-main rounded-lg py-6"
              @click="selectMount(1, 3)">100%</span>
          </div>
          <div class="flex justify-between h-30 items-center mt-10">
            <span class="textColor3 font-24">{{ $t('minimumBuy') }}</span>
            <span class="textColor3">{{ initFutrue.para && initFutrue.para[0] ? initFutrue.para[paraIndex].buy_min
              : '' }}</span>
          </div>
          <div class="flex font-24 textColor3 justify-between mt-10">
            <div>{{ $t('free') }}</div>
            <div class="textColor">{{ ((form.amount * (initFutrue && initFutrue.para && initFutrue.para[0] ?
              initFutrue.para[paraIndex].unit_fee
              : ''))).toFixed(2) }} USD
            </div>
          </div>
          <template v-if="userStore.userInfo.token">
            <div class="w-full h-40 lh-40 bg-green flex text-white rounded-md mt-20" v-if="currentType == 'long'"
              @click="order('long')">
              <div class="font-16 relative text-center" style="flex-grow:1;">
                {{ $t('buyLong') }}
              </div>
            </div>
            <div class="w-full h-40 lh-40 bg-red flex text-white rounded-md mt-20" v-if="currentType == 'short'"
              @click="order('short')">
              <div class="relative font-16 text-center" style="flex-grow:1;">
                {{ $t('buyShort') }}
              </div>
            </div>
          </template>
          <div v-else class="w-full mt-60">
            <div class="textColor">
              <p>{{ $t('套期保值，风险对冲') }}</p>
              <p class="pt-8">{{ $t('登陆后继续') }}</p>
            </div>
            <div class="h-40 lh-40 btnBackground flex rounded-md justify-center mt-50" @click="$router.push('/login')">{{
              $t('logIn') }}</div>
          </div>
        </div>
        <!-- <div class="ml-15 flex-1">
          <div class="flex-1 flex justify-between pt-5 pb-5 font-14" v-for="(item, index) in greenData" :key="index"
            @click="onQuickPrice(item.price)" :style="{
              'background': `linear-gradient(to right, '#ffffff'} 0%` +
                (1 - item.amount / greenData[greenData.length - 1].amount) * 100 + '%,rgba(94,186,137,.1) ' +
                (1 - item.amount / greenData[greenData.length - 1].amount) * 100 + '%,rgba(94,186,137,.1) 100%)'
            }">
            <div class="text-green">{{ item.price }}</div>
            <div class="text-right textColor" v-if="symbol == 'shib' || symbol == 'btt'">{{ fixDate(item.amount, $i18n) ||
              '--' }}</div>
            <div class="text-right textColor" v-else>{{ item.amount || '--' }}</div>
          </div>
          <div class="flex-1 text-red pt-5 pb-5 font-16 font-700 text-center">{{ price || '--' }}</div>
          <div class="flex-1 flex justify-between pt-5 pb-5 font-14" v-for="(item, index) in redData" :key="item + index"
            @click="onQuickPrice(item.price)" :style="{
              'background': `linear-gradient(to right, '#ffffff'} 0%` +
                (1 - item.amount / greenData[greenData.length - 1].amount) * 100 + '%,rgba(246,70,93,.1) ' +
                (1 - item.amount / greenData[greenData.length - 1].amount) * 100 + '%,rgba(246,70,93,.1) 100%)'
            }">
            <div class="text-red ">{{ item.price }}</div>
            <div class="text-right textColor" v-if="symbol == 'shib' || symbol == 'btt'">{{ fixDate(item.amount, $i18n) ||
              '--' }}</div>
            <div class="text-right textColor" v-else>{{ item.amount || '--' }}</div>
          </div>
        </div> -->
      </div>
    </div>
    <van-popup v-model:show="show" class="rounded-2xl" teleport="body">
      <popup-delivery showBtns :detailData="detailData" :key="detailData.order_no" @close="onClose"
        @continueToBuy="continueTobuy" @timeEnd="handleTimeEnd" :price="price" />
    </van-popup>
  </div>
</template>

<script setup>
import ContractFutrue from '@/components/foreign/foreign-contract-futrue/selectTime.vue'
import PopupDelivery from '@/components/foreign/foreign-popup-delivery/index.vue'
import { Popup, showToast } from 'vant';
import { ref, onMounted, computed, onUnmounted, watch } from "vue";
import { useUserStore } from '@/store/user';
import { _getBalance } from '@/service/user.api.js'
import { _orderOpen, _futrueOrder, _futrueOrderDetail, _futrueOrderInit } from "@/service/trade.api.js";
import { fixDate } from '@/utils/index'
import { SET_USERINFO } from '@/store/types.store'
import { useQuotesStore } from '@/store/quotes.store';
import { useI18n } from "vue-i18n";
import { WS_URL } from '@/config'
const quotesStore = useQuotesStore()
const { t } = useI18n()
import { useRouter, useRoute } from "vue-router";
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const emits = defineEmits(['changeCurrentType', 'ordered'])

const props = defineProps({
  greenData: { // 买单
    type: Array,
    default() {
      return []
    }
  },
  redData: { // 卖单
    type: Array,
    default() {
      return []
    }
  },
  symbol: {
    type: String,
    default: ''
  },
  price: {
    type: [Number, String],
    default: '0.00'
  },
  initOpen: {
    type: Object,
    default() {
      return {}
    }
  },
  initFutrue: {
    type: Object,
    default() {
      return {}
    }
  },
  currentType: {
    type: String,
    default: 'long'
  }
})

let currentBuyType = ref('') // 交割合约当前下单的类型，用于弹窗倒计时结束以后，点击再下一单
let timeout = ref(null)
let timer = ref(null)
let detailData = ref({}) // 交割合约订单详情数据
let show = ref(false)
let popType = ref('confirm') // 弹框类型 confirm / counting
let showOptions = ref(false)
let paraIndex = ref(0)
let form = ref({
  symbol: '', // 币种
  session_token: '',
  direction: 'buy', // 买or卖
  price_type: 'opponent', // 市价or限价
  lever_rate: 1, // 杠杆
  price: '',
  amount: '', // 数量
  para_id: '' // 交割周琦id
})
let timeStr = ref('')
let tabIndex = ref(-1)
let buyMin = ref(0)
let sockets = null
let chartData = ref({})

const nan = computed(() => {
  return (val) => {
    return isNaN(val) ? '--' : val
  }
})

watch(props.price, () => {
  form.value.para_id = props.initFutrue.para && props.initFutrue.para[paraIndex.value].para_id
})
onMounted(() => {
  currentTime()
  startQuoteSocket()
})

onUnmounted(() => {
  clearTimeoutFn()
  clearInterFn()
  sockets && sockets.close()
  sockets = null
})


const currentTime = () => {
  timer.value = setInterval(getCurrentTime, 500);
}

const getCurrentTime = () => {
  let myDate = new Date();
  let h = myDate.getHours() <= 9 ? '0' + myDate.getHours() : myDate.getHours(); // 获取当前小时数(0-23)
  let m = myDate.getMinutes() <= 9 ? '0' + myDate.getMinutes() : myDate.getMinutes(); // 获取当前分钟数(0-59)
  let s = myDate.getSeconds() <= 9 ? '0' + myDate.getSeconds() : myDate.getSeconds();// 获取当前秒数(0-59)
  timeStr.value = h + ':' + m + ':' + s;
}

const selectMount = (rate, index) => {
  tabIndex.value = index
  if (props.initFutrue.amount == 0 || props.initFutrue.amount == '') {
    form.value.amount = 0
  } else {
    form.value.amount = props.initFutrue.amount * rate
  }
}

const continueTobuy = (detailData) => {
  show.value = false
  // setTimeout(() => {
  //   router.push(`/trendDetails/${detailData.symbol}?direction=${detailData.direction}`)
  // }, 300);
}

const onQuickPrice = (price) => { // 点击金额变化
  form.value.price = price
}

const clearTimeoutFn = () => {
  clearTimeout(timeout.value)
  timeout.value = null
}
const clearInterFn = () => {
  clearInterval(timer.value)
  timer.value = null
}
const handleTimeEnd = (order) => {
  _futrueOrderDetail(order).then(data => {
    clearTimeoutFn()
    detailData.value = data
    if (data.state !== 'created') {
      timeout.value = setTimeout(() => {
        handleTimeEnd(order)
      }, 1000)
    }
  })

}

const handleChoose = (item) => {
  showOptions.value = !showOptions.value
  form.value.lever_rate = item.lever_rate
  console.log('handleChoose')
}

const onParaId = ({ id, index }) => { // 交割日期

  if (props.initFutrue && props.initFutrue.para.length > 0) {
    buyMin.value = props.initFutrue.para[index].buy_min
    console.log(buyMin.value)
  } else {
    buyMin.value = 0
  }
  form.value.para_id = id
  form.value.amount = ''
  paraIndex.value = index
}

//选择开仓类型
const changeTab = (type) => { // 开仓和
  console.log('changeTab', type)
  // TODO: 这里应该是换函数
  if (props.currentType === type) {
    return
  }
  emits('changeCurrentType', type)
}

const onClose = () => { // 关闭
  show.value = false
  setTimeout(() => {
    popType.value = 'confirm'
  }, 500)
}

const order = (type) => {
  if (!userStore.userInfo.token) {
    router.push('/login')
    return false;
  }
  if (!form.value.amount) {
    showToast(t('请输入金额'))
    return
  }

  form.value.symbol = route.params.symbol
  form.value.direction = type === 'long' ? 'buy' : 'sell'
  let _order = null // api
  let emitFunc = null // 触发函数
  // 交割合约
  form.value.session_token = props.initFutrue.session_token
  _order = _futrueOrder
  emitFunc = 'futrue'
  if (props.initFutrue.session_token == undefined || props.initFutrue.session_token == '') {
    _futrueOrderInit(props.symbol).then(data => {
      form.value.session_token = data.session_token;
      openOrder(_order, emitFunc);
    }).catch((err) => {
      if (err.code == 'ECONNABORTED') { showToast(t('网络超时！')); }
      else if (err.msg != undefined) { showToast(t(err.msg)); }
    });
  }
  else {
    form.value.session_token = props.initFutrue.session_token;
    openOrder(_order, emitFunc);
  }

}

const openOrder = (_order, emitFunc) => {
  _order(form.value).then((res) => {
    form.value.amount = ''
    showToast(t('success'))
    _getBalance().then(data => { // 刷新余额
      quotesStore[SET_USERINFO, { balance: data.money }]
    })
    emits('ordered', emitFunc)
    _futrueOrderDetail(res.order_no).then(data => {
      detailData.value = data
      show.value = true
    })
  }).catch(() => { // 也需要重新初始化
    emits('ordered', emitFunc)
  })
}
const startQuoteSocket = () => { // 行情socket
  sockets = new WebSocket(`${WS_URL}/1/${route.params.symbol}`)
  // socket.onopen =  () => {
  //     console.log('open')
  //     socket.send('hello')
  // }
  sockets.onmessage = (evt) => {
    const { data } = evt
    const { code, data: _data } = JSON.parse(data)
    if (code / 1 === 0) {
      chartData.value = _data[0] ?? {}
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/css/copy.scss';

.perpetual-open {
  font-size: 14px;
}

.options {
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  border-radius: 6px;

  div {
    font-size: 22px;
    text-align: center;
    width: 140px;
    height: 50px;
    line-height: 50px;

    &.option-active {
      background-color: $light-grey;
    }
  }
}

.right-word {
  top: 50%;
  transform: translateY(-50%);
  right: 19px;
  position: absolute;
  border-radius: 6px;
}

// 开仓样式
.tabcon {
  // padding-bottom: 16%;
  position: relative;
  height: 80px;
}

.tab {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  background-color: $border-grey;
  border-radius: 5px;
  overflow: hidden;
}

.tab>* {
  height: 100%;
}

.tab>img {
  margin-left: -2px;
  margin-right: -2px;
}

.tab>a {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.long {
  background-color: #04cf99;
  color: white;
}

.short {
  background: #f36464;
}

// 下拉
.option-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  width: 100%;
  background-color: $light-grey;
  text-align: center;
  box-shadow: 0px 0px 3px 3px $border-grey;
  border-radius: 4px;
  color: $light-grey;
  z-index: 10;
}

.option-box>div {
  padding: 30px 0;
}

.option-box>div:hover {
  background-color: $light-grey;
}

.num-text-color {
  color: #4C4A54;
}

.with100 {
  width: 100%;
}

.height100 {
  height: 100%;
}

.border-left-half {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.border-right-half {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.border-main {
  border: 1px solid $border_color;
  border-radius: 4px;
}

// .borderColor {
//   border: 1px solid #ccc;
// }

.btnBackground {
  background: $tab_background;
  color: $text_color;
}

.rounded-lg {
  input {
    background: transparent;
  }
}

.active {
  color: $text_color;
}

.status-info {
  padding: 0 6px;
  font-size: 12px;
  line-height: 32px;
  height: 32px;
  border-bottom: 1px solid $border_color;

  .time {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
