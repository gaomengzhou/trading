<template>
  <div id="cryptos">
    <div class="announce">
      <assets-head :title="$t('公告')" />
      <div class="content">
        <div class="mb-50 tabBackground py-44 px-32 rounded-lg" v-for="(item, index) in list" :key="index"
          @click="toDetail(item.uuid)">
          <div class="textColor font-32">{{ item.title }}</div>
          <div class="mt-62 flex justify-between text-grey font-28">
            <div>{{ item.startTime.substring(0,10) }}</div>
            <div class="flex items-center">
              <span class="mr-24">{{ $t('详情') }}</span>
              <img src="../../../assets/image/userCenter/more.png" alt="" class="w-26 h-26" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import assetsHead from "@/components/Transform/assets-head/index.vue";
import { _getNewsList1 } from '@/service/user.api'
import { dataTimeEx } from '@/utils/utis'
export default {
  props: {

  },
  components: {
    assetsHead
  },
  data() {
    return {
      dataTimeEx,
      list: []
    }
  },
  mounted() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      _getNewsList1({
        language: this.$i18n.locale,
      }).then(res => {
        this.list = res
        this.list = this.list.sort((a, b) => b.startTime - a.startTime);
      })
    },
    toDetail(id) {
      this.$router.push({ path: '/cryptos/announceDetail', query: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  .announce {
    width: 100%;
    box-sizing: border-box;
  }

  .content {
    padding: 40px 32px;
  }

  .title {
    text-decoration: underline;
  }
}
</style>