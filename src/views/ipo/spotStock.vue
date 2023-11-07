<template>
    <div class="lotteryRecord">
        <fx-header>
            <template #title>
                {{ t('现股库存') }}
            </template>
            <template #right>
                <img class="search-icon" src="@/assets/image/optional/search.png" alt="">
            </template>
        </fx-header>
        <div class="px-5">
            <div class="flex  py-10 border-b-color  border-t-color  justify-between ">
                <div>
                    <div class="text_color6">市值</div>
                    <div>1555.22</div>
                </div>
                <div>
                    <div class="text_color6">库存损益</div>
                    <div class="red">-1555.22</div>
                </div>
                <div>
                    <div class="text_color6">可用额度</div>
                    <div>1555.22</div>
                </div>
            </div>
            <van-list v-model:loading="loading" :finished="finished" :finished-text="$t('没有更多了')" @load="onLoad">
            <div v-for="(item, index) in list" :key="index" class="list-div">
                <div class="flex  justify-between">
                    <div>南章</div>
                    <div>2014-01-01 10:20</div>
                </div>
                <div class="flex  justify-between">
                    <div class="text_color6">472</div>
                </div>
                <div class="flex  justify-between">
                    <div class="text_color6">库存损益</div>
                    <div class="red">-1555.22</div>
                </div>
                <div class="flex  justify-between">
                    <div class="text_color6">损益百分比</div>
                    <div class="red">155.22%</div>
                </div>
                <div class="flex  justify-between">
                    <div class="text_color6">交易股数</div>
                    <div>1000</div>
                </div>
                <div class="flex  justify-between">
                    <div class="text_color6">信用金</div>
                    <div>2533.00</div>
                </div>
                <div class="flex  justify-between">
                    <div class="text_color6">库存市值</div>
                    <div>4670.00</div>
                </div>
                <div class="flex  justify-between">
                    <div class="text_color6">买入</div>
                    <div>4670.00</div>
                </div>
                <div class="flex  justify-between">
                    <div class="text_color6">现价</div>
                    <div>4670.00</div>
                </div>
                <button class="but bg-red">卖出</button>
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
    .list-div {
        padding: 20px 20px;
        background: $input_background;
        border-radius: 10px;
        margin-top: 20px;
        .but{
            width: 100%;
            height: 42px;
            margin-top: 10px;
        }
        .bg-red{
            background: $red;
        }
    }
}
</style>