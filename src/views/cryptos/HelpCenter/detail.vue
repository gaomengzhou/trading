<template>
  <div id="cryptos">
    <div class="CommonProblem">
      <assets-head :title="$t('问题详情')"></assets-head>
      <div class="font-32 px-32 mt-36 font-4 box-border textColor">
        {{ data.title }}
      </div>
      <!--    页面上有br标签，说明这一段是html，这里需要使用到vue的v-html指令-->
      <div class="font-32 px-32 mt-36 font-4 box-border textColor" v-html="data.content">
      </div>
    </div>
  </div>
</template>

<script>
import assetsHead from '@/components/Transform/assets-head/index.vue'
export default {
  name: "HelpDetail",
  components: {
    assetsHead
  },
  data() {
    return {
      data: null
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/helpCenter')
    },
  },
  created() {
    this.data = this.$route.query
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
  .Problem_detail {

    .detail_title {
      text-decoration: underline;
    }
  }
}
</style>