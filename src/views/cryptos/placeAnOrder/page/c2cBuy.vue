<template>
  <div id="cryptos">
    <div class="c2cBuy w-full h-full">
      <normal-head :title="$t('购买 USDT')" />
      <div class=" w-full px-33 box-border relative"
        style="background: linear-gradient(180deg, #F4F4F4 0%,#FFFFFF 100%);">
        <div class="flex  pt-34 box-border items-center">
          <span class="text-grey font-26 mr-20">{{ $t('单价') }}</span>
          <span class="text-green font-26 mr-35">$ 6.68</span>
          <img @click="refresh" class="w-24 h-24" src="~@/assets/image/otc/buy/vector_1.png" alt=""
            style="transition: all ease .5s">
        </div>
        <div class="flex mt-22 box-border items-center">
          <span class="text-grey font-26 mr-20">{{ $t('限额') }}</span>
          <span class="c2cColor font-26 mr-35">$ 100,000.00 - $ 388,000.11</span>
        </div>
        <div class="buy-item mt-40 w-full mainBackground">
          <div class="buy-item-title flex justify-between font-28 py-34 border-b-1 border-light-grey">
            <div class="flex-1 text-center" :class="{ 'c2cColor': type === 'quantity' }" @click="typeSwitch('amount')">
              {{ $t('按金额购买') }}
            </div>
            <div class="flex-1 text-center" :class="{ 'c2cColor': type === 'amount' }" @click="typeSwitch('quantity')">
              {{ $t('按数量购买') }}
            </div>
          </div>
          <div class="px-32 mt-40">
            <div class="w-full mb-40 buy-item-input relative box-border" v-show="type === 'amount'">
              <span class="font-28 absolute left-28 text font-700">$</span>
              <input class="w-full font-36 h-110 border-none box-border pl-72" type="number" :placeholder="$t('请输入金额')"
                :value="amount" @input="changeVal">
              <span class="font-28 absolute right-19 text" style="color: #1A6EBD;">{{ $t('全部') }}</span>
            </div>
            <div class="w-full mb-40 buy-item-input relative box-border" v-show="type === 'quantity'">
              <input class="w-full font-36 h-110 border-none box-border pl-30" type="number" :placeholder="$t('请输入数量')"
                :value="quantity" @input="changeVal">
              <span class="font-28 absolute right-19 text">
                <span class="mr-10" style="color:#B8BCC5;">USDT</span>
                <span style="color: #1A6EBD;">{{ $t('全部') }}</span>
              </span>
            </div>
            <div class="flex justify-between mb-12">
              <span class="text-grey">{{ $t('数量') }}</span>
              <span>{{ fullCount }} USDT</span>
            </div>
            <div class="flex justify-between">
              <span class="text-grey">{{ $t('总额') }}</span>
              <span>{{ fullTotalPrice }} $</span>
            </div>
            <div class="w-full mt-24 pb-30">
              <van-button @click.native="buyClick" class="w-full font-30 buy-button" type="primary">{{ $t('购买')
              }}&nbsp;</van-button>
            </div>
          </div>
        </div>
        <div class="p-40 border-bottom-1px">
          <div class="h-80 px-32 mt-40 flex items-center tips" style="background: #EFF7FF;">
            <img class="w-28 h-28 mr-18" src="~@/assets/image/c2c/Group41.png" alt="">
            <p class="font-28 textColor">{{ $t('保护资产安全，请提高防范意识！') }}</p>
          </div>
          <div class="mt-30">
            <h2 class="font-28 font-400">{{ $t('交易信息') }}</h2>
            <div class="flex justify-between mt-40">
              <span class="text-grey">{{ $t('付款时限') }}</span>
              <span>{{ $t('15分钟') }}</span>
            </div>
            <div class="flex justify-between mt-40">
              <span class="text-grey">{{ $t('卖家昵称') }}</span>
              <div>
                <span class="mr-24">{{ $t('北方有佳人') }}</span>
                <van-icon class="font-700 text-grey" name="arrow" />
              </div>
            </div>
            <div class="flex justify-between mt-40">
              <span class="text-grey">{{ $t('交易方式') }}</span>
              <div class="flex items-center">
                <span class="mr-20">{{ $t('银行卡') }}</span>
                <div class="w-6 h-28 border-ra" style="background: #E7BB41;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-36">
          <h2 class="font-28 font-400">{{ $t('交易信息') }}</h2>
          <div class="mt-30 font-26 text-grey">
            <p class="lh-45">{{ $t('请先阅读以下内容:') }}</p>
            <p class="lh-45">{{ $t('银行卡转账切勿备注，不然不给予放币和直接封其账号。付款后 需要提供打款后新的交易明细图（如果P图或者隐藏交易明细上报平台冻结账户）') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/utis";
import NormalHead from "@/components/normal-head";
import { Button, Cell, DropdownItem, DropdownMenu, Field, Icon, Popup, Switch, Toast } from "vant";
import otcCircle from "@/components/otcCircle";
import {
  SET_COUNT,
  SET_TOTAL_PRICE,
  SET_ORDER_NUMBER,
  SET_CREATE_ORDER_TIME,
} from "@/store/const.store";

export default {
  name: "c2cBuy",

  data() {
    return {
      num: 0, // 刷新按钮点击
      type: 'amount', // 按金额/数量购买
      amount: '',
      quantity: '',
    }
  },
  methods: {
    // 刷新点击
    refresh(e) {
      this.num++;
      e.target.style.transform = `rotateZ(-${this.num * 360}deg)`
    },
    // 切换类型
    typeSwitch(type) {
      this.type = type;
      this.amount = '';
      this.quantity = '';
    },
    changeVal(e) {
      e.target.value = e.target.value.replace('-', '');
      this[this.type] = e.target.value;
    },
    // 购买
    buyClick() {
      if (this.fullCount !== '-') {
        this.$router.push({
          name: 'orderGeneration',
        })

        this.$store.commit(`c2cBuy/${SET_COUNT}`, {
          count: this.fullCount,
        })

        this.$store.commit(`c2cBuy/${SET_TOTAL_PRICE}`, {
          price: this.fullTotalPrice,
        })

        this.$store.commit(`c2cBuy/${SET_ORDER_NUMBER}`, {
          orderNumber: new Date().getTime(),
        })

        this.$store.commit(`c2cBuy/${SET_CREATE_ORDER_TIME}`, {
          createOrderTime: formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        })
      }
    }
  },
  computed: {
    fullCount() {// 数量
      if (this.fullTotalPrice === '-') return '-'
      return Math.ceil(parseInt(this.fullTotalPrice) / 6.68)
    },
    fullTotalPrice() {
      if (this.type === 'amount') {
        if (this.amount === '') return '-'
        return this.amount
      } else {
        if (this.quantity === '') return '-'
        return (this.quantity * 6.68).toFixed(2);
      }

    }
  },
  components: {
    otcCircle,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [Switch.name]: Switch,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Button.name]: Button,
    NormalHead,
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/mixin.scss";
@import "@/assets/init.scss";

#cryptos {

  :deep(.van-icon) {
    font-size: 16px;
  }

  :deep(.van-button) {
    border-radius: 10px;
    background: #2EBD85;
    border: none;
  }

  .buy-item {

    border-radius: 25px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
  }

  .border-ra {
    border-radius: 10px;
  }

  .buy-item-title {
    position: relative;

    &:after {
      @include border-1px('bottom');
    }
  }

  .buy-item-input {
    input {
      border-radius: 10px;
      background: $input_background;
    }

    .text {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .border-bottom-1px {
    position: relative;

    &:after {
      @include border-1px('bottom')
    }
  }


  .tips {
    border-radius: 8px;
  }
}
</style>
