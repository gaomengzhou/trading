<template>
    <div id="cryptos">
        <div class="repayment">
            <assets-head :title="$t('还款')"></assets-head>
            <div class="contentBox">
                <div class="content mt-24 box-shad tabBackground">
                    <div class="mb-38">
                        <div class="font-32 textColor">{{ $t('还款') }}</div>
                        <div class="flex mt-20 h-96 pr-34 items-center inputBox inputBackground1 textColor">
                            <input class="h-full pl-22 inputBackground1" type="number" v-model="repayAmount"
                                @input="changeMount" :placeholder="$t('请输入还款数量')">
                            <div class="right h-62 flex items-center pl-26 box-border relative font-30">
                                <span>USD</span>
                                <span class="skyColor ml-28" @click="repayAll">ALL</span>
                            </div>
                        </div>
                        <div class="flex items-center font-24 mt-24 text-grey">
                            {{ $t('可用余额') }}：<span class="mr-14">{{ volume || '--' }}&nbsp;USD</span><img
                                @click="$router.push('/cryptos/exchangePage')" src="@/assets/image/exchangeIcon.png"
                                class="w-28 h-28" alt="" />
                        </div>
                        <p class="mt-84 text-grey font-28 flex justify-between">
                            <span>{{ $t('总负债') }}</span>
                            <span class="textColor">{{ debtAmount || '--' }}&nbsp;USD</span>
                        </p>
                        <p class="mt-36 text-grey font-28 flex justify-between">
                            <span>{{ $t('利息') }}</span>
                            <span class="textColor">{{ interestAmount !== '' ? interestAmount : '--' }}&nbsp;USD</span>
                        </p>
                        <p class="mt-36 text-grey font-28 flex justify-between">
                            <span>{{ $t('本金还款') }}</span>
                            <span class="textColor">{{ loanAmount || '--' }}&nbsp;USD</span>
                        </p>
                        <p class="mt-36 font-32 text-grey flex justify-between">
                            <span>{{ $t('还款后质押率') }}</span>
                            <span class="textColor">{{ pledgeRate !== '' ? (pledgeRate * 10000 / 100).toFixed(2) : '--'
                            }}%</span>
                        </p>
                        <div class="h-96 lh-96 rounded-lg text-center font-34 mt-84"
                            :class="repayAmount ? 'pledgeLoan_background text-black ' : 'bgDark text-grey'" @click="submit">
                            {{ $t('确认还款') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import assetsHead from "@/components/Transform/assets-head/index.vue";
import { _getLoanParam, _repayOrder } from "@/service/pledgeLoan.js";
import { debounce } from '@/utils/utis'
import { _getAllWallet } from '@/service/fund.api';
import { showToast } from "vant";
export default {
    props: {

    },
    components: {
        assetsHead
    },
    data() {
        return {
            id: '',
            debtAmount: '',//总负债
            interestAmount: '',
            loanAmount: '',
            repayAmount: '',
            volume: '',
            pledgeRate: '',
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.debtAmount = this.$route.query.debtAmount
        this.interestAmount = this.$route.query.interestAmount
        this.loanAmount = this.$route.query.loanAmount
        this.getList();
    },
    methods: {
        changeMount() {
            if (this.repayAmount !== '') {
                if (this.repayAmount >= this.debtAmount) {
                    this.repayAmount = this.debtAmount
                }
                this.debounceFn()
            } else {
                this.pledgeRate = ''
            }
        },
        debounceFn: debounce(function () {
            this.getLoanParamFn()
        }, 500),
        getLoanParamFn() {
            _getLoanParam({
                repayAmount: this.repayAmount,
                loanOrderId: this.id,
            }).then(res => {
                this.pledgeRate = res.pledgeRate
            }).catch(error => {
                if (error.code === 'ECONNABORTED') { showToast(this.$t('网络超时！')); }
                else if (error.msg !== undefined) { showToast(this.$t(error.msg)); }
            })
        },
        getList() {
            _getAllWallet().then((res) => {
                let walletList = res.extends;
                let initObj = walletList.find(item => {
                    return item.symbol.toLowerCase() == 'usdt'
                })
                this.volume = initObj.volume
            });
        },
        repayAll() {
            this.repayAmount = this.debtAmount
            this.getLoanParamFn();
        },
        submit() {
            if (this.repayAmount == 0) {
                showToast(this.$t('还款金额不能为0'));
                return false
            }
            _repayOrder({
                repayAmount: this.repayAmount,
                loanOrderId: this.id,
            }).then(res => {
                showToast(this.$t('还款成功'));
                this.$router.push('/cryptos/pledgeLoanOrder')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
    .repayment {
        box-sizing: border-box;
        width: 100%;
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
        }

    }

    .skyColor {
        color: #13D3EB;
    }
}
</style>