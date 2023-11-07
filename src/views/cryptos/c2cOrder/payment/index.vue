<template>
  <div id="full">
    <order-nav />
    <div class="mt-10 text-center tabBackground text-black">
      <div>
        <h1 class="font-700 font-40">请向卖家付款</h1>
        <div class="flex justify-center items-center mt-18 font-30 font-700">
          <span>订单将在</span>
          <van-count-down class="flex font-700" :time="time">
            <template #default="timeData">
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
            </template>
          </van-count-down>
          <span>后取消</span>
        </div>
        <div class="flex justify-center items-end mt-42 font-64 font-700">
          <span class="relative bottom-5 font-48">￥</span>
          <span>{{ (totalPrice * 1).toLocaleString() }}.00</span>
          <img class="relative bottom-10 left-25 w-30 h-33" src="~@/assets/image/c2c/Group1168.png" alt="">
        </div>
        <div class="flex justify-center items-center mt-44">
          <img class="w-36 h-34 mr-22" src="~@/assets/image/c2c/Vector.png" alt="">
          <span class=" font-32">联系卖家</span>
        </div>

      </div>
    </div>
    <div class="w-full pt-46 pb-58 mt-40" style="background: #fafafa">
      <div class="ml-50 pl-38 pr-32 msg  relative">
        <div
          class="circle absolute top-0 left-0 z-10 w-45 h-45 flex justify-center items-center bg-blue text-white font-26"
          style="border-radius: 50%">1
        </div>
        <div
          class="circle absolute bottom-28 left-0 z-10 w-45 h-45 flex justify-center items-center bg-blue text-white font-26"
          style="border-radius: 50%">2
        </div>
        <div class="font-28">离开APP,登录您与APP上的验证姓名相匹配的银行账户或其他支付方式，转到卖家的以下账户。</div>
        <div class="mt-50 pt-32 px-22 pb-38 bg-white rounded-2xl msg-wrapper">
          <div class="flex items-center">
            <div class="w-6 h-28 rounded-xl mr-20" style="background: #E7BB41;"></div>
            <span class="ml-8 font-30 text-black">银行卡</span>
          </div>
          <van-cell-group>
            <van-cell class="order-number" title="姓名">
              <template #default>
                <div class="flex justify-end">
                  <span class="mr-14">鸿运当头</span>
                  <img class="relative top-8 w-25 h-29" src="~@/assets/image/c2c/Group1168.png" alt="">
                </div>
              </template>
            </van-cell>
            <van-cell class="order-number" title="银行卡号">
              <template #default>
                <div class="flex justify-end">
                  <span class="mr-14">请点击右上角按钮联系商家索取</span>
                  <img class="relative top-8 w-25 h-29" src="~@/assets/image/c2c/Group1168.png" alt="">
                </div>
              </template>
            </van-cell>
            <van-cell class="order-number" title="银行名称">
              <template #default>
                <div class="flex justify-end">
                  <span class="mr-14">请仔细阅读下方交易条款</span>
                  <img class="relative top-8 w-25 h-29" src="~@/assets/image/c2c/Group1168.png" alt="">
                </div>
              </template>
            </van-cell>
            <van-cell class="order-number" title="开户支行">
              <template #default>
                <div class="flex justify-end">
                  <span class="mr-14">请按照下方交易条款提供相关资料</span>
                  <img class="relative top-8 w-25 h-29" src="~@/assets/image/c2c/Group1168.png" alt="">
                </div>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
        <div class="mt-39 font-28">付款后，返回 XX APP，务必点击下方按钮“我已付款”通知卖家。</div>
      </div>
    </div>
    <div class="mt-92 px-40 flex font-30">
      <van-button class="w-244 h-80 mr-16 rounded-2xl text-black bg-grey border-none" type="primary"
        @click="show = true">遇到问题？</van-button>
      <van-button class="flex-1 h-80 rounded-2xl bg-blue text-white border-none" type="primary"
        @click="onPayed">我已付款，通知卖家</van-button>
    </div>
    <!--  遇到问题  -->
    <div>
      <van-popup class="w-full h-full" v-model:show="show" position="right">
        <question @back="back" :time="time" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Cell, CellGroup, CountDown, Button, Popup, } from "vant"
import OrderNav from "@/components/Transform/order-nav/OrderNav.vue";
import Question from "@/views/cryptos/c2cOrder/payment/components/Question.vue";
import otcApi from "@/service/otc.api";

export default {
  name: "payMent",
  props: {
    time: {},
    detail: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    back() {
      this.show = false;
    },
    onPayed() {
      otcApi.ctcOrderPayFinish({}).then(res => {
        console.log(res)
        this.$router.push({ path: '/cryptos/paymentDetail?id=' + this.$route.query.order_no })
      })
    }
  },
  computed: {
    ...mapState('c2cBuy', ["totalPrice"])
  },
  components: {
    [CountDown.name]: CountDown,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Popup.name]: Popup,
    OrderNav,
    Question,
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";


:deep(.van-count-down) {
  font-size: 26px;
  color: $blue;
}

:deep(.van-cell) {
  margin-top: 28px;

  .van-cell__title,
  .van-cell__value {
    font-size: 26px;
  }
}

.msg {

  //border-left: 1px solid #EAEBEE;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 93%;
    background: #EAEBEE;
  }
}

.msg-wrapper {
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
}

.circle {
  transform: translateX(-50%);
}
</style>