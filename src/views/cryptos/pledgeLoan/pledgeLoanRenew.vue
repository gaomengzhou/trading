<template>
    <div id="cryptos">
        <div class="pledgeLoanRenew">
            <assets-head :title="$t('续借')"></assets-head>
            <div class="contentBox">
                <div class="content mt-24 box-shad tabBackground">
                    <div class="mb-38">
                        <div class="font-32 textColor">{{ $t('借款') }}</div>
                        <div class="flex mt-20 h-96 items-center inputBox inputBackground1 textColor">
                            <input class="h-full pl-22 inputBackground1" type="text" v-model="loanAmount"
                                @input="changeMount" :placeholder="$t('请输入借款数量')">
                            <div class="right w-252 h-62 flex items-center pl-26 box-border relative" @click="openSelect">
                                <img src="@/assets/image/USD.png" class="w-48 h-48" alt="">
                                <span class="ml-14 mr-30">USD</span>
                                <img src="@/assets/image/icon-more.png" alt="logo" class="w-24 h-24" />
                                <div class="slectBox" v-show="isShow" @click.stop="isShow = false;">
                                    <div class="h-64 lh-64 border-b-color">Select</div>
                                    <div class="flex items-center h-80">
                                        <img src="@/assets/image/USD.png" class="w-40 h-40" alt="">
                                        <span class="ml-14 font-24 text-grey">USD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="mt-22 text-grey font-24 flex justify-between">
                            <span>{{ $t('强平价格') }}({{ pledgeCurrency ? pledgeCurrency.toUpperCase() : '--' }}/USD)</span>
                            <span class="textColor">{{ closeOut || '--' }}</span>
                        </p>
                        <p class="mt-24 text-grey font-24 flex justify-between">
                            <span>{{ $t('质押率') }}</span>
                            <span class="textColor">{{ pledgeRate !== '' ? (pledgeRate * 10000 / 100).toFixed(2) : '--'
                            }}%</span>
                        </p>
                        <p class="mt-24 text-grey font-24 flex justify-between">
                            <span>{{ $t('小时利率') }}</span>
                            <span class="textColor">{{ hourlyRate || '--' }}</span>
                        </p>
                        <p class="mt-24 text-grey font-24 flex justify-between">
                            <span>{{ $t('日利率') }}</span>
                            <span class="textColor">{{ hourlyRate ? hourlyRate * 24 : '--' }}</span>
                        </p>
                        <div class="queIcon mt-8" @click="showMask = true"><img src="@/assets/image/skyQuestion.png"
                                class="w-24 h-24" alt=""></div>
                        <p class="mt-48 font-32 text-grey flex justify-between">
                            <span>{{ $t('总利息') }}</span>
                            <span class="textColor">{{ interestAmount || '--' }}&nbsp;USD</span>
                        </p>
                        <p class="mt-48 font-32 text-grey flex justify-between">
                            <span>{{ $t('预计还款') }}</span>
                            <span class="textColor">{{ debtAmount || '--' }}&nbsp;USD</span>
                        </p>
                        <div class="h-96 lh-96 pledgeLoan_background rounded-lg text-center text-black font-34 mt-48"
                            @click="submitRefurbishOrder">{{ $t('借币') }}</div>
                    </div>
                </div>
            </div>
            <rule-mask v-model="showMask"></rule-mask>
        </div>
    </div>
</template>

<script>
import assetsHead from "@/components/Transform/assets-head/index.vue";
import ruleMask from "./ruleMask.vue";
import { _getLoanParam, _refurbishOrder } from "@/service/pledgeLoan.js";
import { debounce } from '@/utils/utis'
import { showToast } from "vant";
export default {
    props: {

    },
    components: {
        assetsHead,
        ruleMask
    },
    data() {
        return {
            id: '',
            isShow: false,
            showMask: false,
            loanAmount: '',
            closeOut: '',
            debtAmount: '',
            hourlyRate: '',
            interestAmount: '',
            pledgeRate: '',
            pledgeCurrency: ''
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.pledgeCurrency = this.$route.query.pledgeCurrency
    },
    methods: {
        openSelect() {
            this.isShow = !this.isShow
        },
        changeMount() {
            if (this.loanAmount !== '') {
                this.loanAmount = this.loanAmount.replace(/[^0-9]/g, '')
                this.debounceFn()
            }
        },
        debounceFn: debounce(function () {
            this.getLoanParamFn()
        }, 500),
        getLoanParamFn() {
            _getLoanParam({
                loanAmount: this.loanAmount,
                loanOrderId: this.$route.query.id,
            }).then(res => {
                this.closeOut = res.closeOut
                this.debtAmount = res.debtAmount
                this.hourlyRate = res.hourlyRate
                this.interestAmount = res.interestAmount
                this.pledgeRate = res.pledgeRate
            }).catch(error => {
                if (error.code == 20) {
                    if (error.msg * 1 < 0) {
                        showToast(this.$t('质押数量已达到最大可借额度'))
                    } else {
                        showToast(this.$t('最大可借:') + error.msg)
                    }

                } else if (error.code === 'ECONNABORTED') { showToast(this.$t('网络超时！')); }
                else if (error.msg !== undefined) { showToast(this.$t(error.msg)); }
            })
        },
        submitRefurbishOrder() {
            if (this.loanAmount == '') {
                showToast(this.$t('请输入借款数量'))
                return false;
            }
            _refurbishOrder({
                loanOrderId: this.id,
                loanAmount: this.loanAmount
            }).then(res => {
                showToast(this.$t('续借成功'));
                this.$router.push('/cryptos/pledgeLoanOrder')
            }).catch(error => {
                if (error.code === 'ECONNABORTED') { showToast(this.$t('网络超时！')); }
                else if (error.msg !== undefined) { showToast(this.$t(error.msg)); }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
    .pledgeLoanRenew {
        width: 100%;
        box-sizing: border-box;
    }

    .contentBox {
        padding: 0 32px;
        position: relative;
        overflow: auto;
    }

    .content {
        border-radius: 8px;
        padding: 36px 30px 36px 34px;
        position: relative;

        .inputBox {
            input {
                flex: 1;
                border: none;
            }

            .right {
                border-left: 1px solid #B8BCC5;
            }
        }

    }

    .slectBox {
        position: absolute;
        left: 0;
        top: 114px;
        width: 100%;

        background: $main_background;
        border-radius: 4px;
        padding: 0px 20px 76px 20px;
        box-sizing: border-box;
        border: 1px solid $border_color;
        z-index: 2;
    }
}
</style>