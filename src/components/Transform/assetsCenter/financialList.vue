<template>
  <div id="cryptos">
    <div class="w-762  mt-37 box-border px-22 py-34 rounded-lg fina-border  financialBackground" v-for="(item, index) in list"
      :key="index">
      <div class="flex justify-between" @click="handleGoOrderDetail(item)">
        <div class="flex ">
          <img v-if="type == 0" :src="item.img ? item.img : fund5Img" alt="" class="w-154 h-154 mr-35" />
          <img v-else :src="item.img ? item.img : machine_fpgaImg" alt="" class="w-154 h-154 mr-35" />
          <div>
            <div class="font-26 font-700 font-6 textColor" v-if="type == 0">
              {{ $i18n.locale === 'CN' ? item.financeName_cn : $i18n.locale === 'zh-CN' ? item.financeName :
                item.financeName_en }}
            </div>
            <div class="font-26 font-700 font-6 textColor" v-else>
              {{ $i18n.locale === 'CN' ? item.miner_name_cn : $i18n.locale === 'zh-CN' ? item.miner_name :
                item.miner_name_en }}
            </div>
            <!-- <div v-if="tapIndex === 1" class="font-35 font-6">体验矿机3天</div> -->
            <div class="font-26 font-4 cl-33 mt-25 mb-16 textColor1">{{ $t('数量') }}
              <span class="ml-10 mr-10 textColor">{{ item.amount }}</span>{{ item.buyCurrency ?
                item.buyCurrency.toUpperCase() : 'USDT' }}
            </div>
            <div class="font-26 font-4 cl-33 textColor1">{{ $t('周期') }}&nbsp;<span class="textColor">{{ item.cycle == 0 ?
              $t('无限期') : item.cycle + $t('天') }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-center align-center text-center h-152 lh-152">
          <div class="mr-24 flex flex-col justify-center items-center">
            <span class="h-52 lh-52 font-44" :class="item.profit / 1 >= 0 ? 'text-green' : 'text-red'">{{ (item.profit /
              1).toFixed(2) }}</span>
            <span class="w-162 h-32 lh-32 font-26 mt-16 textColor">{{ $t('累计收益') }}({{ item.outputCurrency ?
              item.outputCurrency.toUpperCase() : 'USDT' }})</span>
          </div>
          <div class="h-152 lh-152">
            <van-icon class="textColor" name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  name: "financialList",
  props: ['list', 'btnShow', 'goBack', 'type'], // orderShow 点击跳转到订单详情的时候是否展示赎回按钮,goBack表示订单详情返回一层
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      fund5Img: new URL('@/assets/image/fund5.png', import.meta.url),
      machine_fpgaImg: new URL('@/assets/image/machine_fpga.png', import.meta.url),
    }
  },
  mounted() {
    console.log(this.type)
  },
  methods: {
    handleGoOrderDetail(item) {

      if (this.type === 0) {
        this.$router.push({
          path: '/cryptos/financialOrder',
          query: {
            order_no: item.order_no,
            showBtn: this.btnShow,
            id: item.uuid,
            goBack: true
          }
        })
      } else {
        this.$router.push({
          path: '/cryptos/miningMachineOrder',
          query: {
            order_no: item.order_no,
            showBtn: this.btnShow,
            goBack: true
          }
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;
}</style>
