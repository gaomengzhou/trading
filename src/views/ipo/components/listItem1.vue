<template>
    <div class="listItem px-5">
        <div class="tab-header-1 px-4 text_color6">
            <div class="td-2">股票名称</div>
            <div class="td">
                <div class="flex items-center">
                    {{ $t('最新价') }}
                    <div class="filter-box ml-2">
                        <div class="filter-icon" :class="[sortVal == 0 ? 'icon_top1_active' : 'icon_top1']"
                            @click="listSort(3)">
                        </div>
                        <div class="filter-icon" :class="[sortVal == 1 ? 'icon_top2_active' : 'icon_top2']"
                            @click="listSort(4)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="td">
                <div class="flex items-center">
                    {{ $t('发行价') }}
                    <div class="filter-box ml-2">
                        <div class="filter-icon" :class="[sortVal == 0 ? 'icon_top1_active' : 'icon_top1']"
                            @click="listSort(3)">
                        </div>
                        <div class="filter-icon" :class="[sortVal == 1 ? 'icon_top2_active' : 'icon_top2']"
                            @click="listSort(4)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="td">
                <div class="flex items-center">
                    {{ $t('预计上市时间') }}
                    <div class="filter-box ml-2">
                        <div class="filter-icon" :class="[sortVal == 0 ? 'icon_top1_active' : 'icon_top1']"
                            @click="listSort(3)">
                        </div>
                        <div class="filter-icon" :class="[sortVal == 1 ? 'icon_top2_active' : 'icon_top2']"
                            @click="listSort(4)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="td">
                <div class="flex items-center">
                    {{ $t('上市以来涨幅') }}
                    <div class="filter-box ml-2">
                        <div class="filter-icon" :class="[sortVal == 0 ? 'icon_top1_active' : 'icon_top1']"
                            @click="listSort(3)">
                        </div>
                        <div class="filter-icon" :class="[sortVal == 1 ? 'icon_top2_active' : 'icon_top2']"
                            @click="listSort(4)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="td">
                <div class="flex items-center">
                    {{ $t('首日涨幅') }}
                    <div class="filter-box ml-2">
                        <div class="filter-icon" :class="[sortVal == 0 ? 'icon_top1_active' : 'icon_top1']"
                            @click="listSort(3)">
                        </div>
                        <div class="filter-icon" :class="[sortVal == 1 ? 'icon_top2_active' : 'icon_top2']"
                            @click="listSort(4)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="td">
                <div class="flex items-center">
                    {{ $t('上市30日涨幅') }}
                    <div class="filter-box ml-2">
                        <div class="filter-icon" :class="[sortVal == 0 ? 'icon_top1_active' : 'icon_top1']"
                            @click="listSort(3)">
                        </div>
                        <div class="filter-icon" :class="[sortVal == 1 ? 'icon_top2_active' : 'icon_top2']"
                            @click="listSort(4)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="td">
                <div class="flex items-center">
                    {{ $t('上市60日涨幅') }}
                    <div class="filter-box ml-2">
                        <div class="filter-icon" :class="[sortVal == 0 ? 'icon_top1_active' : 'icon_top1']"
                            @click="listSort(3)">
                        </div>
                        <div class="filter-icon" :class="[sortVal == 1 ? 'icon_top2_active' : 'icon_top2']"
                            @click="listSort(4)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-list v-model:loading="loading" :finished="finished" :finished-text="$t('没有更多了')" @load="onLoad">
            <div v-for="(item, index) in list" :key="index" class="py-5 px-5">
                <div class="td-2">
                    <div class="list-title">Claire’s Holdi Holdi Holdi Holdi</div>
                    <div class="text_color6">PAPL NASDAQ</div>
                </div>
                <div class="td">15.23</div>
                <div class="td">14.33</div>
                <div class="td red">-1.5%</div>
                <div class="td red">-1.5%</div>
                <div class="td red">-1.5%</div>
                <div class="td red">-1.5%</div>
                <div class="td red">-1.5%</div>
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
const sortVal = ref(5)

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
    width: 100%;
    padding: 10px 10px;
    overflow-x: scroll;
    white-space: nowrap;

    .flex-2 {
        flex: 2;
    }

    .list-title {
        width: 100px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }



    .tab-header-1 {
        font-size: 13px;
        color: #747A8F;
    }

    .td-2 {
        width: 150px;
        display: inline-block;
    }

    .td {
        display: inline-block;
        width: 120px;

        .filter-box {
            .filter-icon {
                width: 8px;
                height: 6px;
            }

            .icon_top1 {
                background: url('@/assets/image/icon_top1.png') no-repeat center;
                background-size: 100% 100%;
            }

            .icon_top2 {
                background: url('@/assets/image/icon_top2.png') no-repeat center;
                background-size: 100% 100%;
                margin-top: 2px;
            }

            .icon_top1_active {
                background: url('@/assets/image/icon_top3.png') no-repeat center;
                background-size: 100% 100%;
            }

            .icon_top2_active {
                background: url('@/assets/image/icon_top4.png') no-repeat center;
                background-size: 100% 100%;
                margin-top: 2px;
            }
        }
    }

}</style>