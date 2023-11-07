<template>
  <div id="cryptos">
    <div class="pl-30 pr-30 pt-40 pb-30 payment_item c2cColor" :class="{ 'border-b-grey': item.type === 'CN' }">
      <div class="title flex justify-between w-full">
        <div class="flex items-center">
          <div class="w-11 h-36 mr-22 rounded-2xl" :style="{ 'background': color }"></div>
          <div class="font-37">{{ $t(item.methodName) }}</div>
        </div>
        <div class="icon edit" @click="editClick(item, $event)">
          <img class="edit w-32 h-32" src="~@/assets/image/payment/edit.png" alt="">
        </div>
      </div>
      <div class="mt-20 font-32">{{ item.realName }}</div>
      <div class="number">
        <div class="font-700 mt-18 font-37" :class="{ 'ml-44': item.type === 'EN', 'font-32': item.type === 'EN' }">
          {{ item.paramValue1 ? item.paramValue1 : fullNumber(item.paramValue1) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandom, } from "@/utils/utis";

export default {
  name: "CarItem",
  props: ["item", "type"],
  data() {
    return {
      color: "#",
    }
  },
  created() {
    for (let i = 0; i < 6; i++) {
      this.color += getRandom();
    }
    console.log(this.color)
  },
  methods: {
    fullNumber(number) {
      if (this.item.type === 'CN') {
        return number.replace(/(\d{4})/g, "$1 ").trim()
        // return number;
      } else {
        return number;
      }
    },
    // 进入银行卡详情页面
    editClick(data) {
      this.$router.push({
        path: '/cryptos/wantBuy/bankCard',
        query: {
          id: data.uuid,
          type: 'CN',
          configType: 'edit'
        }
      })
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;
  .pt-55 {
    padding-top: 55px;
    ;
  }

  .payment_item {
    background: $tab_background;
    border-bottom: 1px solid $divi_line;
  }
}
</style>