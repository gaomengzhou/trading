<template>
  <div id="cryptos">
    <div id="c2cHelpCenter w-full h-full box-border" class="c2cHelpCenter">
      <div class="w-full h-full top ">
        <order-nav />
        <div class="mt-45 text-white ml-32 font-48 font-600">{{ $t('c2c帮助中心') }}</div>
        <div class="font-24 text-white ml-32 mt-16 mb-42">{{ $t('7/24小时全球客服，随时随地为你提供服务') }}</div>
      </div>
      <div class=" col ">
        <div class="w-full box-radius bg-white h-full py-30 ">
          <van-tabs v-model:active="active">
            <van-tab :title="$t('新手')"></van-tab>
            <van-tab :title="$t('进阶')"></van-tab>
            <van-tab :title="$t('广告方')"></van-tab>
          </van-tabs>
          <div v-if="active === 0">
            <div class="px-32 ">
              <div>
                <div class="relative mt-40 mb-10">
                  <img class=" w-full h-160 rounded-lg " src="@/assets/image/c2cHelpCenter/p1.png" alt="">
                  <div class="text-white font-44 font-900 absolute left-28  w">{{ $t('c2c交易') }}</div>
                </div>
                <div class="font-500 font-28">{{ $t('什么是c2c交易？') }}</div>
              </div>
              <div>
                <div class="relative mt-40 mb-10">
                  <img class=" w-full h-160 rounded-lg " src="@/assets/image/c2cHelpCenter/p2.png" alt="">
                  <div class="text-white font-44 font-900 absolute left-28 w">{{ $t('购买数字货币') }}</div>
                </div>
                <div class="font-500 font-28">{{ $t('如何购买数字货币？') }}</div>
              </div>
              <div>
                <div class="relative mt-40 mb-10">
                  <img class="relative w-full h-160 rounded-lg mt-40 mb-22" src="@/assets/image/c2cHelpCenter/p3.png"
                    alt="">
                  <div class="text-white font-44 font-900 absolute left-28 w">{{ $t('出售数字货币') }}</div>
                </div>
                <div class="font-500 font-28">{{ $t('如何出售数字货币？') }}</div>
              </div>
              <div>
                <div class="relative mt-40 mb-10">
                  <img class="relative w-full h-160 rounded-lg " src="@/assets/image/c2cHelpCenter/p4.png" alt="">
                  <div class="text-white font-44 font-900 absolute left-28 w">{{ $t('交易如何付款') }}</div>
                </div>
                <div class="font-500 font-28">{{ $t('c2c交易如何付款？') }}</div>
              </div>
              <div class="relative mt-40 mb-10">
                <div>
                  <img class="relative w-full h-160 rounded-lg " src="@/assets/image/c2cHelpCenter/p5.png" alt="">
                  <div class="text-white font-44 font-900 absolute left-28  w">{{ $t('避免资产损失') }}</div>
                </div>
                <div class="font-500 font-28">{{ $t('c2c交易避免资产损失？') }}</div>
              </div>
            </div>
            <div class="text-black font-600 font-48 mt-66 mb-16 px-32">{{ $t('常见问题') }}</div>
            <div class="px-32">
              <div class="flex justify-between mt-28 pb-28 border-b-grey" v-for="(item, index) in quetionList"
                :key="'que' + index" @click="$router.push({
                  path: item.path,
                  query: { ...item.query }
                })">
                <div class="">{{ item.title }}</div>
                <van-icon class="text-grey" name="arrow" />
              </div>
            </div>
          </div>
          <div v-if="active === 1" class=" px-32 border-none">
            <div class=" font-600 font-48 mt-52 mb-40">{{ $t('常见问题') }}</div>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue">
              <van-swipe-item>
                <div class="font-600 font-36 mb-16 ">{{ $t('短信诈骗') }}</div>
                <div class="font-28 mb-30">{{ $t('买家发送假的的到账短信给卖家，卖家未打开收款账户核对就放币。') }}</div>
                <img class="w-full" src="@/assets/image/c2cHelpCenter/swipe1.png" alt="">
              </van-swipe-item>
              <van-swipe-item>
                <div class="font-600 font-36 mb-16 ">{{ $t('p图诈骗') }}</div>
                <div class="font-28 mb-30">{{ $t('买家PS假的付款证明发送给卖家，卖家未打开收款账户核对就放币。') }}</div>
                <img class="w-full" src="@/assets/image/c2cHelpCenter/swipe2.png" alt="">
              </van-swipe-item>
              <van-swipe-item>
                <div class="font-600 font-36 mb-16 ">{{ $t('伪装客服诈骗') }}</div>
                <div class="font-28 mb-30">{{ $t('买家发送假的的到账短信给卖家，卖家未打开收款账户核对就放币。') }}</div>
                <img class="w-full" src="@/assets/image/c2cHelpCenter/swipe3.png" alt="">
              </van-swipe-item>
            </van-swipe>
            <div class=" font-600 font-48 mt-48 mb-40">{{ $t('防冻卡指南') }}</div>
            <div class=" font-600 font-36  mb-16">{{ $t('预防冻卡') }}</div>
            <li class="font-28 mb-16">
              {{ $t('转账时，请勿备注敏感信息，如数字货币、比特币、BTC、USDT、ETH等。') }}
            </li>
            <li class="font-28 mb-40">
              {{ $t(' 当您有频繁出售数字货币的恶需求时，不要仅使用一张银行卡，可以多准备多张卡轮换使用。') }}
            </li>
            <div class=" font-600 font-36  mb-16">{{ $t('处理措施') }}</div>
            <li class="font-28 mb-16">
              {{
                $t('如果您的银行卡被冻结，请直接联系您的开户银行，按照银行的要求提供您的相关信息（一般是解释资金往来的原因）即可。')
              }}
            </li>
            <div class="text-black font-600 font-48 mt-66 mb-16 ">{{ $t('常见问题') }}</div>
            <div class="">
              <div class="flex justify-between mt-28 pb-28 border-b-grey" v-for="(item, index) in advanced_questions"
                :key="'que' + index" @click="$router.push({
                  path: item.path,
                  query: { ...item.query }
                })">
                <div class="">{{ item.title }}</div>
                <van-icon class="text-grey" name="arrow" />
              </div>
            </div>
          </div>
          <div v-if="active === 2" class=" px-32 border-none">
            <img class="w-full mt-52 mb-22" src="@/assets/image/c2cHelpCenter/ad1.png" alt="">
            <!-- <div class="font-500 font-28">{{ $t('如何发布广告') }}</div>
          <img class="w-full mt-52 " src="@/assets/image/c2cHelpCenter/ad2.png" alt=""> -->
            <div class="px-22 py-30 bg1 h-260">
              <div class="text-white font-400 font-28">
                {{ $t('广告方专业版-接单模式适用于有广告发布需求的用户。您可以在接单模式发布和编辑广告和管理订单。') }}
              </div>
              <div class="mt-46 flex  items-center justify-center ">
                <div class="flex flex-col  flex-1  items-center">
                  <img class="mb-16 w-64 h-64 lh-64 " src="@/assets/image/c2cHelpCenter/ad_icon1.png" alt="">
                  <span class="font-28 font-400 text-white">{{ $t('发布广告') }}</span>
                </div>
                <div class="flex flex-col flex-1 items-center ">
                  <img class="mb-16 w-64 h-64 " src="@/assets/image/c2cHelpCenter/ad_icon2.png" alt="">
                  <span class="font-28 font-400 text-white">{{ $t('编辑广告') }}</span>
                </div>
                <div class="flex flex-col flex-1 items-center">
                  <img class="mb-16 w-64 h-64 " src="@/assets/image/c2cHelpCenter/ad_icon3.png" alt="">
                  <span class="font-28 font-400 text-white">{{ $t('发布广告') }}</span>
                </div>
              </div>
            </div>
            <div class="bg2 py-30 px-22">
              <div class="font-28 font-400">{{ $t('您可以在C2C交易首页更多设置【...】中进行模式切换') }}</div>
            </div>
            <div class="text-black font-600 font-48 mt-66 mb-16 ">{{ $t('常见问题') }}</div>
            <div class="">
              <div class="flex justify-between mt-28 pb-28 border-b-grey" v-for="(item, index) in ad_questions"
                :key="'que' + index" @click="$router.push({
                  path: item.path,
                  query: { ...item.query }
                })">
                <div class="">{{ item.title }}</div>
                <van-icon class="text-grey" name="arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from "vuex";
import otcApi from "@/service/otc.api";

import OrderNav from "@/components/Transform/order-nav/OrderNav.vue";
import { Tab, Tabs, Icon, Swipe, SwipeItem } from 'vant';

export default {
  name: "c2cHelpCenter",
  data() {
    return {
      active: 0,
      quetionList: [],
      advanced_questions: [],
      ad_questions: [],
    };
  },
  created() {
    this.getHelpCenterNew();
    this.getHelpCenterAdvanced();
    this.getHelpCenterAd();
  },
  methods: {
    getHelpCenter(context, params) {

      otcApi.getC2cHelpCenter(params).then(res => {
        this[context] = this.handlerData(res);
      })
    },
    // 新手
    getHelpCenterNew() {

      const params = {
        language: this.language,
        model: 'c2c_help_center_newbie'
      }
      this.getHelpCenter('quetionList', params)
    },
    // 进阶
    getHelpCenterAdvanced() {

      const params = {
        language: this.language,
        model: 'c2c_help_center_advanced'
      }
      this.getHelpCenter('advanced_questions', params)
    },
    // 广告方
    getHelpCenterAd() {
      const params = {
        language: this.language,
        model: 'c2c_help_center_advertiser'
      }
      this.getHelpCenter('ad_questions', params)
    },
    handlerData(data) {
      const arr = [];
      data.forEach((item) => {
        arr.push({
          title: item.title,
          path: '/c2cTransactionAnswer',
          query: {
            content_code: item.content_code
          }
        })
      })

      return arr;
    }
  },
  computed: {
    ...mapState('language', ['language'])
  },
  components: {
    OrderNav,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;

  .c2cHelpCenter {
    width: 100%;
    box-sizing: border-box;

    :deep(.van-nav-bar) {
      background: #1D91FF;

      .van-icon {
        color: #fff;
      }
    }
  }

  .top {
    height: 300px;
    background: #1D91FF;
  }

  .ov_flow {
    overflow-y: auto;
  }

  .box-radius {
    border-radius: 40px 40px 0 0;
  }

  .col {
    background: #1D91FF;
  }

  .w {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .bg1 {
    background: #404244;
  }

  .bg2 {
    background: #36393D;
    color: #8F99A8;
  }
}
</style>
