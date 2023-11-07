<template>
  <section class="pb-fix">
    <div class="container-box">
      <header class="header">
        <div class="flex-l">
          <div class="icon back">
            <van-icon name="arrow-left" size="20"  @click="onRoute" />
          </div>
          <span class="title">{{ `${symbolName} (${symbol})` }}</span>
        </div>
        <div class="icon-group">
          <div class="icon search" @click="router.go(0)">
            <img :src="handleImage(refreshIcon)" alt="">
          </div>
        </div>
      </header>
      <section class="tab-container">
        <van-tabs v-model:active="tabActive">
          <van-tab title="买入">
            <BuySellTradeTab :isSell="false" @updateActive="updateActive" />
          </van-tab>
          <van-tab title="卖出">
            <BuySellTradeTab :isSell="true" @updateActive="updateActive" />
          </van-tab>
          <van-tab title="撤单">
            <Withdrawal />
          </van-tab>
          <van-tab title="持仓">
            <Position />
          </van-tab>
          <van-tab title="查询">
            <Search />
          </van-tab>
        </van-tabs>
      </section>
    </div>
  </section>
</template>
    
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { _getQuotes } from '@/service/quotes.api'
import { _queryBySymbol } from '@/service/etf.api'
import { useI18n } from 'vue-i18n'
import { useQuotesStore } from '@/store/quotes.store'
import BuySellTradeTab from './components/BuySellTradeTab.vue'
import Withdrawal from './components/Withdrawal.vue'
import Position from './components/Position.vue'
import Search from './components/Search.vue'
import { themeStore } from '@/store/theme';
const thStore = themeStore()

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const defaultTabActive = +route.query.tabActive || 0
const tabActive = ref(defaultTabActive)
const symbol = ref('')
const symbolName = ref(route.query.symbolName)
const quotesStore = useQuotesStore()

const refreshIcon = new URL(`../../assets/theme/${thStore.theme}/image/refresh.png`, import.meta.url)

onMounted(async () => {
  // interval.value = setInterval(() => {
  //   fetchQuotes()
  // }, 1000)
  if (route.query.symbol) {
    symbol.value = route.query.symbol
  } else {
    symbol.value = quotesStore.coins.length ? quotesStore.coins[0].symbol : 'STEM'
  }
  queryBySymbol()
})

onBeforeUnmount(() => {
  // if (interval.value) {
  //   clearInterval(interval.value)
  // }
})


const queryBySymbol = () => {
  _queryBySymbol(symbol.value).then(data => {
    symbolName.value = data?.name
  })
}

const onRoute = () => {
  if (route.query.from === 'trade') {
    router.back()
    return
  }
  router.push(`/quotes/detail?symbol=${symbol.value}`)
}
const updateActive = () => {
  tabActive.value = 4
}
const handleImage = (url) => {
  return new URL(url, import.meta.url).href
}
</script>
<style lang="scss" scoped>
:deep(.van-tabs__nav) {
  background: $selectSymbol_background;
}

:deep(.van-tab) {
  font-size: 14px;
  color: $text_color;
  font-weight: 400;
}

:deep(.van-tab.van-tab--active) {
  font-weight: 700;
}

:deep(.van-button--danger) {
  background-color: $red;
}

:deep(.trade-order-area .van-field) {
  padding: 4px 6px;
  background: $selectSymbol_background;
  border: 1px solid $red;
  border-radius: 2px;
}

:deep(.trade-order-area .van-field__control) {
  color: $text_color;
}

:deep(.van-stepper__minus) {
  background: $input_background;
  border: 1px solid $red;
  border-radius: 2px;
  color: $red;
}

:deep(.van-stepper__plus) {
  background: $input_background;
  border: 1px solid $red;
  border-radius: 2px;
  color: $red;
}

:deep(.van-stepper__input) {
  background: $input_background;
  color: $text_color;
  border-top: 1px solid $red;
  border-bottom: 1px solid $red;
  margin: 0;
}

.container-box {
  .green {
    color: $green;
  }

  .red {
    color: $red;
  }

  .header {
    display: flex;
    height: 28px;
    padding: 0 12px;

    .flex-l {
      flex: 1;
      display: inline-flex;

      .icon {
        display: inline-block;
        width: 24px;
        height: 28px;
        padding: 4px 4px;

        img {
          height: 20px;
          width: 20px;
        }
      }
    }

    .title {
      flex: 1;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      line-height: 28px;
      color: $mainTextColor;
    }

    .icon-group {
      text-align: right;

      .icon {
        display: inline-block;
        width: 28px;
        height: 28px;
        padding: 4px;
        margin-left: 16px;
      }
    }


  }

  .tab-container {
    margin-top: 18px;
  }

  .orderbook-container {
    padding: 0 12px 16px;

    .trade-order-area {
      display: flex;
      flex-direction: column;
      width: 210px;
      font-size: 12px;
      margin-right: 12px;

      .line-first {
        display: flex;
      }

      .line-first-l {
        flex: 1;
      }

      .line-first-r {
        width: 50px;
        padding: 0 2px;
        border: 1px solid$border_color;
        border-radius: 2px;
        color: $text_color6;
      }

      .buy-btn {
        height: 32px;
      }

      .name-input {
        margin-top: 10px;
      }

      .price-input {
        margin-top: 10px;
      }

      .number-input {
        margin-top: 10px;
      }

      .value-input {
        margin-top: 10px;
      }

      .buy-number {
        margin-top: 10px;
      }

      .num {
        color: #E19841;
        margin: 0 4px;
      }

      .freight {
        margin: 10px 0;
        display: flex;

        span {
          flex: 1;
          background: #1B2134;
          border-radius: 2px;
          text-align: center;
        }

        span:not(:last-child) {
          margin-right: 8px;
        }
      }

      .desc {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
    }

    .trade-deep-data {
      flex: 1;
    }

    .line-first {
      display: flex;
    }

    .select-label {
      padding-left: 4px;
    }

    .select-icon {
      height: 11px;
      width: 14px;
      padding-right: 4px;
    }

    .option-box {
      position: absolute;
      left: 0;
      right: 0;
      top: 5.625rem;
      width: 100%;
      background-color: $border-grey;
      text-align: center;
      box-shadow: 0px 0px 0.1875rem 0.1875rem $border-grey;
      border-radius: 0.25rem;
      color: $text_color4;

      >div {
        padding: 1.875rem 0;
      }
    }
  }

  .indicator-index-container {
    .indicator-index-box {
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .flex-l {
        flex: 1;

        ul {
          display: flex;

          li {
            flex: 1;
            text-align: center;
            margin: 0 4px;
            font-size: 12px;
            border-radius: 4px;
          }
        }
      }

      .flex-r {
        display: flex;
        justify-content: flex-end;
        width: 80px;

        img {
          width: 12px;
          height: 16px;
        }

      }
    }

    .active {
      background: $btn_main;
      color: $white;
    }
  }

  .etf-container {
    padding: 0;

    .hot-container {
      margin: 20px 0;
      padding: 0 8px;

      .header-box {
        display: flex;

        .title {
          flex: 1;
          font-size: 16px;
          padding: 0 8px;
          font-weight: 700;
        }

        .icon-group {
          display: flex;
          align-items: center;

          .icon.arrow {
            margin-left: 10px;
            width: 7px;
            height: 9px;
          }
        }

      }

      .hot-box {
        display: grid;
        grid-template-columns: 33.33% 33.33% 33.33%;
        grid-template-rows: repeat(2, 100px);
      }

      .hot-item {
        padding: 6px 2px;
        margin: 4px;
        text-align: center;
        font-size: 12px;
        line-height: 18px;
        color: #B8BDD1;
        background: #1B2134;
        border-radius: 4px;

        .value {
          font-weight: 700;
          color: $text_color;
          line-height: 24px;
        }

        .num {
          .num-left {
            margin-right: 6px;
          }
        }
      }
    }

    .all-etf-ranking,
    .other-etf-ranking {
      margin-top: 10px;

      .title {
        font-weight: 700;
        padding: 0 12px;
      }

      .tabs {
        padding: 0 12px;
        margin-top: 10px;
        height: 40px;
        line-height: 24px;
        color: #BBBCBD;

        .tab-item {
          margin: 4px;
          text-align: center;
          padding: 4px 6px;
          font-size: 12px;
          color: $text_color5;
          background: $US_tab_background;
          border-radius: 10px;
          background-size: cover;
        }

        .active {
          font-weight: 700;
          color: $color_main !important;
          background: $US_tabActice_background;
          border-radius: 10px;
          background-size: cover;
        }
      }

      .etf-table {

        .right {
          text-align: right;
        }

        ul {
          margin-top: 10px;
        }

        .title-line {
          color: #747A8F;
          font-size: 12px;
          font-weight: 400;
          padding: 0 12px;
          border: none;
        }

        li {
          padding: 14px 12px;
          display: flex;
          font-size: 12px;
          line-height: 18px;
          border-bottom: 1px solid $border_color;

          .gray-text {
            color: #BCBDC2;
            font-size: 12px;
          }

          .flex-l {
            width: 100px;
          }

          .flex-r {
            display: inline-flex;
            flex: 1;

            .flex-r-item {
              flex: 1;
              align-self: center;
              text-align: center;
            }
          }
        }
      }

      .more-box {
        height: 40px;

        .icon-group {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          line-height: 40px;
          font-size: 14px;

          .icon.arrow {
            margin-left: 10px;
            width: 7px;
            height: 9px;
          }
        }
      }

    }

  }
}
</style>