<template>
  <div>
    <div class="contact-futrue">
      <div class="font-24 text-grey mb-24">{{ $t('交割时间') }}</div>
      <ul class="flex flex-wrap w-full">
        <li v-for="(item, index) in initFutrue.para" v-if="initFutrue.para" :key="item.uuid"
          class="h-92 flex items-center mb-22" @click="onSelect(item, index)">
          <p class="w-95 h-full flex justify-center items-center font-22 flex-1"
            :class="active === item.para_id ? 'bg-light-blue text-white' : 'delivery_left_tab_background textColor'">{{
              item.time_num +
              item.time_unit.substr(0, 1) }}</p>
          <p class="w-125 h-full flex justify-center items-center font-22 flex-1"
            :class="active === item.para_id ? 'bg-dark-blue text-white' : 'delivery_tab_background textColor'">{{
              item.profit_ratio }}%</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContractFutrue',
  props: {
    initFutrue: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      active: '',
      initParam: [] // 初始化参数
    }
  },
  created() {
    if (this.initFutrue.para.length > 0) {
      this.active = this.initFutrue.para[0].para_id || ''
      this.$emit('paraId', { id: this.active, index: 0 })
    }
  },
  methods: {
    onSelect(item, index) { // 选中
      this.active = item.para_id
      this.$emit('paraId', { id: this.active, index })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";


.bgDark {

  background: 242424
}

.bg-light-blue {
  background: $btn_main;
}

.bg-dark-blue {
  background: #1255A3;
}
</style>
