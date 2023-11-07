<template>
    <div class="listItem px-5">
        <van-list v-model:loading="loading" :finished="finished" :finished-text="$t('没有更多了')" @load="onLoad">
            <div v-for="(item, index) in list" :key="index" class="list-div flex">
                <div class="flex-2">
                    <div class="list-title">Claire’s Holdi Holdi Holdi Holdi</div>
                    <div class="text_color6">PAPL NASDAQ</div>
                </div>
                <div class="flex-1">8,2123.1</div>
                <div class="flex-1 text-right">2030/09/01</div>
            </div>
        </van-list>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
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
.listItem {
    .flex-2 {
        flex: 2;
    }

    .list-div {
        padding: 20px 0;

        .list-title {
            width: 100px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}</style>