<template>
  <div id="cryptos">
    <div class="exchangeHistory">
      <assets-head :title="$t('闪兑历史')" :back-func="backFunc" />
      <div class="px-20 mt-70">
        <div class="flex justify-between text-grey my-21 font-30">
          <span>{{ $t('从') }}</span>
          <span>{{ $t('至') }}</span>
        </div>
        <van-list v-model="loading" :finished="finished" :finished-text="$t('已经全部加载完毕')" @load="onLoad"
          :loading-text="$t('加载中...')" :offset="130">
          <ul class="flex flex-col">
            <li v-for="item in list" :key="item.id" class="flex cell-item flex-col">
              <p class="flex justify-between  font-35   font-14  textColor">
                <span>{{ item.amount }} {{ item.symbol.toUpperCase() }}</span>
                <span>{{ item.amount_to || '--' }} {{ item.symbol_to.toUpperCase() }}</span>
              </p>
              <p class="flex font-30 justify-between  text-grey mt-19 mb-45">
                <span>{{ item.create_time }}</span>
                <span class="flex items-center">
                  <i :class="{
                    'btnMain': item.state === 'submitted',
                    'bg-red': item.state === 'canceled',
                    'bg-green': item.state === 'created',
                  }" class="block  w-16 h-16 mr-10 rounded-full"></i>
                  {{ status[item.state] }}</span>
              </p>
            </li>
          </ul>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { List } from 'vant';
import { _exchangeHistory } from '@/service/fund.api';
import assetsHead from "@/components/Transform/assets-head/index.vue";
export default {
  components: {
    assetsHead,
    [List.name]: List
  },
  data() {
    return {
      loading: true,
      finished: false,
      pageSize: 20,
      page_no: 1,
      list: [],
      status: {
        submitted: this.$t('submitted'),
        canceled: this.$t('canceled'),
        created: this.$t('已完成')
      }
    }
  },
  created() {
    // this.onLoad()

  },
  methods: {
    backFunc() {
      if (this.$route.query.type / 1 === 1) {
        if (this.$route.query.tab === 'funds') {
          this.$router.push({
            path: '/funds/index',
          })
        } else {
          this.$router.push({
            path: '/cryptos/funds',
            query: {
              tab: 1,
              type: 'cryptos'
            }
          })
        }
      } else if (this.$route.query.type / 1 === 0) {
        this.$router.push({
          path: '/cryptos/funds',
          query: {
            tab: 0,
            type: 'cryptos'
          }
        })
      } else {
        this.$router.go(-1)
      }
    },
    onLoad() { // 加载数据
      this.loading = true
      _exchangeHistory(this.page_no).then(data => {
        this.list = [...this.list, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        } else {
          this.page_no++
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss">
#cryptos {
  .exchangeHistory {
    width: 100%;
    box-sizing: border-box;
    font-size: 20px;

    .font-35 {
      font-size: 35px !important;
    }

    .font-30 {
      font-size: 30px !important;
    }

    .cell-item {
      margin-top: 30px;
    }
  }
}
</style>
