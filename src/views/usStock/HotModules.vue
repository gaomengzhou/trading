<template>
  <section class="pb-fix">
    <div class="container-box">
      <header class="header">
        <div class="flex-l">
          <div class="icon back">
            <van-icon name="arrow-left" size="20" @click="router.back()" />
          </div>
          <span class="title">{{ t('hotPlate') }}</span>
        </div>
        <div class="icon-group">
          <div class="icon search" @click="onRoute('/optional/search')">
            <img src="@/assets/image/optional/search.png" alt="">
          </div>
        </div>
      </header>
      <section class="tab-container">
        <van-tabs v-model:active="active" shrink>
          <van-tab :title="t('popularIndex')">
          </van-tab>
          <van-tab :title="t('plateHotspots')"></van-tab>
        </van-tabs>
        <section class="etf-container">
          <div class="all-etf-ranking">
            <div class="etf-table">
              <ul>
                <li class="title-line">
                  <div class="flex-l">
                    <p>{{ t('nameCode') }}</p>
                  </div>
                  <div class="flex-r">
                    <div class="flex-r-item">
                      <p>{{ t('uptodate') }}</p>
                    </div>
                    <div class="flex-r-item">
                      <p>{{ t('increase') }}</p>
                    </div>
                    <div class="flex-r-item">
                      <p>{{ t('SparkDiagram') }}</p>
                    </div>
                    <div class="flex-r-item right">
                      <p>{{ t('Amount') }}</p>
                    </div>
                  </div>
                </li>
                <li v-for="(item) in allEtfListData" :key="item.symbol" @click="itemClick(item)">
                  <div class="flex-l">
                    <p>{{ item.symbol }}</p>
                    <p class="gray-text">{{ item.current_time ? item.current_time.slice(11) : '-' }}</p>
                  </div>
                  <div class="flex-r">
                    <div class="flex-r-item">
                      <p :class="item.open < 1 ? 'text-up' : 'text-down'">{{
                        item.open
                      }}</p>
                    </div>
                    <div class="flex-r-item">
                      <p :class="item.close < 1 ? 'text-up' : 'text-down'">{{
                        item.close
                      }}</p>
                    </div>
                    <div class="flex-r-item">
                      <p :class="item.close < 1 ? 'text-up' : 'text-down'">{{
                        item.close
                      }}</p>
                    </div>
                    <div class="flex-r-item">
                      <div class="last-item right">
                        <p :class="item.change_ratio > 0 ? 'up' : 'down'">
                          <span>{{ item.change_ratio }}%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </div>
  </section>
</template>
    
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/store/user';
import { useRoute, useRouter } from 'vue-router';
import { Tab, Tabs } from 'vant';
import { _getQuotes } from '@/service/quotes.api'
import { useI18n } from 'vue-i18n'
import { useQuotesStore } from '@/store/quotes.store'
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import linesData from './data.json'
import { themeStore } from '@/store/theme';
const thStore = themeStore()

echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition
]);

const quotesStore = useQuotesStore()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const allEtfTabIndex = ref(0)
const allEtfListData = ref([])
const interval = ref(null)
const symbolType = ref('forex') //默认查询外汇

onMounted(async () => {
  fetchQuotes()
  // interval.value = setInterval(() => {
  //   fetchQuotes()
  // }, 1000)

})

onBeforeUnmount(() => {
  // if (interval.value) {
  //   clearInterval(interval.value)
  // }
})

const fetchQuotes = () => {
  const params = filterCoins(symbolType.value)
  _getQuotes(params).then(data => {
    allEtfListData.value = data
  })
}

const filterCoins = (type) => {
  let arr = [...quotesStore.coins]
  let result = []
  if (type === "all") {
    result = arr;
  } else {
    result = arr.filter(item => item.type === type)
  }
  return result;
}

const onRoute = (path) => {
  router.push({
    path,
    query: {
      symbolType: 'indices'
    },
  });
}

const itemClick = () => {
  router.push('/quotes/detail')
}

const handleClickHotSymbol = (value) => {
  console.log(value, 'value')
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

:deep(.van-tabs__content) {
  margin-top: 20px;
}

:deep(.van-tab.van-tab--active) {
  font-weight: 700;
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
        padding: 6px 4px;

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
      font-size: 20px;
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

              .last-item {
                text-align: right;
                color: $text_color;
                font-weight: 700;
                font-size: 12px;
              }
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