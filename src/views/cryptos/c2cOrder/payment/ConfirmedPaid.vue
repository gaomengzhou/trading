<template>
  <div id="cryptos">
    <div id="full" class="flex flex-col w-full h-full">
      <order-nav @back="backRouter" :back="false"/>
      <div class="flex-1 " style="overflow-y: auto">
        <div class="pb-40 text-center c2cColor mainBackground">
          <div>
            <h1 class="font-600 font-36">{{ $t("请确认已收到付款") }}</h1>
            <div class="flex justify-center items-center mt-42 font-60 font-600">
              <span class="relative  mr-10 font-44">{{
                detail.currency
              }}</span>
              <span>{{ detail.amount }}</span>
              <!--            <span class="relative bottom-5 ml-16 font-400 font-44">USDT</span>-->
            </div>
            <div class="mt-32">
              <van-icon class="" color="#9399A4" name="arrow-down" />
            </div>
            <div class="flex justify-center items-center mt-50" @click="
              $router.push({
                path: '/cryptos/chat',
                query: JSON.stringify(),
              })
              ">
              <van-badge class="w-36 h-34 mr-22">
                <img class="w-full h-full" src="~@/assets/image/c2c/Vector.png" alt="" />
              </van-badge>
              <span class="font-32">{{ $t("联系买家") }}</span>
            </div>
          </div>
        </div>
        <div class="w-full pt-50 pb-30 ">
          <div class="ml-50 pl-38 pr-32 msg relative">
            <div
              class="circle absolute top-0 left-0 z-10 w-45 h-45 flex justify-center items-center bg-blue text-white font-26"
              style="border-radius: 50%">
              1
            </div>
            <div
              class="circle absolute bottom-90 left-0 z-10 w-45 h-45 flex justify-center items-center bg-blue text-white font-26"
              style="border-radius: 50%">
              2
            </div>
            <div class="font-30 c2cColor">
              {{ $t("登陆您下方的收款帐户，确认买家的付款已到账。") }}
            </div>
            <div class="mt-22 px-24 py-34 mainBackground rounded-2xl msg-wrapper">
              <div class="flex items-center">
                <div class="w-6 h-28 rounded-xl mr-20" style="background: #e7bb41"></div>
                <span class="ml-8 font-30 c2cColor">{{ detail.methodName }}</span>
              </div>
              <van-cell-group>
                <van-cell class="order-number " v-for="item in params" :key="item.id">
                  <template #title>
                    <div>
                      <span class="mr-14 textColor">{{ item.name }}</span>
                    </div>
                  </template>
                  <template #default>
                    <div class="flex justify-end">
                      <span class="mr-14 textColor">{{ item.value }}</span>
                    </div>
                  </template>
                </van-cell>
                <!-- <van-cell class="order-number" title="银行卡号">
                <template #default>
                  <div class="flex justify-end">
                    <span class="mr-14">{{ orderInfo.paramValue1 }}</span>
                  </div>
                </template>
              </van-cell>
              <van-cell
                class="order-number buyer"
                style="background: #f5f5f5"
                title="买家实名"
              >
                <template #default>
                  <div class="flex justify-end">
                    <span class="mr-14">{{ $t(orderInfo.realName) }}</span>
                  </div>
                </template>
              </van-cell> -->
              </van-cell-group>
            </div>
            <div class="mt-39 font-30 c2cColor">
              {{
                $t("确认收到款项后，返回平台，点击下方按钮「我已确认收款」。")
              }}
            </div>
            <div class="flex items-center mt-24">
              <img class="w-24 h-24" src="~@/assets/image/c2c/Group41-2.png" alt="" />
              <span class="ml-14 font-20 text-blue">{{
                $t("若您未收到款项，请勿点击按钮，避免资产损失。")
              }}</span>
            </div>
          </div>
        </div>
        <div class="px-32 my-34 mainBackground">
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
              <template #title>
                <span class="c2cColor font-28">{{ $t("交易条款") }}</span>
              </template>
              <van-divider />
              <p class="font-28 c2cColor pt-20">{{ $t("资金绝对安全") }}</p>
              <p class="mt-20 font-28 c2cColor">
                {{ $t("平时订单较多，看见了会立马打款。急单勿拍！") }}
              </p>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
      <div class="px-40 pt-54 pb-40 flex font-30 mainBackground">
        <van-button class="w-244 h-80 mr-16 rounded-2xl c2cColor greyBg border-none" type="primary"
          @click="$router.push({ path: '/cryptos/appeal/page' })">{{ $t("帮助") }}
        </van-button>
        <van-button class="flex-1 h-80 rounded-2xl bg-blue text-white border-none" type="primary" @click="handleClick">{{
          $t("我已确认收款")
        }}
        </van-button>
      </div>

      <!--  弹窗  -->
      <van-popup v-model:show="show" round position="bottom">
        <div class="pt-44">
          <div class="mb-42 font-600 font-32 text-center">
            {{ $t("您是否已收到款项？") }}
          </div>
          <div class="">
            <van-radio-group v-model="radio">
              <van-radio name="1" class="p-32" :class="{ active: radio === '1' }">
                <span>{{ $t("我还没登陆收款账户确认款项无误。") }}</span>
                <img class="w-40 h-40 gou" src="~@/assets/image/c2c/Group2318.png" alt="" />
                <template #icon="props">
                  <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
                </template>
              </van-radio>
              <van-radio name="2" class="p-32" :class="{ active: radio === '2' }">
                <span>{{
                  $t(
                    "我已确认收款无误，付款人与买家在DOME上的验证姓名一致，确认放行数字货币给买家。"
                  )
                }}</span>
                <img class="w-40 h-40 gou" src="~@/assets/image/c2c/Group2318.png" alt="" />
                <template #icon="props">
                  <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
                </template>
              </van-radio>
            </van-radio-group>
          </div>
          <div class="mt-52">
            <div class="flex box-border pl-24 pb-31 pr-52">
              <img class="w-36 h-36 mr-14" src="~@/assets/image/c2c/Group41.png" alt="" />
              <div class="font-24">
                <p class="font-28 textColor1">{{ $t("温馨提示") }}</p>
                <p class="my-14">
                  {{
                    $t(
                      "1.收款时，请勿盲目相信转账截图，务必打开收款账户核对款项无误。"
                    )
                  }}
                </p>
                <p class="my-20">
                  {{ $t("2.若付款仍在进行中，请等待款项到账后再放币。") }}
                </p>
                <p>
                  {{
                    $t(
                      "3.请勿接受第三方付款。若收到与APP上的验证姓名不相匹配的款项，请立即退款，并避免因放行后遭银行拒付而造成财务损失。"
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="mt-78 px-34 pb-40 flex font-30 mainBgColor">
            <van-button class="w-244 h-80 mr-16 rounded-2xl c2cColor border-none financialBut" @click="$router.push({ path: '/cryptos/appeal/page' })" type="primary">{{ $t("帮助") }}
            </van-button>
            <van-button class="flex-1 h-80 rounded-2xl bg-blue text-white border-none" type="primary"
              :disabled="radio === '1'" @click="onConfirm">{{ $t("我已确认收款") }}
            </van-button>
          </div>
        </div>
      </van-popup>
      <div v-if="isLoading" class="fixed top-0 left-0 w-full h-full loading-wrapper">
        <van-loading color="#fff" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  Badge,
  Button,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  CountDown,
  Divider,
  Icon,
  Popup,
  Radio,
  RadioGroup,
  Loading,
  Toast,
} from "vant";
import OrderNav from "@/components/Transform/order-nav/OrderNav.vue";
import Question from "@/views/cryptos/c2cOrder/payment/components/Question.vue";
import otcApi from "@/service/otc.api";

export default {
  name: "ConfirmedPaid",
  data() {
    return {
      isLoading: false,
      show: false,
      activeNames: [],
      radio: "1",
      activeIcon:  new URL('@/assets/image/c2c/Group23172.png', import.meta.url),
      inactiveIcon: new URL('@/assets/image/c2c/Group2317.png', import.meta.url),
      passwd: "",
      detail: {},
      params: [],
    };
  },
  mounted() {
    const order_no = this.$store.state.c2c.order_no;
    otcApi.ctcOrderGetDetail({ order_no, language: this.$i18n.locale }).then((res) => {
      this.detail = res;
      this.params = [{ id: 0, name: this.$t('姓名'), value: this.detail.realName }];
      for (let i = 1; i < 16; i++) {
        this.params.push({
          id: i,
          name: this.detail["paramName" + i],
          value: this.detail["paramValue" + i],
        });
      }
      this.params = this.params.filter((item) => item.name && item.value);
      console.log(this.detail);
    });
  },
  activated() {
    // const order_no = this.$store.state.c2c.order_no;
    // otcApi.ctcOrderGetDetail({ order_no, language: this.$i18n.locale }).then((res) => {
    //   this.detail = res;
    //   this.params = [{ id: 0, name: this.$t('姓名'), value: this.detail.realName }];
    //   for (let i = 1; i < 16; i++) {
    //     this.params.push({
    //       id: i,
    //       name: this.detail["paramName" + i],
    //       value: this.detail["paramValue" + i],
    //     });
    //   }
    //   this.params = this.params.filter((item) => item.name && item.value);
    //   console.log(this.detail);
    // });
    // this.$bus.$on("returnPwd", (pwd) => {
    //   this.passwd = pwd;
    //   this.enterTrade();
    // });
  },
  methods: {
    onConfirm() {
      this.$router.push({
        path: "/cryptos/withdraw/securityVerification",
        query: {
          type: "sell",
        },
      });
    },
    back() {
      this.show = false;
    },
    backRouter() {
      this.$router.push('/cryptos/wantBuy')
    },
    handleClick() {
      console.log("handle");
      this.show = true;
    },
    enterTrade() {
      // 订单放行
      otcApi.ctcOrderPass({
        order_no: this.detail.orderNo,
        safe_password: this.passwd,
      }).then((res) => {
        this.isLoading = false;
        this.$router.replace({
          path: "/cryptos/tradeSuccessSell",
        });
      });
    },
  },
  // watch: {
  //   passwd() {
  //     if (this.passwd === '000000') {
  //       console.log(111);

  //       this.isLoading = true;

  //       // 发送请求
  //       this.enterTrade();
  //     }
  //   }
  // },
  components: {
    [CountDown.name]: CountDown,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Badge.name]: Badge,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Divider.name]: Divider,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Loading.name]: Loading,
    OrderNav,
    Question,
  },
  beforeUnmount() {
    // this.$bus.$off("returnPwd");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;
  #full {
    :deep(.van-count-down) {
      font-size: 26px;
      color: $blue;
    }

    .msg-wrapper {
      .van-cell {
        margin-top: 28px;
        color: #fff;

        .van-cell__title,
        .van-cell__value {
          color: $text_color;
          font-size: 26px;
        }
      }
    }

    :deep(.van-cell-group) {
      background: $main_background;
    }

    :deep(.van-cell),
    :deep(.van-collapse-item__content) {
      background: $main_background;
      padding-top: 20px;
      padding-bottom: 20px;
    }

    :deep(.van-cell::after) {
      display: none;
    }

    :deep(.van-collapse-item__title--expanded::after) {
      display: none;
    }

    :deep(.van-collapse-item__content) {
      padding: 20px 0;
    }

    :deep(.van-radio__label) {
      position: relative;
      width: 664px;
      margin-left: 20px;
      color: $text_color1;

      .gou {
        display: none;
        position: absolute;
        top: 50%;
        right: -54px;
        transform: translateY(-50%);
      }
    }

    :deep(.loading-wrapper) {
      z-index: 20;
      background: rgba(0, 0, 0, 0.3);

      .van-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    :deep(.van-divider) {
      border-color: $line_color;
    }
  }



  .active {
    // background: #fafafa;
    background: none !important;
    border:none !important;
    .gou {
      display: block !important;
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
      height: 86%;
      background: #eaebee;
    }
  }

  .msg-wrapper {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .circle {
    transform: translateX(-50%);
  }

  .buyer {
    padding: 10px 18px !important;
    font-size: 28px;
  }

  .img-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
