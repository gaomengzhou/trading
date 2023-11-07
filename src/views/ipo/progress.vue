<template>
    <div class="progress">
        <div class="header-box">
            <van-nav-bar @click-left="onClickLeft">
                <template #left>
                    <div class="flex items-center">
                        <van-icon name="arrow-left" class="left-icon" />
                        <div class="left-div text-left ml-2">
                            <div class="title">AQBUG</div>
                            <div class="text">Aquarius II Acquisition Corp. NASDADQ</div>
                        </div>
                    </div>
                </template>
                <template #right>
                    <img class="search-icon" src="@/assets/image/optional/search.png" alt="">
                </template>
            </van-nav-bar>
            <div class="progress-div">
                <div class="title">预计开始交易时间</div>
                <div class="text">待定</div>
            </div>
        </div>
        <div class="px-5">
            <div class="flex  py-5   justify-between ">
                <div>
                    <div class="textColor1">市盈率(净)</div>
                    <div>1555.22</div>
                </div>
                <div>
                    <div class="textColor1">市销率</div>
                    <div class="">-1555.22</div>
                </div>
                <div>
                    <div class="textColor1">市销率</div>
                    <div>1555.22</div>
                </div>
            </div>
            <div class="flex  py-5   justify-between ">
                <div class="flex-1">
                    <div class="textColor1">市值</div>
                    <div>1555.22</div>
                </div>
                <div class="flex-1 text-center">
                    <div class="textColor1">所属行业</div>
                    <div class="">-1555.22</div>
                </div>
                <div class="flex-1"></div>
            </div>
            <div class="tab-header flex px-5 py-5 text_color6">
                <div class="flex-1">名称/代码</div>
                <div class="flex-1 text-center">价格/申请量</div>
                <div class="flex-1 text-center">中签/认缴额</div>
                <div class="flex-1 text-right">状态</div>
            </div>
            <van-steps direction="vertical" :active="0">
                <van-step>
                 <div>递交招股书</div>
                 <div class="examine-but mt-5">查看招股书></div>
                </van-step>
                <van-step>
                    <div>开始申购</div>
                    <div class="tip mt-3">申购区间价: 10 - 10</div>
                    <div class="tip mt-3">预计发行股本：待定</div>
                </van-step>
                <van-step>
                    <div>开始申购</div>
                    <div class="tip mt-3">发行价：30</div>
                    <div class="tip mt-3">发行后总股本：待定</div>
                </van-step>
                <van-step>
                    <div>公布中签,上市</div>
                    <div class="tip mt-3">发行价：30</div>
                    <div class="tip mt-3">发行后总股本：待定</div>
                </van-step>
            </van-steps>
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
onMounted(() => {


})


</script>
<style lang="scss" scoped>
.pt-3 {
    padding-top: 0 !important;
}

.progress {
    font-size: 14px;

    .header-box {
        height: 200px;
        padding-top: 10px;
        // background: linear-gradient(to bottom right, #6352BC, #2F74A9);
        background: linear-gradient(to bottom right, #6352BC, #2F74A9);
    }

    .search-icon {
        width: 23px;
        height: 23px;
    }

    .left-icon {
        font-size: 22px;
    }

    .left-div {
        .title {
            font-weight: bold;
            font-size: 16px;
        }

        .text {
            font-size: 13px;
        }
    }

    .progress-div {
        text-align: center;
        padding-top: 50px;

        .title {
            font-size: 13px;
        }

        .text {
            font-weight: bold;
            font-size: 16px;
        }
    }

    :deep(.van-steps) {
        background: $selectSymbol_background;

        .van-step__title {
            color: $text_color;

            .time {
                color: #747A8F;
                margin: 5px 0;
            }

        }

        .van-step__line {
            background-color: $step-border;
        }

        .van-icon-checked::before {
            content: '';
            background-color: $mainBgColor;
            width: 6px;
            height: 6px;
            box-shadow: 0 0 0px 4px $color_main;
            border-radius: 50%;
        }
        .van-step__circle {
            background-color: #202840;
            width: 6px;
            height: 6px;
            box-shadow: 0 0 0px 4px #15284F;
        }

        .van-step--vertical:not(:last-child):after {
            border-bottom-width: 0px;
            border-color: $border_color;
        }
    }
    .examine-but{
        padding: 5px 10px;
        border: 1px solid $color_main;
        max-width: 100px;
        text-align: center;
        border-radius: 5px;
        color:  $color_main;
        font-size: 13px;
    }
    .tip{
        font-size: 13px;
        color: $text_color6;
    }
}
</style>