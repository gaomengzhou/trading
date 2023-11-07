<template>
    <div class="newIpo px-5">
        <van-list v-model:loading="loading" :finished="finished" :finished-text="$t('没有更多了')" @load="onLoad">
            <div v-for="(item, index) in list" :key="index" class="border-b-color list-div">
                <div class="flex justify-between mt-4">
                    <div>联宝</div>
                    <div class="colorMain">承销价30.00</div>
                </div>
                <div class="flex justify-between text_color6 mt-10">
                    <div>状态</div>
                    <div>差价</div>
                    <div>市价</div>
                </div>
                <div class="flex justify-between">
                    <div class="red">进行中</div>
                    <div class="red">18.45</div>
                    <div>48.35</div>
                </div>
                <div class="flex justify-between mt-10">
                    <div>
                        <div class="text_color6">截止日</div>
                        <div>2034-04-03</div>
                    </div>
                    <div>
                        <van-circle layer-color="#27293B" :stroke-width="100" color="#F43368"
                            v-model:current-rate="currentRate" :rate="30" :speed="100" size="70px" :text="text">
                            <div class="circle-text">
                                <div>30%</div>
                                <div>溢差价</div>
                            </div>
                        </van-circle>
                    </div>
                    <div class="text-right">
                        <div class="text_color6">总抽签张</div>
                        <div>828</div>
                        <div class="drawlots-but" @click="goToDetail(111)">抽签 <van-icon name="arrow" /></div>
                    </div>
                </div>

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
const currentRate = ref(0);

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

const goToDetail = (id) => {
    router.push({
        path: "/ipo/drawLotsDetail",
        query: {
            id
        }
    })
}

</script>
<style lang="scss" scoped>
.newIpo {
    .list-div {
        padding: 20px 0;

        .circle-text {
            font-size: 12px;
            padding-top: 10px;
        }

        .drawlots-but {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid $active_line;
            width: 80px;
            height: 30px;
            margin-top: 5px;
            border-radius: 5px;
            color: $color-main;
        }
    }
}
</style>