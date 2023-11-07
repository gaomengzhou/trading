<template>
  <div id="cryptos">
    <div class="fundHome">
      <assets-head :title="$t('基金理财')"></assets-head>
      <div class="box-border px-30 mt-42">
        <div class="flex justify-between text-grey relative">
          <div class="flex flex-col">
            <span class="text-grey font-30">{{ $t('托管金额') }}（USDT）</span>
            <span class="font-66 mt-20 font-700 textColor">{{ statiscis.amount_sum }}</span>
          </div>
        </div>
        <div class="flex mt-44 justify-between font-26 lh-32 mb-35">
          <div class="flex flex-col ">
            <div class="text-grey font-26">{{ $t('预计日收益') }}（USDT）</div>
            <div class="font-40 mt-17 mb-9  font-36 textColor">{{ statiscis.today_profit }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-grey font-26">{{ $t('累计收益') }}（USDT）</div>
            <div class="font-40 mt-17 mb-9 font-36 textColor">{{ statiscis.aready_profit }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-grey font-26">{{ $t('托管订单') }}（USDT）</div>
            <div class="font-40 mt-17 mb-9 font-36 textColor">{{ statiscis.order_sum }}</div>
          </div>
        </div>
      </div>
      <div class="flex justify-between box-border px-30 mt-43">
        <div @click="$router.push('/cryptos/funds?tab=3&index=0&type=cryptos')"
          class="greyBg textColor w-370 h-75 lh-75 rounded-lg font-27 text-center font-28 mr-20 active">{{ $t('托管订单') }}</div>
        <div @click="$router.push('/cryptos/fund-rule')"
          class="greyBg text-grey w-370 h-75 lh-75 rounded-lg font-27 text-center font-28">
          {{ $t('规则') }}</div>
      </div>
      <div class="px-30 mt-40 pb-80">
        <div v-for="(item, index) in list" :key="index"
          class="card flex justify-between items-center relative rounded-lg borderColor financialBackground ">
          <div class="title absolute px-16 py-8 font-26 text-white bg-green top-0 left-22">{{ $t('日收益率')
          }} <span class="ml-8">{{ item.daily_rate }}%</span></div>
          <div class="flex justify-center items-center">
            <img class="w-120 h-120 mr-20" :src="item.img" alt="">
            <div class="flex flex-col items-start">
              <span class="font-35 font-600 textColor">
                <template v-if="$i18n.locale === 'CN'">
                  {{ item.name_cn }}
                </template>
                <template v-else-if="$i18n.locale === 'zh-CN'">
                  {{ item.name }}
                </template>
                <template v-else>
                  {{ item.name_en }}
                </template>
              </span>
              <span class="font-26 mt-24 mb-16 textColor">{{ $t('限额') }} {{ item.investment_min + ' ~ ' +
                item.investment_max }}
                USDT</span>
              <span class="font-26 textColor">{{ $t('周期') }} {{ item.cycle }} {{ $t('天') }}</span>
            </div>
          </div>
          <div @click="$router.push({
            path: '/cryptos/fund-buy',
            query: {
              ...item
            }
          })" class="active py-16 px-30 font-30 font-600 rounded-lg">{{ $t('立即买入') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import assetsHead from '@/components/Transform/assets-head/index.vue';
import { financeStatics, getfinacialProductsList } from "@/service/financialManagement.api.js";

export default {
  name: "fundHome",
  components: {
    assetsHead,
  },
  data() {
    return {
      statiscis: {},
      list: []
    }
  },
  methods: {
  },
  activated() {
    getfinacialProductsList().then(res => {
      //console.log('理财列表', res)
      this.list = res
    })
    financeStatics().then(res => {
      //console.log('理财统计', res)
      this.statiscis = res
    })
  },
  created() {
    getfinacialProductsList().then(res => {
      //console.log('理财列表',res)
      this.list = res
    })
    financeStatics().then(res => {
      //console.log('理财统计',res)
      this.statiscis = res
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/init.scss";

#cryptos {

  .fundHome {
    width: 100%;
    box-sizing: border-box;
  }

  .active {
    color: $text_color;

    // @include themify() {
    //   background: themed("btn_main") !important;
    // }

    // @include themify() {
    //   border-color: themed("btn_main") !important;
    // }

  }

  .title {
    border-radius: 0 0 8px 8px;
  }

  .card {
    padding: 80px 22px 22px 22px;
    margin-bottom: 32px;
  }
}
</style>
