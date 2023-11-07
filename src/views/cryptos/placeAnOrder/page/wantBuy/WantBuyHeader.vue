<template>
  <div id="cryptos">
    <div class="w-full h-122 pl-40 pr-31 box-border bg-blue flex justify-between text-white items-center">
      <van-icon class="flex-1" name="arrow-left" />
      <div class="flex-1" @click="showPopup">
        <span class="font-35 mr-8">{{ $t('自选区') }}</span>
        <van-icon name="arrow-down" />
      </div>
      <van-popup round position="top" v-model:show="show" :closeable="true">
        <span class="font-28 c2cColor font-500 ml-32 block mt-20">{{
          $t('选择交易区')
        }}</span>
        <div class="flex justify-around c2cColor mt-40 pb-48">
          <div class="flex flex-col items-center" @click="handleHeadRoute('/cryptos/wantBuy/quick')">
            <img class="w-56 h-56" src="@/assets/image/otc/wantBuyHead/fast.png" alt="" />
            <span class="font-24 mt-10 h-32 font-500">{{ $t('快捷区') }}</span>
          </div>
          <div class="flex flex-col items-center" @click="handleHeadRoute('/cryptos/wantBuy')">
            <img class="w-56 h-56" src="@/assets/image/otc/wantBuyHead/optional.png" alt="" />
            <span class="font-24 mt-10 font-500">{{ $t('自选区') }}</span>
          </div>
        </div>
      </van-popup>
      <div class="w-252 h-64 px-23 box-border box-radius text-black flex flex-1 justify-around items-center"
        style="background: #c2e1ff">
        <div class="flex items-center" @click="$router.push({
          path: '/cryptos/selectLegalCurrency'
        })">
          <span class="mr-15 font-31 font-400">USD</span>
          <img class="w-24 h-20" :src="require('@/assets/image/otc/wantBuyHead/Group.png')" alt="" />
        </div>
        <span class="w-2 h-36">|</span>
        <van-popover get-container="#wantBuy" v-model:show="isShowPopover" trigger="click" :actions="actions"
          @select="onSelect" placement="bottom-end" theme="dark" :offset="[20, 20]">
          <template #reference>
            <img class="relative w-24 h-6 list-img" :src="require('@/assets/image/otc/wantBuyHead/Group2.png')" alt="" />
          </template>
        </van-popover>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Popup,
  Popover,
} from "vant";

export default {
  name: "WantBuyHeader",
  data() {
    return {
      isShowPopover: false,

      actions: [
        {
          text: this.$t('收款方式'),
          icon: require('@/assets/image/otc/buy/collection_icon.png'),
          path: '/cryptos/paymentMethod',
        },
        {
          text: this.$t('c2c帮助中心'),
          icon: require('@/assets/image/otc/buy/help_icon.png'),
          path: '/cryptos/c2cHelpCenter',
        },
        {
          text: this.$t('c2c用户中心'),
          icon: require('@/assets/image/otc/buy/user_icon.png'),
          path: '/cryptos/c2c/c2cUser',
        },
        {
          text: this.$t('接单模式'),
          icon: require('@/assets/image/otc/buy/order_icon.png'),
        },
      ],
    }
  },
  methods: {
    handleHeadRoute(path) {
      console.log('path', path)
      this.$router.push(path)
    },
    showPopup() {
      this.show = true
    },
    onSelect(action) {

      if (action.text == this.$t('接单模式')) {
        this.showJie = true
        return
      }

      this.$router.push({
        path: action.path,
      })
    },
  },
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Popover.name]: Popover,
  }
}
</script>

<style scoped>
@import "@/assets/init.scss";
</style>
