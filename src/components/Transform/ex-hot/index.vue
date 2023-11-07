<template>
  <div class="list-hot font-28">
    <div class="hotBox">
      <div v-for="item in listData" :key="item.id" class="box-border">
        <ul class="box-border flex flex-col w-full px-16" @click="onItemClick(item)">
          <li class="flex items-center justify-between mb-16">
            <p class="flex items-end items-center">
              <strong class="font-400">{{ item.symbol && item.symbol.toUpperCase() || '--' }}</strong>
              <span class="grey font-400">{{ item.name && item.name.replace(item.symbol.toUpperCase(), '') ||
                '--' }}</span>
              <span class="font-18" :class="item.change_ratio > 0 ? 'green' : 'red'">{{ item.change_ratio > 0
                ?
                '+' : '' }}{{ item.change_ratio }}%</span>
            </p>
          </li>
          <li class="mb-16">
            <p>
              <strong class="font-700 font-36" :class="item.change_ratio > 0 ? 'green' : 'red'">{{
                item.close || '--' }}</strong><br />
              <span class="grey font-400 font-22">≈ {{ currency.currency_symbol }}{{ item.close && (item.close
                *
                currency.rate).toFixed(2) || '--'
              }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fixDate } from "@/utils";
export default {
  data() {
    return {
      fixDate
    }
  },
  components: {
  },
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters({ currency: 'home/currency' })
  },
  methods: {
    onItemClick(item) { // 点击进入合约交易
      this.$router.push({
        path: `/cryptos/trendDetails/${item.symbol}`,
        query: { type: 'cryptos' }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  .list-hot {
    font-size: 26px;

    p {
      color: $text_color1;
    }
  }

  .red {
    color: #E35561
  }

  .green {
    color: $green
  }

  .grey {
    color: $text_color1;
  }

  .hotBox {
    display: flex;

    >div {
      flex: 1;
    }
  }
}
</style>