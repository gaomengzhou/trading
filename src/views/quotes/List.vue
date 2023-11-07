<template>
  <section class="pb-fix">
    <div class="container-box">
      <header class="header">
        <div class="flex-l">
          <span class="title">{{ t('quotes') }}</span>
        </div>
        <div class="icon-group">
          <div class="icon search" @click="handleSearch">
            <img :src="searchSrc" alt="">
          </div>
        </div>
      </header>
      <section class="tab-container">
        <van-tabs v-model:active="tabActive" shrink @click-tab="onClickTab">
          <van-tab v-for="item in listTab" :key="item.tabIndex" :name="item.tabIndex" :title="item.title">
            <component :is="components.get(item.type)" :key="item.tabIndex"></component>
          </van-tab>
        </van-tabs>
      </section>
    </div>
    <!-- 安装提示 -->
    <div class="addBox" v-show="showSave" @click="closeSaveBox">
      <div class="add">
        <div class="font-26">
          <div class="flex flex-col">
            <b>{{ $t('installApp') }}:</b>
            <div class="mt">{{ $t('press') }}“<img
                style="width:22px;vertical-align: middle;margin: 0 2px;display: inline-block;"
                src="../../assets/image/assets-center/press.png" />”&nbsp;{{ $t('and') }}&nbsp;<b>“{{
                  $t('addHomeScreen')
                }}”</b>
            </div>
          </div>
          <div class="mt">({{ $t('installedClose') }})</div>
        </div>
        <img class="closeAdd w-4 h-4" src="../../assets/image/assets-center/icon-close.png" alt="">
        <div class="angle"></div>
      </div>
    </div>
  </section>
</template>
    
<script setup>
import { ref, onMounted, defineAsyncComponent, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { _getQuotes } from '@/service/quotes.api'
import { useI18n } from 'vue-i18n'
import { setStorage, getStorage } from '@/utils'

import { themeStore } from '@/store/theme';
const thStore = themeStore()


const { t } = useI18n()


const router = useRouter()
const route = useRoute()
const tabActive = ref(0)
const TITLE = import.meta.env.VITE_APP__TITLE
const showSave = ref(false)
const searchSrc = new URL(`../../assets/theme/${thStore.theme}/image/search.png`, import.meta.url)


const symbolType = ref('US-stocks')

const components = shallowRef(new Map())

components.value.set(
  'Etf',
  defineAsyncComponent(() => import('../etf/index.vue'))
)
components.value.set(
  'Foreign',
  defineAsyncComponent(() => import('../foreign/index.vue'))
)
components.value.set(
  'Cryptos',
  defineAsyncComponent(() => import('../cryptos/index.vue'))
)
components.value.set(
  'UsStock',
  defineAsyncComponent(() => import('../usStock/List.vue'))
)
components.value.set(
  'HkStock',
  defineAsyncComponent(() => import('../hkStock/List.vue'))
)
components.value.set(
  'TWStock',
  defineAsyncComponent(() => import('../twStock/List.vue'))
)
const listTab = ref([
  {
    title: 'ETF',
    type: 'Etf',
    urlMatch: 'etf',
    symbolType: 'indices',
    tabIndex: 0
  },
  {
    title: t('加密货币'),
    type: 'Cryptos',
    urlMatch: 'crypto',
    symbolType: 'cryptos',
    tabIndex: 1
  },
  {
    title: t('外汇'),
    type: 'Foreign',
    urlMatch: 'for',
    symbolType: 'forex',
    tabIndex: 2
  },
  {
    title: t('UsStocks'),
    type: 'UsStock',
    urlMatch: 'stock',
    symbolType: 'US-stocks',
    tabIndex: 3
  },
  {
    title: t('港股'),
    type: 'HkStock',
    urlMatch: 'HK-stocks',
    symbolType: 'HK-stocks',
    tabIndex: 4
  },
  {
    title: t('台股'),
    type: 'TWStock',
    urlMatch: 'TW-stocks',
    symbolType: 'TW-stocks',
    tabIndex: 5
  },
])


onMounted(async () => {
  setTabActive()
  getIsSave()
})



const setTabActive = () => {
  if (route.query.tabActive) {
    tabActive.value = +route.query.tabActive
    return
  }
  let urlPath = GetUrlRelativePath()
  listTab.value.forEach(item => {
    if (urlPath.indexOf(item.urlMatch) != -1) {
      tabActive.value = item.tabIndex
      symbolType.value = item.symbolType
    }
  })
}

const handleSearch = () => {
  listTab.value.forEach(item => {
    if (tabActive.value == item.tabIndex) {
      symbolType.value = item.symbolType
    }
  })
  router.push({
    path: '/optional/search',
    query: {
      symbolType: symbolType.value
    }
  })
}

const GetUrlRelativePath = () => {
  var url = document.location.toString();
  var arrUrl = url.split("//");

  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[1];
  }
  return relUrl;
}


const closeSaveBox = () => {
  setStorage(`${TITLE}addtoClosed`, 1)
  showSave.value = false
}
const getIsSave = () => {
  const issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if (issafariBrowser) {
    if (getStorage(`${TITLE}addtoClosed`)) {
      showSave.value = false;
    } else {
      showSave.value = true
    }
  } else {
    showSave.value = false
  }
  const isFull = window.navigator.standalone;
  if (isFull) {
    showSave.value = false
  }
}


const onClickTab = ({ name, tile }) => {
  tabActive.value = name
  router.push('/quotes/index?tabActive=' + tabActive.value)
};

</script>
<style lang="scss" scoped>
:deep(.van-loading) {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

:deep(.van-tabs__nav) {
  background: $mainBgColor;
}

:deep(.van-tab) {
  font-size: 14px;
  color: $text_color;
  font-weight: 400;
}

:deep(.van-tab.van-tab--active) {
  font-weight: 700;
}

:deep(.van-tabs__line) {
  background: url('../../assets/image/active.png') no-repeat center;
  width: 9px;
  height: 8px;
  background-size: 100% 100%;
}

.soon-container {
  padding: 0 16px;
  color: #ccc;
  font-size: 14px;
  display: flex;
  justify-content: center;
  text-align: center;

  img {
    width: 200px;
    height: 220px;
  }
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
          height: 16px;
          width: 12px;
        }
      }
    }

    .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      color: $mainTextColor;
    }

    .icon-group {
      width: 100px;
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


}

.addBox {
  border-radius: 10px;
  width: 300px;
  height: 100px;
  font-size: 12px;
  background: $fina-border;
  position: fixed;
  bottom: 70px;
  left: 50%;
  margin-left: -150px;
  z-index: 1000;

  .add {
    padding: 16px;
    box-sizing: border-box;
    height: 100%;
    position: relative;
    color: $text_color;

    .closeAdd {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 10px;
      height: 10px;
    }

    .angle {
      position: absolute;
      bottom: -37px;
      width: 0;
      height: 0;
      left: 131px;
      border: 20px solid transparent;
      border-top: 24px solid $fina-border;
    }
  }
}
</style>