<template>
  <div id="cryptos">
    <div id="rule" class="rule">
      <assets-head :title="$t('规则')" :back-func="backFunc"></assets-head>
      <div class="box-border px-33">
        <div class="mt-54 flex font-68 items-center">
          <img src="@/assets/image/assets-center/logo.png" alt="" class="w-96 h-96 mr-40">
          <div class="font-60 textColor">{{ $t('矿机规则') }}</div>
        </div>
        <div class="font-31 font-400 mt-42 textColor">{{ $t('用户收益透明, 套餐选择灵活, 值得信赖的矿机公用平台') }}</div>

        <div class="">
          <div class="flex justify-around font-27 w-762 h-88 mt-36  items-center text-grey">
            <div class="text-center" style="width:35%;">{{ $t('矿机名称') }}</div>
            <div class="text-center" style="width:30%;">{{ $t('矿机金额') }}</div>
            <div class="text-center" style="width:15%;">{{ $t('周期') }}</div>
            <div class="text-center" style="width:20%;">{{ $t('日收益') }}</div>
          </div>
          <div class="flex justify-around w-762 h-88 items-center font-27 textColor" v-for="(item, index) in rulesList"
            :key="'rule' + index">
            <div class="text-center" style="width:35%;">{{ $i18n.locale === 'zh-CN' ? item.name : $i18n.locale === 'CN'
              ? item.name_cn : item.name_en }}</div>
            <div class="text-center break-word" style="width:30%;">{{ item.investment_min
            }}~{{ item.investment_max }}&nbsp;{{ item.buy_currency ? item.buy_currency.toUpperCase() : '--' }}</div>
            <div class="text-center" style="width:15%;">{{ item.cycle == 0 ? $t('无限期') : item.cycle }}</div>
            <div class="text-center" style="width:20%;">{{ item.symbol_profit }}{{ item.test ? ' USDT' : '%' }}</div>
          </div>
        </div>
        <div class="font-600 font-31 mt-71 lh-36 textColor text-center">{{ $t('锁仓挖矿介绍') }}</div>
        <div class="mt-21 text-grey  lh-40 font-31 font-400">{{ $t('锁仓挖矿说明', { 'TITLE': TITLE }) }}</div>
        <p class="text-grey">{{ $t('1、本产品所有锁仓日期均为挡位设定，到期自动解锁，无法人为干预。') }}</p>
        <p class="text-grey">{{ $t('2、锁仓期间用户将无法对挖矿账户中被锁定的数字货币进行交易等操作，投资期限结束后一次性返还本金。') }}</p>
        <p class="text-grey">{{ $t('3、矿机购买满24小时之后每日凌晨4点收益将直接发放至账户，可进行交易等操作。去挖矿') }}</p>
        <div class="font-600 font-31 mt-71 mb-30 lh-36 textColor text-center">{{ $t('推广邀请奖励') }}</div>
        <div class="text-grey lightGreybg px-20 py-30">
          {{ $t('推荐用户可享受多重收益，推荐多多，礼遇多多;要保证上级的矿机等级大于或等于下级的矿机才有返佣') }}
        </div>
        <div>
          <div class="flex justify-around font-27 w-762 mt-36 darkGreybg items-center textColor">
            <div class="text-center py-15" style="width:33%;">{{ $t('推荐用户') }}</div>
            <div class="text-center py-15" style="width:33%;">{{ $t('矿机收益奖励') }}</div>
            <div class="text-center py-15" style="width:33%;">{{ $t('首次矿机认购奖励') }}</div>
          </div>
          <div class="flex justify-around w-762 items-center font-27 textColor lightGreybg"
            v-for="(item, index) in promoteList" :key="'promote' + index">
            <div class="text-center py-15" style="width:33%;">{{ $t(item.recommended) }}</div>
            <div class="text-center py-15" style="width:33%;">{{ item.mining_reward }}</div>
            <div class="text-center py-15" style="width:33%;">{{ item.first_reward }}</div>
          </div>
        </div>
        <div class="btnMain h-90 lh-90 text-center rounded-lg font-32 mt-50 textColor" @click="$router.go(-1)">{{
          $t('去挖矿')
        }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import assetsHead from '@/components/Transform/assets-head/index.vue';
import { getMachineList } from "@/service/financialManagement.api.js";
export default {
  name: "MachineRule",
  components: {
    assetsHead
  },
  methods: {
    backFunc() {
      console.log('this.$route.query.back', this.$route.query.back)
      if (this.$route.query.back / 1 === 0) {
        this.$router.push({
          path: '/cryptos/funds', query: {
            tab: 3,
            index: 1,
            type: 'cryptos'
          }
        })
      } else {
        this.$router.go(-1)
      }
    },
  },
  created() {
    getMachineList().then(res => {
      //console.log('矿机列表', res)
      this.rulesList = res
    })
  },
  data() {
    return {
      rulesList: [
      ],
      promoteList: [
        {
          recommended: '一级用户',
          mining_reward: '20%',
          first_reward: '5%',
        },
        {
          recommended: '二级用户',
          mining_reward: '10%',
          first_reward: '3%',
        },
        {
          recommended: '三级用户',
          mining_reward: '5%',
          first_reward: '1%',
        },
      ],
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;
  .rule {
    width: 100%;
    box-sizing: border-box;
  }

  .break-word {
    word-break: break-word;
  }
}
</style>
