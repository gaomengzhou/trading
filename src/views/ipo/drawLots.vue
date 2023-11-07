<template>
    <div class="drawLots">
        <fx-header>
            <template #title>
                {{ t('抽签') }}
            </template>
            <template #right>
                {{ t('抽签记录') }}
            </template>
        </fx-header>
        <div class="">
            <div class="main2_background stock-box text-center">
                <div>联宝</div>
                <div class="theCode">(6821)</div>
                <div class="mt-3 red money">30.00</div>
            </div>
            <div class="px-4 border-b-color">
                <div class="flex justify-between cell-div">
                    <div class="text_color6">{{ t('发行总张数') }}</div>
                    <div>200</div>
                </div>
                <div class="flex justify-between cell-div">
                    <div class="text_color6">{{ t('抽签开始日') }}</div>
                    <div>20</div>
                </div>
                <div class="flex justify-between cell-div">
                    <div class="text_color6">{{ t('抽签截止日') }}</div>
                    <div>2023-03-01</div>
                </div>
                <div class="flex justify-between cell-div">
                    <div class="text_color6">{{ t('抽签日') }}</div>
                    <div>2023-03-01</div>
                </div>
                <div class="flex justify-between cell-div">
                    <div class="text_color6">{{ t('发卷日') }}</div>
                    <div>2023-03-01</div>
                </div>
            </div>
            <div class="px-4">
                <div class="flex justify-between cell-div">
                    <div class="text_color6">{{ t('数量(张)') }}</div>
                    <div class="theCode">1张=1000股</div>
                </div>
                <div class="drawLots-input">
                    <input class="inputBackground" type="number" />
                </div>
                <div class="flex justify-between cell-div">
                    <div class="text_color6">{{ t('可用额度') }}</div>
                    <div class="theCode">1元</div>
                </div>
                <div class="drawLots-input">
                    <input class="inputBackground" type="number" />
                </div>
            </div>
            <div class="px-4 mt-20">
                <van-button class="w-full" style="margin-top:10px;" @click="submitBind" type="primary">{{ $t('一键抽签') }}
                </van-button>
            </div>
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
.drawLots {
    font-size: 14px;

    .stock-box {
        padding: 20px 0;
        font-size: 18px;

        .money {
            font-size: 24px;
            font-weight: bold;
        }
    }

    .cell-div {
        padding: 15px 0;
    }

    .theCode {
        color: #747A8F;
        font-size: 13px;
    }

    .drawLots-input {
        input {
            width: 100%;
            height: 40px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
        }
    }

}
</style>