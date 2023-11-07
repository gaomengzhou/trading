<template>
  <div id="cryptos">
    <div>
      <assets-head :title="$t('推广规则')" />
      <div class="advise w-828 h-220 p-40 box-border flex flex-col items-start justify-center">
        <span class="font-900 font-48" style="color:#273549;">{{ $t('分享返利') }}</span>
        <span class="w-460 mt-20 font-30 font-500" style="color:#273549;">{{ $t('交易中心会员回馈福利活动') }}</span>
      </div>
      <div class="px-32 py-30 font-bold text-grey font-30">
        {{ $t('客户发展示意如下 A>B>C>D>E （往下最多4级），B为A的一级客户，C为A的二级客户，D为A的三级客户，E为A的四级客户。返佣条件（下级客户单日单笔充值金额超过1000个USDT以上，每日只可以领取一次)')}}
      </div>
      <div class="flex flex-col px-32 mt-40 textColor" v-for="item in list" :key="item.id">
        <h2 class="font-36 font-bolds mb-10">【{{ item.title }}{{ $t('的佣金') }}】</h2>
        <ul class="flex flex-col font-30">
          <li class="py-10" v-for="_item in item.conent" :key="_item.id">
            {{ _item.from }}{{ $t('可以获得') }} {{ _item.to }} {{ $t('充值金额的') }}{{ _item.rate + '%' }}{{ $t('的佣金')
            }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import assetsHead from "@/components/Transform/assets-head/index.vue";
export default {
  components: {
    assetsHead
  },
  data() {
    return {
      list: [
        {
          id: 1, title: 'A', conent: [
            { id: 11, from: 'A', to: 'B', rate: 5 },
            { id: 12, from: 'A', to: 'C', rate: 3 },
            { id: 13, from: 'A', to: 'D', rate: 2 },
            { id: 14, from: 'A', to: 'E', rate: 1 },
          ]
        },
        {
          id: 2, title: 'B', conent: [
            { id: 21, from: 'B', to: 'C', rate: 5 },
            { id: 22, from: 'B', to: 'D', rate: 3 },
            { id: 23, from: 'B', to: 'E', rate: 2 },
            { id: 24, from: 'B', to: 'E-1', rate: 1 },
          ]
        },
        {
          id: 3, title: 'C', conent: [
            { id: 31, from: 'C', to: 'D', rate: 5 },
            { id: 32, from: 'C', to: 'E', rate: 3 },
            { id: 33, from: 'C', to: 'E-1', rate: 2 },
            { id: 34, from: 'C', to: 'E-2', rate: 1 },
          ]
        }
      ]
    }
  },
  methods: {
    onClickLeft() { // 后退
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./init.scss";

#cryptos {
  .advise {
    background: url("./share-bg.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>
