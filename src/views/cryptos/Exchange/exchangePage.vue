<template>
  <div id="cryptos">
    <van-nav-bar left-arrow @click-left="onClickLeft">

      <template #right>
        <van-icon class="exchange-icon" @click="$router.push('/cryptos/exchangeHistory')" name="clock-o" />
      </template>
      <template #title>
        <div class="flex items-center">
          {{ $t('闪兑') }}
          <div class="fee ex-bg"> {{ $t('0手续费') }}</div>
        </div>

      </template>
    </van-nav-bar>
    <div class="exchange-page">


      <list-account show class="mt-94" type="exchange" @exchange="onPopup" ref="exchange" />
      <van-popup class="tabBackground" v-model:show="show" position="bottom" :close-on-click-overlay="false"
        @close="onClose">
        <div class="pop-box relative">
          <img src="../../../assets/image/icon-close.png" class="currency-icon absolute right-20 top-20"
            @click="show = false" />
          <p class="font-38 text-center pt-60 textColor">{{ $t('确认报价') }}</p>

          <div class="px-30 flex items-center mt-30">
            <div class="flex-1 textColor text-center">
              <div class="text-center flex justify-center">
                <img v-if="detail.symbol" :src="`${HOST_URL}/symbol/${detail.iconImg1}.png`" alt="logo"
                  class="w-70 h-70 rounded-full" />
              </div>
              <div class="text-grey font-28 mt-20">{{ $t('从') }}</div>
              <div class="font-30 mt-30">{{ detail.volume }} {{ detail.symbol }}</div>
            </div>
            <img src="../../../assets/image/exchange/icon_6.png" class="w-30 h-20" style="margin-top:-65px" />

            <div class="flex-1 textColor text-center">
              <div class="text-center flex justify-center">
                <img v-if="detail.symbol_to" :src="`${HOST_URL}/symbol/${detail.iconImg2}.png`" alt="logo"
                  class="w-70 h-70 rounded-full" />
              </div>
              <div class="text-grey font-28 mt-20">{{ $t('至') }}</div>
              <div class="font-30 mt-30" v-if="detail.volume">{{ (detail.volume * detail.rate).toFixed(5) }}
                {{ detail.symbol_to }}</div>
            </div>
          </div>

          <ul class="mx-32 px-30 pt-20 pb-34  tab_background mt-53 rounded">
            <!-- <li class="flex justify-between font-28 mt-25">
                      <span class="text-grey">{{ $t('交易手续费') }}</span>
                      <span class="color-green">1</span>
                  </li> -->
            <li class="flex justify-between font-28 mt-25">
              <span class="text-grey">{{ $t('类型') }}</span>
              <span class="textColor">{{ $t('市价') }}</span>
            </li>
            <!-- <li class="flex justify-between font-28 mt-25">
                      <span class="text-grey">{{ $t('闪兑自') }}</span>
                      <span class="textColor">{{ detail.volume }} {{ detail.symbol && detail.symbol.toUpperCase()
                      }}</span>
                  </li> -->
            <li class="flex justify-between font-28 mt-25">
              <span class="text-grey">{{ $t('汇率') }}</span>
              <span class="textColor">1 {{ detail.symbol &&
                detail.symbol.toUpperCase() }}≈{{ (detail.rate * 1).toFixed(5) }} {{ detail.symbol_to &&
    detail.symbol_to.toUpperCase() }}</span>
            </li>
          </ul>
          <div class="h-100 rounded flex justify-between px-32 box-border items-center mt-56 mb-48 text-white w-full">
            <p class="w-360 h-80 rounded flex justify-center items-center bgDark" @click="show = false">
              {{ $t('返回') }}</p>
            <p class="w-360 h-80 rounded btnMain text-white flex justify-center items-center" @click="onConfirm">
              {{ $t('闪兑') }}（{{ count }}{{ $t('秒') }}）</p>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import assetsHead from "@/components/Transform/assets-head/index.vue";
import ListAccount from '@/components/Transform/mining-account/index.vue'
import { _initExchange, _exchange } from "@/service/fund.api";
import { Popup, showToast } from "vant"
import { HOST_URL } from '@/config'
export default {
  components: {
    assetsHead,
    ListAccount,
    [Popup.name]: Popup
  },
  data() {
    return {
      show: false,
      session_token: '',
      detail: {},
      interval: null,
      count: 10,
      HOST_URL,
    }
  },
  created() {
    this.getSessionToken()
  },
  methods: {
    getSessionToken() { // 获取凭证
      _initExchange().then(data => {
        const { session_token } = data
        this.session_token = session_token
      })
    },
    onPopup(evt) {
      console.log(evt)
      this.clearInterval()
      this.detail = evt
      this.show = true
      this.count = 10
      this.interval = setInterval(() => {
        this.count--
        if (this.count <= 0) {
          this.clearInterval()
          showToast(this.$t('汇率已变化,请重新确认'))
          this.show = false
        }
      }, 1000)
    },
    onClose() {
      this.$refs.exchange.fetchRate(true)
      this.clearInterval()
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onConfirm() { // 闪兑
      this.clearInterval()
      let obj = {
        symbol: this.detail.symbol,
        symbol_to: this.detail.symbol_to,
        volume: this.detail.volume
      }
      _exchange({ ...obj, session_token: this.session_token }).then(() => {
        this.$router.push('/cryptos/exchangeSubmit?data=' + JSON.stringify(this.detail))
        this.getSessionToken()
        this.show = false
      }).catch(() => {
        this.getSessionToken()
        this.show = false
      })


    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.clearInterval()
    next()
  }
}
</script>

<style lang="scss">
@import "@/assets/init.scss";

#cryptos {

  .exchange-page {
    height: 100vh - 6vh;

    background: $main_background;

    :deep(.van-tab--active) {
      background: $selectSymbol_background;
      color: $white;
    }

    :deep(.van-nav-bar) {
      background: $selectSymbol_background;
    }

    :deep(.van-tabs__nav) {
      background: $selectSymbol_background;
    }

    :deep(.van-nav-bar__title) {
      color: $text_color;
    }

    :deep(.van-hairline--bottom::after) {
      border-bottom-width: 0px;
    }

    :deep(.van-nav-bar .van-icon) {
      color: $text_color;

      font-size: 40px;
    }
  }

  .bg-grey-light {
    background: $light-grey;
  }

  .bg-grey-dark {
    background: $light-grey;
  }


  .fee {
    // background: #21353A;
    border-radius: 4px;
    color: #00B087;
    font-size: 24px;
    padding: 5px 10px;
    margin-left: 10px;
  }

  .tab_background {
    background: $selectSymbol_background;

    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.21);
    border-radius: 24px;
  }

  .bgDark {
    background: $options_background;
    color: $text_color;
  }

  .btnMain {
    background: linear-gradient(90deg, #2C64D4 0%, #38AEEA 100%);
  }

  .color-green {
    color: #00B087;
  }

  .exchange-icon {
    margin-left: 10px;
    font-size: 40px;
    color: $text_color;
  }
}
</style>
