<template>
  <div class="pb-fix">
    <van-loading color="#1194F7" class="loading-box" v-if="isLoading" />
    <div class="container-box">
      <header class="header">
        <div class="icon-group">
          <div class="icon back" @click="onRoute('/ipo/index?tabActive=0')">
            <van-icon name="arrow-left" size="20" />
          </div>
          <div class="middle-text title" @click="onRoute('/foreign/search')">
            <span>抽签</span>
          </div>
          <div class="right-text" @click="onRoute('/foreign/search')">
            <span>抽签记录</span>
          </div>
        </div>
      </header>
      <section class="card">
        <p class="name">联宝</p>
        <p class="code">(6821)</p>
        <p class="num">30.00</p>
      </section>
      <section class="details">
        <div class="detail-info">
          <ul class="detail-ul">
            <li class="flex">
              <div class="item-l">抽签代码</div>
              <div class="item-r">6821</div>
            </li>
            <li class="flex">
              <div class="item-l">发行总张数</div>
              <div class="item-r">828</div>
            </li>
            <li class="flex">
              <div class="item-l">抽签开始日</div>
              <div class="item-r">2023-05-10</div>
            </li>
            <li class="flex">
              <div class="item-l">抽签截止日</div>
              <div class="item-r">2023-05-12</div>
            </li>
            <li class="flex">
              <div class="item-l">抽签日</div>
              <div class="item-r">2023-05-16</div>
            </li>
            <li class="flex">
              <div class="item-l">发券日</div>
              <div class="item-r">2023-05-22</div>
            </li>
          </ul>
          <div class="item flex ">
            <span class="item-l">数量(张)</span>
            <span class="item-r">1张=1000股</span>
          </div>
          
          <div class="item flex">
            <span class="item-l">可用额度</span>
            <span class="item-r">元</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { _getQuotes, _ItemUserOptionalItemAdd } from '@/service/quotes.api'
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { REQUEST_TIMER } from '@/config'

const { t } = useI18n()
const router = useRouter()
const listData = ref([])
const interval = ref(null)
const isLoading = ref(false)

onMounted(() => {
  fetchQuotes()
  // interval.value = setInterval(() => {
  // }, REQUEST_TIMER)
})

onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})

const fetchQuotes = () => {
  const params = {}
  if (params.length > 0) {
    isLoading.value = true
    _getQuotes(params).then(data => {
      isLoading.value = false
      listData.value = data
    }).catch((e) => {
      isLoading.value = false
    })
  } else {
    listData.value = []
  }
}

const onRoute = (path) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
:deep(.van-loading) {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

:deep(.van-nav-bar__title) {
  position: relative;
  top: 2px;
  max-width: 72%;
}

:deep(.van-nav-bar__title) {
  flex: 1;
}

:deep(.van-field__control) {
  font-size: 16px;
  font-weight: 500;
  caret-color: #3157BE;
}

.container-box {
  .header {
    padding: 0 14px;
    margin: 8px 0;

    .title {
      font-weight: 600;
      font-size: 16px;
      color: $text_color;
    }

    .icon-group {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        padding: 8px;
      }
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #192137;
    height: 120px;

    .name {
      font-size: 16px;
      font-weight: 700;
    }

    .code {
      margin: 0 0 10px;
      font-size: 12px;
      color: #747A8F;
    }

    .num {
      font-size: 14px;
      color: #F33368;
    }
  }

  .details {
    padding: 0 14px;

    .detail-info {
      ul {
        padding-bottom: 20px;
        border-bottom: 1px solid $border_color;
      }

      li {
        margin-top: 20px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;

        .item-l {
          color: #B7BDD1;
        }

        .item-r {
          color: #fff;
        }
      }

      .item {
        margin-top: 20px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;

        .item-l {
          color: #B7BDD1;
        }

        .item-r {
          color: #747A8F;
          font-size: 12px;
        }
      }
    }
  }
}
</style>