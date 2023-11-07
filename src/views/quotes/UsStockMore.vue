<template>
  <section class="pb-fix">
    <div class="container-box">
      <header class="header">
        <div class="flex-l">
          <div class="icon back">
            <!-- <img src="@/assets/image/back.png" alt="" @click="handleBack"> -->
            <van-icon name="arrow-left" size="20" @click="handleBack" />
          </div>
          <span class="title">{{ typName }}</span>
        </div>
        <div class="icon-group">
          <div class="icon search" @click="onRoute('/optional/search?symbolType=US-stocks')">
            <img src="@/assets/image/optional/search.png" alt="">
          </div>
        </div>
      </header>
      <section class="tab-container">

        <div class="all-etf-ranking">
          <div class="etf-table">
            <ul>
              <li class="title-line">
                <div class="flex-l">
                  <p>{{ t('nameCode') }}</p>
                </div>
                <div class="flex-r">
                  <div class="flex-r-item">
                    <p>{{ t('Premarketfall') }}</p>
                  </div>
                  <div class="flex-r-item">
                    <p>{{ t('premarketPrice') }}</p>
                  </div>
                </div>
              </li>
              <li v-for="(item, index) in list" :key="item.symbol" @click="itemClick(item)">
                <div class="flex-l">
                  <p>{{ item.name }}</p>
                  <p class="gray-text">
                    {{ item.symbol }}
                  </p>
                </div>
                <div class="flex-r">
                  <div class="flex-r-item">
                    <p :class="item.changeRatio > 0 ? 'text-up' : 'text-down'">
                      <span>{{ item.changeRatio }}%</span>
                    </p>
                  </div>
                  <div class="flex-r-item">
                    <p>{{ item.close }}</p>
                  </div>
                </div>
              </li>
            </ul>
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



const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const list = ref([])
const prominentListData = ref([]) //知名美股
const technologyListData = ref([]) // 科技类
const dinancialListData = ref([]) // 金融类
const healthcareListData = ref([]) // 医疗类
const energyListData = ref([]) // 能源类
const manufacturingListData = ref([]) // 制造业
const chineseListData = ref([]) // 中概股
const rawMaterialsListData = ref([]) // 原材料业
const industryListData = ref([]) // 工业
const consumerServicesListData = ref([]) // 消费者服务业
const utilityListData = ref([]) // 公用事业
const estateListData = ref([]) // 地产建筑业
const informationListData = ref([]) // 资讯科技业
const conglomeratesListData = ref([]) //  综合企业
const typName = ref('')
const tabIndex = ref(0)
const symbolType = route.query.symbolType

onMounted(async () => {
  typName.value = route.query.typName
  tabIndex.value = route.query.index
  getETFItemList()
})

onBeforeUnmount(() => {
  // if (interval.value) {
  //   clearInterval(interval.value)
  // }
})
const getETFItemList = () => {
  _getETFItemList({
    type: symbolType
  }).then(data => {
    if (data === null) {
      data = []
    }
    prominentListData.value = data.filter(item => item.category && item.category.indexOf('prominent') > -1) || []
    technologyListData.value = data.filter(item => item.category && item.category.indexOf('technology') > -1) || []
    dinancialListData.value = data.filter(item => item.category && item.category.indexOf('dinancial') > -1) || []
    healthcareListData.value = data.filter(item => item.category && item.category.indexOf('healthcare') > -1) || []
    energyListData.value = data.filter(item => item.category && item.category.indexOf('energy') > -1) || []
    manufacturingListData.value = data.filter(item => item.category && item.category.indexOf('manufacturing') > -1) || []
    chineseListData.value = data.filter(item => item.category && item.category.indexOf('chinese') > -1) || []
    rawMaterialsListData.value = data.filter(item => item.category === 'rawMaterials') || [] // 原材料业
    industryListData.value = data.filter(item => item.category === 'industry') || [] // 工业
    consumerServicesListData.value = data.filter(item => item.category === 'consumerServices') || [] // 消费者服务业
    utilityListData.value = data.filter(item => item.category === 'utility') || [] // 公用事业
    estateListData.value = data.filter(item => item.category === 'estate') || [] // 地产建筑业
    informationListData.value = data.filter(item => item.category === 'information') || [] // 资讯科技业
    conglomeratesListData.value = data.filter(item => item.category === 'conglomerates') || [] //  综合企业
    if (tabIndex.value == 0) {
      list.value = prominentListData.value
    } else if (tabIndex.value == 1) {
      list.value = technologyListData.value
    } else if (tabIndex.value == 2) {
      list.value = dinancialListData.value
    } else if (tabIndex.value == 3) {
      list.value = healthcareListData.value
    } else if (tabIndex.value == 4) {
      list.value = energyListData.value
    } else if (tabIndex.value == 5) {
      list.value = manufacturingListData.value
    } else if (tabIndex.value == 6) {
      list.value = chineseListData.value
    } else if (tabIndex.value == 7) {
      list.value = rawMaterialsListData.value
    } else if (tabIndex.value == 8) {
      list.value = industryListData.value
    } else if (tabIndex.value == 9) {
      list.value = consumerServicesListData.value
    } else if (tabIndex.value == 10) {
      list.value = utilityListData.value
    } else if (tabIndex.value == 11) {
      list.value = estateListData.value
    } else if (tabIndex.value == 12) {
      list.value = informationListData.value
    } else if (tabIndex.value == 13) {
      list.value = conglomeratesListData.value
    }
  })
}
const itemClick = (item) => {
  router.push(`/quotes/usStockDetail?symbol=${item.symbol}&symbolType=${symbolType}&enName=${item.enName}&isMore=1&tabIndex=${tabIndex.value}&typName=${typName.value}`)
}

const onRoute = (path) => {
  router.push(path)
}

const handleBack = () => {
  if (symbolType === 'US-stocks') {
    onRoute('/quotes/index?tabActive=3')
  } else {
    onRoute('/quotes/index?tabActive=4')
  }
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
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    line-height: 18px;
    border-bottom: 1px solid $border_color;

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
</style>