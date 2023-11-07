<template>
    <div id="cryptos">
        <div class="exchangeSubmit">
            <assets-head title="" :goHome="true" />
            <div class="flex flex-col items-center">
                <img src="../../../assets/image/exchange/icon_9.png" v-if="!isLoading" alt="logo"
                    class="w-150 h-150 mt-120" />
                <img src="../../../assets/image/exchange/icon_8.png" v-if="isLoading" alt="logo"
                    class="w-100 h-150 mt-120" />
                <p class="font-38 text-center pt-60 textColor" v-if="!isLoading">{{ $t('闪兑成功') }}</p>
                <!-- <p class="font-50 mt-23 text-center textColor">{{ detail.rate * detail.volume }}<span class="text-grey font-35">
                    {{ detail.symbol_to && detail.symbol_to.toUpperCase() }}</span></p> -->
                <span class="text-grey font-35 pt-60" v-if="isLoading">
                    {{ $t('结算中') }}
                </span>

                <ul class=" px-30 pt-20 pb-34 mt-53 tabBackground rounded flex-1 w-full box-border" style="width: 90%;">
                    <li class="flex items-center">
                        <div class="flex-1 textColor text-left">
                            <div class="text-grey font-28 mt-20">{{ $t('从') }}</div>
                            <div class="font-30 mt-30">{{ detail.volume }}{{ detail.symbol && detail.symbol.toUpperCase() }}
                            </div>
                        </div>
                        <img src="../../../assets/image/exchange/icon_6.png" class="w-30 h-20" style="margin-top:-28px" />

                        <div class="flex-1 textColor text-right">
                            <div class="text-grey font-28 mt-20">{{ $t('至') }}</div>
                            <div class="font-30 mt-30" v-if="detail.volume">{{ (detail.volume * detail.rate).toFixed(5) }}
                            {{detail.symbol_to&& detail.symbol_to.toUpperCase() }}</div>
                        </div>
                    </li>
                    <!-- <li class="flex justify-between font-28 pt-20  mt-40  textColor">
                        <span class="text-grey">{{ $t('交易手续费') }}</span>
                        <span class="color-green">1</span>
                    </li> -->
                    <li class="flex justify-between font-28 pt-20  textColor">
                        <span class="text-grey">{{ $t('类型') }}</span>
                        <span class="textColor">{{ $t('市价') }}</span>
                    </li>
                    <!-- <li class="flex justify-between font-28 pt-25 mt-40">
                    <span class="text-grey">{{ $t('闪兑自') }}</span>
                    <span class="textColor">{{ detail.volume }} {{ detail.symbol && detail.symbol.toUpperCase() }}</span>
                </li> -->
                    <li class="flex justify-between font-28 pt-20  textColor">
                        <span class="text-grey">{{ $t('汇率') }}</span>
                        <div class="textColor flex items-center">{{ toValue }}≈{{ formValue }}
                            <img src="../../../assets/image/exchange/icon_4.png" @click="convert" class="w-22 h-22 ml-10" />
                        </div>
                    </li>

                </ul>
                <p class="tips px-35" v-if="isLoading">
                    <van-icon name="warning-o" />{{ $t('您的订单正在处理中，可能需要5分钟才能完成。感谢您的耐心等待。您可以在订单历史中查看状态。') }}
                </p>
                <div class="h-100 rounded flex justify-between px-32 box-border items-center mt-90 mb-48 text-white w-full">
                    <p class="but rounded flex justify-center items-center bgDark"
                        @click="route('/quotes/index?tabActive=1')">
                        {{ $t('返回首页') }}</p>
                    <p class="but rounded btnMain text-white flex justify-center items-center"
                        @click="route('/cryptos/exchangeHistory')">
                        {{ $t('查看历史') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import assetsHead from "@/components/Transform/assets-head/index.vue";
export default {
    data() {
        return {
            detail: {},
            toValue: '',
            formValue: '',
            isLoading: true
        }
    },
    components: {
        assetsHead,
    },
    created() {
        setTimeout(() => {
            this.isLoading = false
        }, 2000);
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        route(path) {
            this.$router.push(path)
        },
        convert() {
            [this.toValue, this.formValue] = [this.formValue, this.toValue]
        }
    },
    beforeRouteEnter(to, from, next) {
        const { query: { data } } = to
        next(vm => {
            vm.detail = JSON.parse(data)
            vm.toValue = vm.detail.volume + vm.detail.symbol.toUpperCase()
            vm.formValue = vm.detail.rate + vm.detail.symbol_to.toUpperCase()
        })
    }
}
</script>
<style lang="scss">
@import "@/assets/init.scss";

#cryptos {
    font-size: 30px;

    .exchangeSubmit {
        width: 100%;
        box-sizing: border-box;

        .but {
            width: 340px;
            height: 100px;
        }
    }

    .bg-grey-light {
        background: $light-grey;
    }

    .bg-grey-dark {
        background: $light-grey;
    }
}
</style>
