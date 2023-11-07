<template>
    <div id="cryptos">
        <div class="pledgeLoanOrderDetail">
            <assets-head :title="$t('订单详情')"></assets-head>
            <div class="px-32 pt-54 tabBackground pb-100">
                <div class="skyColor font-44"
                    :class="{ 'redColor': obj.state == 3, 'red': obj.state == 4, 'text-grey': obj.state == 2, 'skyColor': obj.state == 1 }">
                    {{ obj.state ? fixState(obj.state) : '--' }}</div>
                <div class="font-32 mt-40 text-grey">{{ $t('总负债') }}</div>
                <div class="mt-20 flex textColor items-center">
                    <span class="mr-10 font-40">{{ obj.debtAmount !== '' ? obj.debtAmount : '--' }}&nbsp;USD</span>
                    <div class="skyBg rounded ml-22 text-black px-26 py-8 font-28" v-if="obj.state == 1 || obj.state == 4"
                        @click="toRepayment(obj.id, obj.debtAmount, obj.interestAmount, obj.loanAmount)">{{ $t('还款') }}
                    </div>
                </div>
                <div class="pb-100">
                    <div class="flex mt-32">
                        <div class="flex-1">
                            <div class="font-32 text-grey">{{ $t('贷款币种') }}</div>
                            <div class="font-40 mt-20 textColor">{{ obj.loanCurrency ? obj.loanCurrency.toUpperCase() : '--'
                            }}
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="font-32 text-grey">{{ $t('总借款') }}</div>
                            <div class="font-40 mt-20 textColor"><span class="mr-10">{{ obj.loanAmount }}</span>USD</div>
                        </div>
                    </div>
                    <div class="flex mt-32">
                        <div class="flex-1">
                            <div class="font-32 text-grey">{{ $t('总利息') }}</div>
                            <div class="font-40 mt-20 textColor">{{ obj.interestAmount === '' ?
                                '--' : obj.interestAmount }}&nbsp;USD</div>
                        </div>
                        <div class="flex-1">
                            <div class="font-32 text-grey">{{ $t('时利率') }}/{{ $t('天利率') }}</div>
                            <div class="font-40 mt-20 textColor"><span class="mr-10">{{ obj.hourlyRate * 100 ||
                                '--' }}%</span>/{{ obj.hourlyRate ? obj.hourlyRate * 24 * 100 : '--' }}%</div>
                        </div>
                    </div>
                    <div class="flex mt-32" v-if="obj.state == 1 || obj.state == 4">
                        <div class="flex-1">
                            <div class="font-32 text-grey">{{ $t('质押率') }}</div>
                            <div class="font-40 mt-20 textColor">
                                {{ obj.pledgeRate !== '' ? (obj.pledgeRate * 10000 / 100).toFixed(2) : '--' }}%</div>
                        </div>
                        <div class="flex-1">
                            <div class="font-32 text-grey">
                                {{ $t('强平价格') }}({{ obj.pledgeCurrency ? obj.pledgeCurrency.toUpperCase() : '--' }}/USD)
                            </div>
                            <div class="font-40 mt-20 textColor"><span class="mr-10">{{ obj.closeOut || '--' }}</span></div>
                        </div>
                    </div>
                </div>
                <div class="pt-82 pb-82 border-t-color" v-if="obj.state == 4">
                    <div class="flex mt-32">
                        <div class="flex-1">
                            <div class="font-32 text-grey">{{ $t('滞纳金') }}</div>
                            <div class="font-40 mt-20 textColor">{{ obj.overdueAmount !== '' ? obj.overdueAmount : '--'
                            }}&nbsp;USD
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="font-32 text-grey">{{ $t('总滞纳金利率') }}</div>
                            <div class="font-40 mt-20 textColor"><span class="mr-10">{{ obj.overdueRate !== '' ?
                                (obj.overdueRate * 1000 / 100).toFixed(2) : '--'
                            }}%</span></div>
                        </div>
                    </div>
                </div>
                <div class="pt-82 border-t-color">
                    <div class="mb-44">
                        <div class="flex justify-between font-32 mb-44">
                            <span class="text-grey">{{ $t('订单号') }}</span>
                            <span class="textColor">{{ obj.orderNo || '--' }}</span>
                        </div>
                        <div class="flex justify-between font-32 mb-44">
                            <span class="text-grey">{{ $t('借款时间') }}</span>
                            <span class="textColor">{{ obj.createTime || '--' }}</span>
                        </div>
                        <div class="flex justify-between font-32 mb-44">
                            <span class="text-grey">{{ $t('到期时间') }}</span>
                            <span class="textColor">{{ obj.expireTime || '--' }}</span>
                        </div>
                        <div class="flex justify-between font-32 mb-44 items-center"
                            @click="$router.push(`/cryptos/pledgeRecord?id=${id}`)">
                            <span class="skyColor mr-14">{{ $t('质押记录') }}</span>
                            <img src="@/assets/image/skyMore.png" alt="" class="w-32 h-32" />
                        </div>
                    </div>
                </div>
                <div class="btnBox mt-144 flex items-center justify-between" v-if="obj.state == 1">
                    <div class="skyBorder h-96 box-border skyColor font-30 w-360 flex items-center rounded-lg justify-center"
                        @click="toAddpledge(obj.id, obj.pledgeCurrency)">{{ $t('新增质押') }}</div>
                    <div class="skyBg h-96 box-border font-30 w-360 items-center rounded-lg flex items-center justify-center"
                        @click="toRenew(obj.id, obj.pledgeCurrency)">{{ $t('续借') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import assetsHead from "@/components/Transform/assets-head/index.vue";
import { _getOrder } from "@/service/pledgeLoan.js";
export default {
    props: {

    },
    components: {
        assetsHead
    },
    data() {
        return {
            id: '',
            obj: {
                closeOut: '',
                createTime: '',
                debtAmount: '',
                expireTime: '',
                hourlyRate: '',
                interestAmount: '',
                loanAmount: '',
                loanCurrency: '',
                orderNo: '',
                overdueAmount: '',
                overdueRate: '',
                pledgeRate: '',
                state: '',
                pledgeCurrency: '',
            }
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.getOrderFn();
    },
    methods: {
        getOrderFn() {
            _getOrder({
                loanOrderId: this.id
            }).then(res => {
                this.obj = res
            })
        },
        fixState(state) {
            let string = ''
            if (state == 1) {
                string = this.$t('计息中')
            } else if (state == 2) {
                string = this.$t('已结清')
            } else if (state == 3) {
                string = this.$t('强平结清')
            } else if (state == 4) {
                string = this.$t('已逾期')
            }
            return string
        },
        toRepayment(id, debtAmount, interestAmount, loanAmount) {
            this.$router.push({ path: '/cryptos/repayment', query: { id, debtAmount, interestAmount, loanAmount } })
        },
        toAddpledge(id, pledgeCurrency) {
            this.$router.push({ path: '/cryptos/addPledge', query: { id, pledgeCurrency } })
        },
        toRenew(id, pledgeCurrency) {
            this.$router.push({ path: '/cryptos/pledgeLoanRenew', query: { id, pledgeCurrency } })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
    .pledgeLoanOrderDetail {
        width: 100%;
        box-sizing: border-box;
    }

    .skyColor {
        color: #13D3EB;
    }

    .skyBorder {
        border: 1px solid #13D3EB;
    }

    .skyBg {
        background: #13D3EB;
    }

    .redColor {
        color: $red;
    }

    .red {
        color: #FF0000;
    }

    .yellowColor {
        color: #F5C425;
    }
}
</style>