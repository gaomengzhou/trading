<template>
  <div id="cryptos">
    <div id="full" class="cancel-success">
      <div >
        <order-nav :back="false" @back="onBack()">
          <template>
            <div class="flex items-center" @click="$router.push({
              path: '/cryptos/chat'
            })">
              <img class="w-35 h-33 mr-22" src="~@/assets/image/c2c/Vector.png" alt="">
              <span class="font-28">{{ $t('联系卖家') }}</span>
            </div>
          </template>
        </order-nav>
        <div class="">
          <div class="flex justify-between items-center pb-33 px-32">
            <div>
              <p class="mb-8 font-48">
                <slot name="title">{{ $t('已取消') }}</slot>
              </p>
              <p class="font-24">
                <slot name="desc">{{ $t('您已取消订单') }}</slot>
              </p>
            </div>
            <div>
              <img class="w-80 h-80" src="~@/assets/image/c2c/Group1212.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="px-32 pt-40 mainBackground">
        <order-data :detail="detail" />
      </div>
      <div class="w-full h-16 my-40 diviLine"></div>
      <van-cell-group class="">
        <van-cell @click="enterAppeal">
          <template #title>
            <span class="c2cColor font-30">{{ $t('对订单存在疑问') }}</span>
          </template>
          <template #default>
            <van-icon class="font-700 text-grey" name="arrow" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon } from 'vant';
import OrderNav from "@/components/Transform/order-nav/OrderNav.vue";
import OrderData from "@/views/cryptos/c2cOrder/components/order-data/OrderData.vue";

export default {
  name: "CancelSuccess",
  // props:['title','count', 'totalPrice', 'orderNumber', 'createOrderTime', 'sellerName', 'unitPrice'],
  props: {
    detail: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    enterAppeal() {
      this.$router.replace({
        path: '/cryptos/appeal'
      })
    },
    onBack() {
      this.$router.push('/cryptos/wantBuy')
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    OrderNav,
    OrderData,
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  font-size: 30px;

  #full {

    :deep(.buy_nav) {
      .van-icon {
        color: #000;
      }
    }


    :deep(.order-number) {
      margin-top: 100px;
    }

    :deep(.van-cell) {
      padding: 15px 20px !important;
      background: $main_background;
    }

    :deep(.van-cell-group) {
      .van-cell {
        color: $text_color1;
        background: $main_background;
      }

      .van-cell__value {
        color: $text_color;
      }
    }
  }
}</style>
