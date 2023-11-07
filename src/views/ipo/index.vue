<template>
    <div class="ipo-index" >
        <fx-header @back="back()" :back="false">
            <template #title>
                {{ t('IPO中心') }}
            </template>
        </fx-header>
        <van-tabs v-model:active="active" title-inactive-color="#fff" title-active-color="#fff">
            <van-tab v-for="(item, index) in tabList" :key="index" :title="item.label">
                <new-ipo v-if="active === 0"></new-ipo>
                <div v-if="active === 1">
                    <div class="tab-header flex px-5 py-5 text_color6">
                        <div class="flex-2">股票名称</div>
                        <div class="flex-1">募集基金</div>
                        <div class="flex-1 text-right">提交招股书日期</div>
                    </div>
                    <list-item></list-item>
                </div>
                <div v-if="active === 2">
                    <div class="tab-header flex px-5 py-5 text_color6">
                        <div class="flex-2">股票名称</div>
                        <div class="flex-1">发行价</div>
                        <div class="flex-1 text-right">发行量</div>
                    </div>
                    <list-item></list-item>
                </div>
                <div v-if="active === 3">
                    <list-item1></list-item1>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import newIpo from './components/newIpo.vue';
import listItem from './components/listItem.vue';
import listItem1 from './components/listItem1.vue';
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const defaultTabActive = +route.query.tabActive || 0
const active = ref(defaultTabActive)
const tabList = ref([
    { label: '新股认购' },
    { label: '递交招股书' },
    { label: '待上市' },
    { label: '已上市' },
])
onMounted(() => {


})

const back = () =>{
  router.push('/quotes/index?tabActive=1')
}

</script>
<style lang="scss" scoped>
.ipo-index {
    font-size: 14px;

    :deep(.van-tabs__nav) {
        background: $mainBgColor;
    }

    :deep(.van-tab--active) {
        font-size: 16px;
        font-weight: bold;
    }

    .flex-2 {
        flex: 2;
    }

    .tab-header {
        font-size: 13px;
        color: #747A8F;
    }
}</style>