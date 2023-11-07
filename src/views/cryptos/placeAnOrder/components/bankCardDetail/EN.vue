<template>
  <div id="cryptos">
    <div class="addBank">
      <order-nav class="mb-56">
        <template #title>
          {{ $t('添加 Al-Rafidain QiServices') }}
        </template>
      </order-nav>
      <div class="content pr-32 pl-32">
        <div class="payment-input-wrapper">
          <div class="label font-28 mb-18 textColor2">
            Name
          </div>
          <div class="payment-input w-full">
            <van-field v-model="info.name" placeholder="James" />
          </div>
        </div>
        <div class="payment-input-wrapper">
          <div class="label font-28 mb-18 textColor2">
            Phone Number
          </div>
          <div class="payment-input w-full">
            <van-field v-model="info.phone" placeholder="Phone Number" />
          </div>
        </div>
        <div class="payment-input-wrapper">
          <div class="label font-28 mb-18 textColor2">
            Bank Account Number
          </div>
          <div class="payment-input w-full">
            <van-field v-model="info.bankNumber" placeholder="Bank Account Number" />
          </div>
        </div>
        <div class="payment-input-wrapper">
          <div class="label font-28 mb-18 textColor2">
            {{ $t('Note（选填）') }}
          </div>
          <div class="payment-input w-full">
            <van-field class="textarea" type="textarea" rows="5" v-model="info.desc" placeholder="Note" />
          </div>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 w-full pl-32 pr-32 pb-72 box-border">
        <div class="font-24 mb-24" :style="{ 'color': '#868D9A' }">
          {{ $t('温馨提示：当您出售数字货币时，您选择的收款方式将向买方展示，请确认信息填写准确无误。') }}
        </div>
        <van-button v-show="disabled" class="w-full" type="info" @click="save">{{ $t('保存') }}
        </van-button>
        <van-button v-show="!disabled" disabled color="#EAEBEE" class="w-full">{{ $t('保存') }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, showToast, } from 'vant';

import OrderNav from "@/components/Transform/order-nav/OrderNav.vue";

export default {
  name: "CN",
  props: ["data"], // query传参
  data() {
    return {
      disabled: "",
      info: {
        name: "", // 姓名
        number: "", // 银行卡号
        phone: "",
        desc: "", // 支行
      }
    }
  },
  created() {
    console.log(this.data);
    if (this.data) {
      this.info.name = this.data.name;
      this.info.phone = this.data.phone;
      this.info.number = this.data.number;
      this.info.desc = this.data.desc;
    }
  },
  methods: {
    save() {
      showToast(this.$t("保存"))
    }
  },
  computed: {
    bankNumber: {
      get() {
        return this.info.number && this.info.number.replace(/(\d{4})/g, '$1 ').trim()
      },
      set(newVal) {
        this.info.number = newVal;
      }
    },
  },
  components: {
    [Button.name]: Button,
    OrderNav
  },
  watch: {
    // 是否存在空值
    info: {
      deep: true,
      handler() {
        const res = Object.keys(this.info).filter(key => this.info[key] === "" || this.info[key] === undefined)

        this.disabled = res.length === 0;
        console.log(this.disabled)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  .addBank {
    width: 100%;
    box-sizing: border-box;
  }

  :deep(.payment-input-wrapper) {
    margin-bottom: 60px;

    input {
      height: 100px;
    }
  }

  .desc {
    width: 100%;
    padding: 46px 24px;
    border-radius: 8px;
    background: #F0F1F4;
  }

  :deep(.van-field) {
    background: $input_background;
    padding-left: 20px;
    border-radius: 10px;

    .van-field__control {
      color: $c2c_color;
    }
  }

  .textarea {
    padding: 30px !important;
  }
}</style>