<template>
  <div class="box-border">
    <div class="pl-33 pr-33 total_wrap">
      <div class="flex justify-between text-grey relative">
        <div class="flex items-center">
          <span class="text-grey font-30">{{ $t("总资产") }}（USDT）</span>
          <div @click.stop="changeEyes">
            <img src="../../../assets/image/assets-center/eye-open.png" class="w-32 h-18" v-show="!eyetel" />
            <img src="../../../assets/image/assets-center/eye-close.png" class="w-32 h-18" v-show="eyetel" />
          </div>
        </div>
        <div class="right-clock" @click="goRouter('/cryptos/exchangeHistory')">
          <img src="../../../assets/image/assets-center/Subtract.png" class="subtract-icon" />
        </div>
      </div>
      <div class="font-700 font-66 mt-18 textColor" v-if="!eyetel">
        {{ funds.money_all_coin || "--" }}
        <span class="font-40 text-grey">≈{{ currency.currency_symbol
        }}{{
  funds.money_all_coin
  ? Number(funds.money_all_coin * currency.rate).toFixed(2)
  : " --"
}}</span>
      </div>
      <div class="font-70 font-66 mt-18 textColor" v-else>********</div>
    </div>
    <div class="pl-33 pr-33 btn-box flex justify-between">
      <div class="font-25 textColor tabBackground" @click="goRouter('/cryptos/recharge/rechargeList')">
        <div class="word-wrap">
          <img :src="handleImage(rechargeIcon)" alt="" />
          <span> {{ $t("充币") }}</span>
        </div>
      </div>
      <div class="font-25 textColor tabBackground" @click="withdrawBtn">
        <div class="word-wrap">
          <img :src="handleImage(withdrawIcon)" alt="" />
          <span>{{ $t("提币") }}</span>
        </div>
      </div>
      <div class="font-25 textColor tabBackground" @click="goRouter('/cryptos/exchangePage')">
        <div class="word-wrap">
          <img :src="handleImage(lrIcon)" alt="" />
          <span>{{ $t("闪兑") }}</span>
        </div>
      </div>
    </div>
    <!--       <div class="divider-line"></div>-->
    <div class="pl-30 pr-30">
      <div class="assets-content-title font-35 titleColor">
        {{ $t("投资组合") }}
      </div>
      <div class="assets-list font-30" v-for="(item, index) in list" :key="index">
        <div class="flex justify-between">
          <div class="flex items-center">
            <img :src="item.symbol
              ? `${HOST_URL}/symbol/${item.symbol_data}.png`
              : handleImage('../../../assets/loading-default.png')
              " class="w-72 h-72 rounded-full" />
            <div class="text-grey symbol-name font-30 textColor2">
              {{ item.symbol.toUpperCase() }}/USDT
            </div>
          </div>
          <div class="flex-col font-30 text-right" v-if="!eyetel">
            <div class="textColor" v-if="item.symbol == 'btc'">
              {{ item.volume ? Number(item.volume).toFixed(8) : "0.0" }}
            </div>
            <div class="textColor" v-else-if="item.symbol == 'eth'">
              {{ item.volume ? Number(item.volume).toFixed(8) : "0.0" }}
            </div>
            <div class="textColor" v-else-if="item.symbol == 'usdt'">
              {{ item.volume ? Number(item.volume).toFixed(2) : "0.0" }}
            </div>
            <div class="textColor" v-else>
              {{ item.volume ? Number(item.volume).toFixed(8) : "0.0" }}
            </div>
            <div class="text-grey font-30 font-400 mb-0">
              ≈{{ currency.currency_symbol }}
              {{ item.usdt ? Number(item.usdt).toFixed(2) : "0.0" }}
            </div>
          </div>
          <div class="flex-col font-30 text-right" v-else>
            <div class="textColor">******** USDT</div>
            <div class="text-grey">≈{{ currency.currency_symbol }} ********</div>
          </div>
        </div>
        <div class="flex justify-between mt-40 pl-14">
          <div class="flex-col font-30" v-if="!eyetel">
            <div class="text-grey">{{ $t("可用") }}</div>
            <div class="textColor" v-if="item.symbol == 'btc'">
              {{ item.usable ? Number(item.usable).toFixed(8) : "0.0" }}
            </div>
            <div class="textColor" v-else-if="item.symbol == 'eth'">
              {{ item.usable ? Number(item.usable).toFixed(8) : "0.0" }}
            </div>
            <div class="textColor" v-else-if="item.symbol == 'usdt'">
              {{ item.usable ? Number(item.usable).toFixed(2) : "0.0" }}
            </div>
            <div class="textColor" v-else>
              {{ item.usable ? Number(item.usable).toFixed(8) : "0.0" }}
            </div>
          </div>
          <div class="flex-col font-30" v-else>
            <div class="text-grey">{{ $t("可用") }}</div>
            <div class="textColor">{{ currency.currency_symbol }} ********</div>
          </div>

          <div class="flex-col font-30" v-if="!eyetel">
            <div class="text-grey">{{ $t("锁仓") }}</div>
            <div class="textColor" v-if="item.symbol === 'btc'">
              {{ item.lock_amount ? Number(item.lock_amount).toFixed(8) : "0.0" }}
            </div>
            <div class="textColor" v-else-if="item.symbol === 'eth'">
              {{ item.lock_amount ? Number(item.lock_amount).toFixed(8) : "0.0" }}
            </div>
            <div class="textColor" v-else-if="item.symbol == 'usdt'">
              {{ item.lock_amount ? Number(item.lock_amount).toFixed(2) : "0.0" }}
            </div>
            <div class="textColor" v-else>
              {{ item.lock_amount ? Number(item.lock_amount).toFixed(8) : "0.0" }}
            </div>
          </div>
          <div class="flex-col font-30" v-else>
            <div class="text-grey">{{ $t("锁仓") }}</div>
            <div class="textColor">{{ currency.currency_symbol }} ********</div>
          </div>

          <div class="flex-col font-30 text-right" v-if="!eyetel">
            <div class="text-grey">{{ $t("冻结") }}</div>
            <div class="textColor" v-if="item.symbol == 'btc'">
              {{ Number(item.frozenAmount + item.freeze_amount).toFixed(8) || "0.0" }}
            </div>
            <div class="textColor" v-else-if="item.symbol == 'eth'">
              {{ Number(item.frozenAmount + item.freeze_amount).toFixed(8) || "0.0" }}
            </div>
            <div class="textColor" v-else-if="item.symbol == 'usdt'">
              {{ Number(item.frozenAmount + item.freeze_amount).toFixed(2) || "0.0" }}
            </div>
            <div class="textColor" v-else>
              {{ Number(item.frozenAmount + item.freeze_amount).toFixed(8) || "0.0" }}
            </div>
          </div>
          <div class="flex-col font-30 text-right" v-else>
            <div class="text-grey">{{ $t("冻结") }}</div>
            <div class="textColor">{{ currency.currency_symbol }} ********</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getAllWallet } from "@/service/fund.api";
import { Dialog } from "vant";
import { mapGetters } from "vuex";
import { HOST_URL } from "@/config";
import { themeStore } from "@/store/theme";
const thStore = themeStore();
const THEME = thStore.theme;
export default {
  name: "Assets",
  components: {
    [Dialog.name]: Dialog,
  },
  props: ["funds", "tab"],
  computed: {
    ...mapGetters("home", ["currency"]),
  },
  data() {
    return {
      THEME,
      HOST_URL,
      list: [],
      total: "",
      status: "", //身份认证状态 0已申请未审核，1审核中，2审核通过，3审核未通过
      eyetel: false,
      active: 0,
      rechargeIcon: new URL(
        `../../../assets/theme/${thStore.theme}/image/assets/up.png`,
        import.meta.url
      ),
      withdrawIcon: new URL(
        `../../../assets/theme/${thStore.theme}/image/assets/down.png`,
        import.meta.url
      ),
      lrIcon: new URL(
        `../../../assets/theme/${thStore.theme}/image/assets/l_r.png`,
        import.meta.url
      ),
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleImage(url) {
      return new URL(url, import.meta.url).href;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    goRouter(path) {
      if (path === "/cryptos/exchangeHistory") {
        this.$router.push({ path, query: { type: 1, tab: this.tab } });
      } else {
        this.$router.push(path);
      }
    },
    compare(p, type) {
      //这是比较函数
      return function (m, n) {
        var a = m[p];
        var b = n[p];
        if (a == b) {
          return;
        }
        if (type == "up") {
          return b - a; //升序
        } else if (type == "down") {
          return a - b; //降序
        } else {
          return a - b;
        }
      };
    },
    getList() {
      _getAllWallet({
        symbolType: "cryptos",
      }).then((res) => {
        let list = res.extends;
        this.list = [...list].sort(this.compare("usdt", "up"));
      });
    },
    changeEyes() {
      this.eyetel = !this.eyetel;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    //跳转提币页面
    withdrawBtn() {
      //身份已认证，直接跳转，未认证则提示跳身份认证页
      // if(this.funds.status==2) {
      //   this.$router.push({
      //     path:'/cryptos/withdraw/withdrawPage'
      //   });
      // }else{
      //   Dialog.confirm({
      //     confirmButtonText:this.$t('确定'),
      //     cancelButtonText:this.$t('取消'),
      //     title: this.$t('提示'),
      //     message: this.$t('请进行身份KYC认证'),
      //     beforeClose: (action, done) => {
      //       if (action === 'confirm') {
      //         done();
      //         this.$router.push({
      //           path:'/authentication'
      //         });
      //       } else {
      //         done();
      //       }
      //     },
      //   });
      // }
      this.$router.push({
        path: "/cryptos/withdraw/withdrawPage",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  .right-clock {
    position: absolute;
    top: 0;
    right: -3px;
  }

  .total_wrap {
    margin-top: 44px;
  }

  .asset-title-box {
    margin: 40px 0;
  }

  .btn-box {
    margin-top: 44px;
  }

  .btn-box>div {
    width: 234px;
    padding: 20px 15px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 8.8px;
    font-size: 26.5px;
    display: flex;
    justify-content: center;
    align-items: center;

    .word-wrap {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 40px;
        height: 40px;
        margin-right: 22px;
      }

      span {
        font-size: 26.5px;
      }
    }
  }

  .mr60 {
    margin-right: 60px;
  }

  .divider-line {
    border-bottom: 1px solid $border-grey;
    padding-bottom: 80px;
  }

  .assets-content-title {
    margin-top: 60px;
    margin-bottom: 55px;
  }

  .assets-list {
    margin-bottom: 70px;
  }

  .assets-list>div {
    display: flex;
  }

  .assets-list>div:nth-child(2) div:nth-child(1) {
    margin-bottom: 16px;
    font-size: 30px;
    font-weight: 700;
  }

  .symbol-name {
    margin-left: 22px;
    //margin-top:10px;
  }

  .subtract-icon {
    width: 32px;
    height: 40px;
  }
}
</style>
