<template>
  <section class="pb-fix">
    <div class="container-box">
      <header class="header">
        <div class="flex-l">
          <div class="icon back">
            <van-icon name="arrow-left" size="20" @click="handleBack" />
          </div>
          <span class="title">{{ $t('台股') }}</span>
        </div>
        <div class="icon-group">
          <div class="icon search" @click="onRoute('/optional/search?symbolType=TW-stocks')">
            <img src="@/assets/image/optional/search.png" alt="">
          </div>
        </div>
      </header>
      <section class="symbol-table">
        <div class="technology">
          <div class="other-etf-ranking">
            <div class="etf-table">
              <ul class="">
                <li class="title-line flex">
                  <div class="item1">
                    <p>{{ t('名称代码') }}</p>
                  </div>
                  <div class="item2 text-center">
                    <p>{{ t('最新价') }}</p>
                  </div>
                  <div class="item3 text-center">
                    <p>{{ t('涨幅') }}</p>
                  </div>
                  <div class="item4 text-center">
                    <p>{{ t('SparkDiagram') }}</p>
                  </div>
                  <div class="item5 text-right">
                    <p>{{ t('金额') }}</p>
                  </div>
                </li>
                <li class="flex quotesItem" v-for="(item, index) in quotesList" :key="index" @click="itemClick(item)">
                  <div class="item1">
                    <p>{{ item.name }}</p>
                    <p class="code mt-2">{{ item.symbol }}</p>
                  </div>
                  <div class="item2 text-center">
                    <p>{{ item.close }}</p>
                  </div>
                  <div class="item3 text-center">
                    <p :class="item.changeRatio > 0 ? 'text-down' : 'text-up'">
                      {{ item.changeRatio === 0 ? 0 : item.changeRatio > 0 ? `+${item.changeRatio}%` :
                        `${item.changeRatio}%` }}
                    </p>
                  </div>
                  <div class="item4 text-center">
                    <p><m-echarts :dataObj="item" :ratio="item.changeRatio" :index="index" /></p>
                  </div>
                  <div class="item5 text-right">
                    <p>{{ item.amount > 0 ? formatMoney(item.amount) : 0 }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
      
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/store/user';
import { useRoute, useRouter } from 'vue-router';
import { _getETFItemList } from '@/service/etf.api'
import { useI18n } from 'vue-i18n'
import { useQuotesStore } from '@/store/quotes.store'
import { formatMoney } from "@/utils";
import MEcharts from "@/components/ex-echarts/index.vue";


const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const list = ref([])
const tabIndex = ref(0)
const symbolType = route.query.symbolType
const quotesList = ref([])

onMounted(async () => {
  tabIndex.value = route.query.index
  getETFItemList()
})

const getETFItemList = () => {
  _getETFItemList({
    type: symbolType
  }).then(data => {
    if (data === null) {
      data = []
    }
    quotesList.value = data
  })
}
const itemClick = (item) => {
  router.push(`/quotes/detail?symbol=${item.symbol}&symbolType=TW-stocks`)
  // router.push(`/quotes/usStockDetail?symbol=${item.symbol}&symbolType=TW-stocks&enName=${item.enName}`)
}

const onRoute = (path) => {
  router.push(path)
}

const handleBack = () => {
  onRoute('/quotes/index?tabActive=5')
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

        img {
          filter: $filter;
        }
      }
    }


  }

  .tab-container {
    margin-top: 18px;
  }

}

.symbol-table {
  .etf-table {
    padding: 0 15px;

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
      padding: 10px 0;
      border: none;
    }

    li {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 18px;
      border-bottom: 1px solid $border_color;
      gap: 0 1.5%;

      .item1 {
        width: 25%;
      }

      .item2 {
        width: 20%;
      }

      .item3 {
        width: 15%;
      }

      .item4 {
        width: 15%;
      }

      .item5 {
        width: 20%;
      }


      .gray-text {
        color: #BCBDC2;
        font-size: 12px;
      }

      .flex-l {
        width: 40%;
      }

      .flex-r {
        display: inline-flex;
        flex: 1;

        .flex-r-item {
          flex: 1;
          align-self: center;
          text-align: center;

          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }
}

.quotesItem {
  div {
    flex-shrink: 0;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.text-up {
  color: $red;
}

.text-down {
  color: $green;
}
</style>