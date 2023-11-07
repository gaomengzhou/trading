<template>
    <div id="cryptos">
        <div class="w-full">
            <assets-head :title="$t('帮助')" />
            <div class="px-32 pt-40 pb-100 c2cColor">
                <div class="text-center mb-40 font-700">
                    <div class="flex items-center justify-center" @click="$router.push({ path: '/cryptos/chat' })">
                        <van-badge class="w-35 h-33 mr-22">
                            <img class="w-full h-full " src="~@/assets/image/c2c/Vector.png" alt="">
                        </van-badge>
                        <div class="font-28">{{ $t('联系买家') }}</div>
                    </div>
                </div>
                <div class="mb-20">
                    <p class="text-grey mb-10">Q:{{ $t('买家不付款，也没有回复怎么办？') }}</p>
                    <p>
                        A:{{ $t('此订单有付款时间限制') }}&nbsp;<van-count-down class="currentColor" style="display:inline-block"
                            @finish="finish" :time="fullTime" format="mm:ss"></van-count-down>
                    </p>
                </div>
                <div class="mb-20">
                    <p class="text-grey mb-10">Q:{{ $t('我可以要求取消订单么？', { 'TITLE': TITLE }) }}</p>
                    <p>A:{{ TITLE }}&nbsp;{{ $t('无法帮助你取消订单。买家可能在下单后根据您选择的付款方式付款。') }}</p>
                </div>
                <div class="mb-20">
                    <p class="text-grey mb-10">Q:{{ $t('为什么订单支付时限这么长？') }}</p>
                    <p>A:{{ $t('付款时限由广告方设定。部分支付方式不支持实时支付。这使广告方有足够的时间来确认付款状态。提示：您可以在C2C自选区选择支付时限较短的广告进行下单。') }}</p>
                </div>
                <div class="mb-20">
                    <p class="text-grey mb-10">Q:{{ $t('我还没有收到货款，如果买家要求我提前放币怎么办？') }}</p>
                    <p>A:{{ $t('首先确保您已收到付款。一旦您点击我已确认收款,您的数字货币将立即被释放给买家。我们将无法追回您的资产损失。') }}</p>
                </div>
                <div class="mb-20">
                    <p class="text-grey mb-10">Q:{{ $t('收到买家付款后订单被取消了怎么办？') }}</p>
                    <p>A:{{ $t('与买家沟通再下单或退款给买家以避免申述') }}</p>
                </div>
            </div>
            <template v-if="state == 0">
                <div class="text-white  rounded-lg text-center fixed btnMain appeal-but" :disabled="!showBtn"
                    :class="showBtn ? 'btnMain' : 'grey_bg'" style="bottom:44px;left:16px;right:16px;border:0;z-index: 100;"
                    @click="toshensu">{{ $t('申述') }}</div>
            </template>
            <template v-else>
                <div class="text-white  rounded-lg  text-center fixed btnMain appeal-but"
                    style="bottom:44px;left:16px;right:16px;border:0;z-index: 100;" @click="toshensu">{{ $t('申述') }}</div>
            </template>
        </div>
    </div>
</template>

<script>
import {
    Badge,
    CountDown
} from "vant";
import assetsHead from "@/components/Transform/assets-head/index.vue";
export default {
    props: ['expireTimeRemain'],
    computed: {
        fullTime() {
            return this.time * 1 * 1000;
            // return parseInt(this.time) * 60
        }
    },
    components: {
        assetsHead,
        [Badge.name]: Badge,
        [CountDown.name]: CountDown,
    },
    created() {
        this.time = this.$route.query.expireTimeRemain
        this.state = this.$route.query.state
    },
    data() {
        return {
            showBtn: false,
            state: '0'
        }
    },
    methods: {
        finish() {
            this.showBtn = true
        },
        toshensu() {
            this.$router.push('/cryptos/appeal/page')
        },
    }
}
</script>

<style lang="scss" scoped>
#cryptos {
    font-size: 30px;

    .currentColor {
        color: $color_main;
    }
    .appeal-but{
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>