<template>
  <div class="foreign-container-box">
    <section class="banner-container">
      <van-swipe class="swipe-box" :autoplay="5000" indicator-color="white">
        <van-swipe-item>
          <img src="@/assets/image/foreign/banner1.png" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/image/foreign/banner2.png" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/image/foreign/banner3.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/image/foreign/banner4.jpg" alt="">
        </van-swipe-item>
      </van-swipe>
    </section>
    <div class="pt-10 px-12">
      <van-notice-bar class="font-26 textColor" left-icon="" :scrollable="false" background="transparent">
        <div slot="left-icon" class=" flex items-center more-img"><img class="w-20 h-20  more-img"
            src="../../assets/Horn.png" alt="">
        </div>
        <van-swipe vertical class="notice-swipe" :autoplay="2000" :show-indicators="false">
          <van-swipe-item v-for="item in announceList" :key="item.id" @click="toAnnounceDetail(item.uuid)">{{ item.title
          }}
          </van-swipe-item>
        </van-swipe>
        <div class="ml-20 flex items-center " slot="right-icon" @click.stop="$router.push('/cryptos/announce')"><img
            class="w-20 h-20 more-img" src="../../assets/more.png" alt="">
        </div>
      </van-notice-bar>
    </div>
    <section class="nav">
      <foreign-ex-nav :defaultEtfListData="listData" />
    </section>
    <div class="divider"></div>
    <section class="hots-container">
      <div class="header">
        <div class="title">{{ t('Hots') }}</div>
        <div class="icon-group" @click="onRoute('/foreign/quotation')">
          <span>{{ t('更多') }}</span>
          <div class="icon arrow">
            <img src="@/assets/image/quotes/right-arrow.png" alt="">
          </div>
        </div>
      </div>
      <div class="hots-symbol flex">
        <div class="hots-symbol-item" v-for="(item, index) in hotListDataNameArr" :key="item.uuid"
          @click="itemClick(item)">
          <p class="name">
            <span name-l>{{ item.symbol }}</span>
            <span class="name-r">{{ item.close }}</span>
          </p>
          <div class="trend" v-if="item.uuid">
            <m-echarts :dataObj="item" :ratio="Number(item.change_ratio)" :index="item.uuid" />
          </div>
          <div class="direction flex">
            <div class="sell">
              <span class="mr-1" v-if="item.net_change > 0" :class="item.net_change > 0 ? 'text-up' : 'text-down'">+{{
                item.net_change }}</span>
              <span class="mr-1" v-else :class="item.net_change > 0 ? 'text-up' : 'text-down'">{{ item.net_change
              }}</span>&nbsp;
            </div>
            <div class="buy">
              <span :class="item.change_ratio > 0 ? 'text-up' : 'text-down'">{{ item.change_ratio > 0 ?
                `${item.change_ratio}%` : 0 }}</span>

            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="market-container">
      <div class="header">
        <div class="title">{{ t('Market') }}</div>
        <!-- <div class="icon-group" @click="onRoute('/foreign/quotation')">
          <div class="icon arrow">
            <img src="@/assets/image/quotes/right-arrow.png" alt="">
          </div>
        </div> -->
      </div>
      <div class="tabs flex">
        <div class="tab-item flex-1" v-for="(item, index) in tabList" @click="selectIndex(index, item.value)"
          :class="[tabIndex === index ? 'active' : '']" :key="index">
          {{ item.title }}
        </div>
      </div>
      <div class="symbol-table">
        <ul>
          <li v-for="(item) in listData" :key="item.symbol" @click="itemClick(item)">
            <div class="flex-l">
              <p>
                <span class="mr-1" :class="item.change_ratio > 0 ? 'text-up' : 'text-down'" v-if="item.net_change > 0">+{{
                  item.net_change }}</span>
                <span class="mr-1" :class="item.change_ratio > 0 ? 'text-up' : 'text-down'" v-else>{{ item.net_change
                }}</span>&nbsp;
                <span :class="item.change_ratio > 0 ? 'text-up' : 'text-down'">{{ item.change_ratio > 0 ?
                  `${item.change_ratio}%` : 0 }}</span>
              </p>
              <p>{{ item.symbol }}</p>
              <p class="gray-text">{{ item.current_time ? item.current_time.slice(11) : '-' }}</p>
            </div>
            <div class="flex-r">
              <div class="flex justify-end h-full flex-wrap">
                <div class="flex-r-item">
                  <p class="flex text-primary justify-end" :class="item.open < 1 ? 'text-up' : 'text-down'">
                    <span class="font-semibold text-lg">{{
                      item.open.toString().substr(0, item.open.toString().length
                        - 1)
                    }}</span>
                    <span class="text-xs">{{ item.open.toString().substr(item.open.toString().length - 1) }}</span>
                  </p>
                  <div class="text-gray">
                    <span class="mr-1.5">H: {{ item.high }}</span>
                  </div>
                </div>
                <div class="last flex-r-item">
                  <p class="flex text-primary justify-end" :class="item.close < 1 ? 'text-up' : 'text-down'">
                    <span class="font-semibold text-lg">{{
                      item.close.toString().substr(0, item.close.toString().length
                        - 1)
                    }}</span>
                    <span class="text-xs">{{ item.close.toString().substr(item.close.toString().length - 1) }}</span>
                  </p>
                  <div class="text-gray">
                    <span>L: {{ item.low }}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { showToast, Swipe, SwipeItem } from "vant";
import { useRouter } from 'vue-router';
import { REQUEST_TIMER } from '@/config'
import { useQuotesStore } from '@/store/quotes.store'
import { useLanguageStore } from '@/store/language.store'
import { SET_COIN_LIST, SET_LANGUAGE } from '@/store/types.store'
import { _getQuotes, _ItemUserOptionalItemList } from '@/service/quotes.api'
import { useI18n } from "vue-i18n";
import MEcharts from "@/components/ex-echarts/index.vue";
import ForeignExNav from "@/components/trade/foreign-ex-nav/index.vue"
import { _getNewsList1, _getPopupNews } from '@/service/user.api'

defineOptions({
  name: 'homeIndex'
});

const interval = ref(null)

const { locale } = useI18n()
const { t } = useI18n()
const quotesStore = useQuotesStore()
const languageStore = useLanguageStore()

const tabIndex = ref(1)
const listData = ref([])
const symbolType = ref('commodities') //默认查询外汇
const tabList = ref([
  { title: t('外汇'), value: "forex" },
  { title: t('大宗商品'), value: "commodities" },
  { title: t('指数'), value: "indices" },
  { title: t('加密货币'), value: "cryptos" },
])
const hotListDataNameArr = ref([
  {
    symbol: 'XAUUSD'
  }, {
    symbol: 'AUDUSD'
  }, {
    symbol: 'ETHUSD'
  }
])
const router = useRouter()
// 1蓝涨红跌 2蓝跌红涨
const buleUpTheme = true;
const announceList = ref([])

onMounted(async () => {
  let quotesList = JSON.parse(localStorage.getItem('quotesList')) || []
  listData.value = quotesList
  languageStore[SET_LANGUAGE](locale.value)
  await quotesStore[SET_COIN_LIST]()
  fetchQuotes()
  getNews()
  interval.value = setInterval(() => {
    fetchQuotes()
  }, REQUEST_TIMER)
})

onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})

const getNews = () => {
  _getNewsList1({
    // language: this.$i18n.locale,
  }).then(res => {
    announceList.value = res
  })
}

const toAnnounceDetail = (announceId) => {
  if (announceId) {
    router.push({ path: '/cryptos/AnnounceDetail', query: { id: announceId } })
  }
}

const selectIndex = (index, value) => {
  tabIndex.value = index
  symbolType.value = value
  fetchQuotes()
}

const getTextColor = (upCondition) => {
  if (buleUpTheme) {
    return upCondition ? 'blue-up-color' : 'red-down-color';
  } else {
    return upCondition ? 'red-up-color' : 'blue-down-color';
  }
}

const getChartTextColor = (upCondition) => {
  if (buleUpTheme) {
    return upCondition ? 'blue-up-color value' : 'red-down-color value';
  } else {
    return upCondition ? 'red-up-color value' : 'blue-down-color value';
  }
}


const getTextBg = (upCondition) => {
  if (buleUpTheme) {
    return upCondition ? 'blue-up-bg' : 'red-down-bg';
  } else {
    return upCondition ? 'red-up-bg' : 'blue-down-bg';
  }
}

const handleNumber = (value, index) => {
  if (value === null || value === undefined) {
    return '--'
  }
  let count;
  if (value.toString().indexOf('.') < 0) {
    // 整数
    return value
  } else {
    // 小数
    // count = value.toString().split('.').pop().length
    return value.toFixed(4)
    if (index === 0) {
      return count > 2 ? value.toFixed(2) : value
    } else if (index === 1) {
      return count > 5 ? value.toFixed(5) : value
    } else {
      return count > 2 ? value.toFixed(2) : value
    }
  }
}

const filterCoins = (type) => {
  let arr = [...quotesStore.coins]
  let result = []
  if (type === "all") {
    result = arr;
  } else {
    result = arr.filter(item => item.category === type)
  }
  return result;
}

const fetchQuotes = () => {
  const params = filterCoins(symbolType.value)
  if (params.length > 0) {
    _getQuotes(params).then(data => {
      localStorage.setItem('quotesList', JSON.stringify(data))
      listData.value = data
      hotListDataNameArr.value = listData.value.slice(0, 3)
    })
  } else {
    listData.value = []
  }

}

const onRoute = (path) => {
  router.push(path)
}

const itemClick = (item) => {
  router.push({ path: '/foreign/coinChart', query: { symbol: item.symbol } })
}

</script>

<style lang="scss" scoped>
@import '../../assets/css/copy.scss';

.foreign-container-box {
  padding-bottom: 50px;

  .font-semibold {
    font-size: 14px;
  }

  .header {
    display: flex;
    height: 28px;

    .title {
      flex: 1;
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      color: $text_color;
    }

    .icon-group {
      display: flex;
      text-align: right;
      align-items: center;

      span {
        font-size: 14px;
      }

      .icon {
        display: inline-block;
        width: 28px;
        height: 28px;
        padding: 4px;
        margin-left: 2px;
      }
    }
  }

  .banner-container {
    margin-top: 20px;
    height: 160px;
    padding: 0 12px;

    .swipe-box {
      border-radius: 8px;
    }

    .van-swipe-item {
      color: $text_color;
      font-size: 20px;
      line-height: 160px;
      text-align: center;
      background-color: $selectSymbol_background;

      img {
        display: block;
        height: 160px;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  .hots-container {
    margin-top: 20px;
    padding: 0 12px;

    .header {
      .title {
        font-size: 20px;
        font-weight: 700;
      }

      .icon.arrow {
        width: 14px;
        height: 28px;

        img {
          margin-top: 6px;
          filter: $filter;
        }
      }
    }

    .hots-symbol {
      gap: 0 3.3%;
    }

    .hots-symbol-item {
      font-size: 12px;
      font-weight: 600;
      margin: 6px 0;
      padding: 4px;
      background: $hot-item-bg;
      border-radius: 4px;
      flex-shrink: 0;
      width: 31%;

      .name {
        padding: 0 4px;
        display: flex;
        justify-content: center;
      }

      .trend {
        height: 65px;
      }

      .direction {
        // padding: 0 10px;
        justify-content: space-evenly;

        span {
          font-size: 12px;
          line-height: 16px;
        }

        .buy {
          text-align: right;
        }

        .sell {
          text-align: left;
        }
      }
    }

    .hots-symbol-item:nth-child(2) {
      // margin: 6px 8px;
    }

  }

  .market-container {
    margin-top: 20px;
    padding: 0 12px;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .icon.arrow {
      width: 14px;
      height: 28px;

      img {
        margin-top: 6px;
      }
    }

    .tabs {
      // padding: 0 12px;
      margin-top: 10px;
      // height: 40px;
      min-height: 40px;
      line-height: 24px;
      color: #BBBCBD;

      .tab-item {
        margin: 4px;
        text-align: center;
        padding: 4px 4px;
        font-size: 12px;
        color: $text_color5;
        background: $US_tab_background;
        border-radius: 10px;
        background-size: cover;
      }

      .active {
        font-weight: 400;
        color: $color_main !important;
        background: $US_tabActice_background;
        border-radius: 10px;
        background-size: cover;
      }
    }

    .symbol-table {
      li {
        margin-top: 20px;
        display: flex;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;

        .gray-text {
          color: #BCBDC2;
          font-size: 12px;
        }

        .flex-l {
          width: 130px;
        }

        .flex-r {
          flex: 1;

          .flex-r-item {
            flex: 1;
            align-self: center;
            text-align: right;

            .last-item {
              padding: 0 6px;

              p {
                text-align: right;
                width: 70px;
                height: 24px;
                line-height: 24px;
                border-radius: 4px;
                color: $text_color;
                font-weight: 600;
                font-size: 14px;
              }
            }
          }

          .last {}
        }
      }
    }
  }
}



:deep(.van-notice-bar__content) {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.van-notice-bar {
  padding: 0;
  height: 30px;
}

.notice-swipe {
  flex: 1;
  margin-left: 10px;
  height: 30px;
  line-height: 30px;
}
</style>