<template>
  <!-- 永续合约，交割合约公共头部 -->
  <div id="cryptos">
    <div class="contract-header">
      <div class="pl-30 pr-30">
        <div class="flex justify-center pt-45 before">
          <div class="flex items-center ">
            <van-icon class="left" name="arrow-left" size="20" @click="jump()" />
            <div class="mid flex items-center justfly-center">
              <img :src="handleImage(leftIcon)" alt="convert-img" class="w-35 h-35" @click="onSidebar">
              <div class="flex pl-14 textColor" @click="onSidebar">
                <div class="font-30">{{ symbolName.toUpperCase() || '--' }}</div>
                <div class="ml-15 font-28">{{ title }}</div>
              </div>
              <div class="pl-10 font-28" :class="{ 'text-green': range > 0, 'text-red': range <= 0 }">{{ range > 0
                ?
                '+' : '' }}{{ range || '--' }}%</div>
            </div>
            <img src="@/assets/image/kline.png" class="w-44 h-44 right" alt="" @click="klineJump()">
          </div>
          <!-- <div class="flex items-center">
                        <img src="../../assets/image/public/k-line.png" alt="line-img" class="w-38 h-35"
                            @click="jump" />
                    </div> -->
        </div>
        <div class="flex justify-between  pt-34">
          <button class="tabBtn w-368 h-74 lh-74 border-none  rounded"
            :class="selectIndex == 1 ? 'select-active' : 'no-select'" @click="changeTab(1)">
            {{ $t('永续合约') }}</button>
          <button class="tabBtn w-368 h-74 lh-74 border-none  rounded"
            :class="selectIndex == 2 ? 'select-one-active' : 'no-select'" @click="changeTab(2)">
            {{ queryType == 'cryptos' ? $t('交割合约') : $t('期货交易') }}</button>
        </div>
      </div>
    </div>
    <!-- 左侧边弹出菜单 -->
    <van-popup class="popup" round v-model:show="show" close-icon-position="top-left" position="left" @closed="onClose">
      <div class="pl-42 border-b-color pt-48 pb-48">
        <div class="textColor">
          <span class="font-bold font-45 mr-12">{{ title }} {{ $t('合约') }}</span>
          <span class="font-30">/{{ queryType == 'cryptos' ? 'USDT' : 'USD' }} </span>
        </div>
      </div>
      <div class="pl-42 pr-40 font-28">
        <div class="flex justify-between mb-42 mt-53">
          <div class="flex items-center text-grey">
            <div class="mr-12">{{ $t('名称') }}</div>
          </div>
          <div class="flex text-grey ">
            <div class="flex items-center">
              <div class="font-28">{{ $t('最新价格') }}</div>
            </div>
            <div class="flex items-center">
              <div class="mr-12 font-28">/24H{{ $t('涨跌') }}</div>
            </div>
          </div>
        </div>
        <div class="flex justify-between mb-50" v-for="item in list" :key="item.name" @click="onRoute(item)">
          <div>
            <div class="textColor font-28">{{ item.name }}</div>
            <div class="text-grey mt-10 font-28">{{ selectIndex == 1 ? $t('永续') : $t('交割') }}</div>
          </div>
          <div class="text-right">
            <div class="textColor font-28">{{ item.close }}</div>
            <div class="mt-10 font-28" :class="item.change_ratio > 0 ? 'text-green' : 'text-red'">{{ item.change_ratio
            }}%</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from "vant";
import { mapGetters } from "vuex";
import { _getHomeList } from "@/service/home.api";
import { setStorage } from '@/utils/utis'
import { themeStore } from '@/store/theme';
const thStore = themeStore()
// const THEME = thStore.theme
export default {
  name: "contractHeader",
  props: {
    backFunc: {
      type: Function,
      default: null
    },
    balance: { // 余额
      type: [String, Number],
      default: 0.00
    },
    // title:{
    //     type:String,
    //     default:''
    // },
    symbol: {
      type: String,
      default: ''
    },
    range: {
      type: String,
      defalult: ''
    },
    selectIndex: {
      type: [String, Number],
      defalult: ''
    },
    symbolName: {
      type: String,
      default: ''
    },
  },
  components: {
    [Popup.name]: Popup,
  },
  computed: {
    ...mapGetters({ coinList: 'home/coinList' }),
    title() {
      return [this.$t('永续'), this.$t('交割')][this.selectIndex - 1]
    }
  },
  data() {
    return {
      // THEME,
      //   selectIndex2:this.selectIndex,
      show: false,
      timeout: null,
      // title: '',
      list: [
        // { name:"BTC/USDT",close:"22042.28",change_ratio:"2.21"},
        // { name:"XTZ/USDT",close:"1.568",change_ratio:"-7.1"},
        // { name:"ADA/USDT",close:"0.493085",change_ratio:"-4.08"},
      ],
      queryType: 'cryptos',
      leftIcon: new URL(`../../../assets/theme/${thStore.theme}/image/black-convert.png`, import.meta.url),
    }
  },
  created() {
    // this.coins = this.coinList.map(item => item.symbol)
    // console.log('this.coins', this.coins)
    if (this.$route.query.type) {
      this.queryType = this.$route.query.type
    }
  },
  methods: {
    handleImage(url) {
      return new URL(url, import.meta.url).href
    },
    onRoute(item) {
      if (this.$route.params.symbol !== item.symbol) {
        this.$router.push(`/cryptos/perpetualContract/${item.symbol}?type=${this.queryType}`)
        this.$emit('update-coin', item.symbol)
        setStorage('symbol', item.symbol)
        this.$forceUpdate()
      }
      this.show = false
    },
    onSidebar() { // 侧边栏打开
      this.coins = this.coinList.map(item => item.symbol)
      console.log(this.coins, 11111)
      this.show = true
      this.fetchList()
    },
    fetchList() { // 获取行情
      _getHomeList(this.coins.join(',')).then(list => {
        // console.log(list)
        this.list = list
        if (this.timeout) {
          clearTimeout(this.timeout)
          this.timeout = null
        }
        this.timeout = setTimeout(() => {
          this.fetchList()
        }, 1000)
      })
    },
    onClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    },
    jump() {
      if (this.$route.query?.from === 'trade') {
        this.$router.push('/trade/index?tabActive=1')
        return
      }
      if (this.$route.query.type == 'indices') {
        this.$router.push('/quotes/index')
      } else if (this.$route.query.type == 'US-stocks') {
        this.$router.push('/quotes/index?tabActive=3')
      } else if (this.$route.query.type == 'HK-stocks') {
        this.$router.push('/quotes/index?tabActive=4')
      } else if (this.$route.query.type == 'TW-stocks') {
        this.$router.push('/quotes/index?tabActive=5')
      } else {
        this.$router.push('/quotes/index?tabActive=1')
      }
    },
    klineJump() {
      this.$router.push(`/cryptos/trendDetails/${this.symbol}?type=${this.queryType}`)
    },
    changeTab(index) {
      this.$emit('tab', index)
      // this.selectIndex2 = index;
    },

  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  .before {
    position: relative;

    .left {
      position: absolute;
      left: 0;
    }

    .back {
      margin-right: 40px;
    }

    .right {
      position: absolute;
      right: 0;
    }
  }


  .wallet-background {
    background-color: #E8E8E8;
  }

  .tabBtn {
    border-radius: 8px;
    // border: 1px solid #EAEDF2;
    color: $text_color;
    font-weight: bold;
    // background: $tab_background;
    font-size: 30px;
  }

  .select-active {
    background-color: $green;
    color: $white !important;
    border: none;
  }

  .select-one-active {
    background-color: $red;
    color: $white;
    border: none;
  }

  .no-select {}

  :deep(.van-popup) {
    height: 100%;
    width: 670px;
  }

}
</style>
