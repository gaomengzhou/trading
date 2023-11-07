<template>
    <div class="lotteryRecord">
        <fx-header>
            <template #title>
                {{ t('新股库存') }}
            </template>
            <template #right>
                <img class="search-icon" src="@/assets/image/optional/search.png" alt="">
            </template>
        </fx-header>
        <div class="px-5">
            <div class="flex  py-10 border-b-color  border-t-color  justify-between ">
                <div>
                    <div>市值</div>
                    <div>1555.22</div>
                </div>
                <div>
                    <div>库存损益</div>
                    <div class="red">-1555.22</div>
                </div>
                <div>
                    <div>可用额度</div>
                    <div>1555.22</div>
                </div>
            </div>
            <div class="tab-header flex px-5 py-5 text_color6">
                <div class="flex-1">名称/代码</div>
                <div class="flex-1 text-center">价格/申请量</div>
                <div class="flex-1 text-center">中签/认缴额</div>
                <div class="flex-1 text-right">状态</div>
            </div>
            <van-list v-model:loading="loading" :finished="finished" :finished-text="$t('没有更多了')" @load="onLoad">
            <div v-for="(item, index) in list" :key="index" class="list-div flex">
                <div class="flex-1">
                    <div class="list-title">Claire’s Holdi Holdi Holdi Holdi</div>
                    <div class="text_color6">PAPL</div>
                </div>
                <div class="flex-1 text-center">3.2/3.2</div>
                <div class="flex-1 text-center">3.2/3.2</div>
                <div class="flex-1 text-right">申购中</div>
            </div>
        </van-list>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
onMounted(() => {


})
const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
};

</script>
<style lang="scss" scoped>
.lotteryRecord {
    font-size: 14px;

    .search-icon {
        width: 23px;
        height: 23px;
    }

    .tab-header {
        font-size: 13px;
        color: #747A8F;
    }
    .flex-2{
        flex: 2;
    }
    .list-div {
        padding: 20px 0;

        .list-title {
            width: 80px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}
</style>