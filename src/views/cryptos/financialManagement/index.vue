<template>
  <div id="cryptos">
    <div class="financialManagement">
      <assets-head title="" :goHome="true" />
      <div class="px-32 mt-20">
        <div class="font-700 font-53 textColor">{{ $t('理财') }}</div>
        <div class="mt-20 font-26 textColor">{{ $t('简单、安全搜索热门币种、立即赚取收益') }}</div>
        <div class="mt-64 mb-32 font-600 font-40 textColor">{{ $t('高收益型') }}</div>
        <div @click="$router.push('/cryptos/fund')" class="pt financial financial-bg flex justify-between items-center">
          <div class="flex flex-col items-start">
            <span class="font-53 font-700 mb-22">{{ $t('基金理财') }}</span>
            <span class="font-26">{{ $t('稳健增值,周期灵活') }}</span>
            <span class="mt-10 font-28">{{ $t('安心理财') }}</span>
          </div>
          <img class="w-290 h-240" src="./images/f-bg.png" alt="">
        </div>
        <div @click="$router.push('/cryptos/machine')"
          class="financial pool-lock-bg mt-32 flex justify-between items-center">
          <div class="flex flex-col items-start">
            <span class="font-53 font-700 mb-22">{{ $t('智能矿池') }}</span>
            <span class="font-26">{{ $t('真实矿机租赁，套餐选择灵活') }}</span>
            <span class="mt-10 font-28">{{ $t('值得信赖的矿机共享平台') }}</span>
          </div>
          <img class="w-290 h-240" src="./images/l-bg.png" alt="">
        </div>
        <!-- <div @click="$router.push('/cryptos/pledgeLoan')"
          class="financial pool-lock-bg mt-32 flex justify-between items-center">
          <div class="flex flex-col items-start">
            <span class="font-53 font-700 mb-22">{{ $t('质押借币') }}</span>
            <span class="font-26">{{ $t('随时还款、按小时计息') }}</span>
            <span class="mt-10 font-28">{{ $t('无需手续费') }}</span>
          </div>
          <img class="w-290 h-240" src="./images/p-bg.png" alt="">
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import assetsHead from '@/components/Transform/assets-head/index.vue';
export default {
  name: "financialManagement",
  components: {
    assetsHead,
  },
}
</script>

<style lang="scss">
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;

  .financial {
    color: $black;
  }

  .financialManagement {
    width: 100%;
    box-sizing: border-box;
  }

  .financial-bg {
    background: url("./images/bg.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 12px;
    padding: 30px 0 30px 32px;
  }

  .pool-lock-bg {
    background: url("./images/lock-bg.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 12px;
    padding: 30px 0 30px 32px;
  }

  .pledge-loan-bg {
    background: url("./images/pl-bg.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 12px;
    padding: 30px 0 30px 32px;
  }
}
</style>
