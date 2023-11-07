<template>
    <div id="cryptos">
        <div class="addPledge">
            <assets-head :title="$t('新增质押')"></assets-head>
            <div class="contentBox">
                <div class="imgBox"><img src="@/assets/image/addpledgeBg.png" alt="" /></div>
                <div class="px-32">
                    <div class="content box-shad tabBackground">
                        <div class="mb-38">
                            <div class="font-32 textColor">{{ $t('质押') }}</div>
                            <div class="flex mt-20 h-96 items-center inputBox inputBackground1 textColor relative">
                                <input class="h-full pl-22 inputBackground1" type="text" v-model="pledgeAmount"
                                    :placeholder="$t('请输入质押数量')" @input="changeMount" />
                                <div class="right w-252 h-62 flex items-center pl-26 box-border">
                                    <img :src="`${HOST_URL}/symbol/${pledgeCurrency.toLowerCase()}.png`" class="w-48 h-48"
                                        alt="" />
                                    <span class="ml-14 mr-30 w-90">{{ pledgeCurrency.toUpperCase() }}</span>
                                </div>
                            </div>
                            <div class="flex items-center font-24 mt-16 text-grey">
                                {{ $t('可用余额') }}：<span class="mr-14">{{ volume ||
                                    '--' }}&nbsp;{{ pledgeCurrency.toUpperCase() }}</span>
                                <img click="$router.push('/cryptos/exchangePage')" src="@/assets/image/exchangeIcon.png"
                                    class="w-28 h-28" alt="" />
                            </div>
                            <div class="flex justify-between font-32 mt-48">
                                <div class="text-grey">{{ $t('质押后质押率') }}</div>
                                <div class="textColor">{{ pledgeRate !== '' ? (pledgeRate * 10000 / 100).toFixed(2) : '--'
                                }}%
                                </div>
                            </div>
                            <div class="h-96 lh-96 pledgeLoan_background rounded-lg text-center text-black font-34 mt-96"
                                @click="getReplenishOrder">{{ $t('确认质押') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import assetsHead from "@/components/Transform/assets-head/index.vue";
import { _getLoanParam, _replenishOrder } from "@/service/pledgeLoan.js";
import { _getAllWallet } from '@/service/fund.api';
import { HOST_URL } from '@/config'
import { debounce } from '@/utils/utis.js'
import { showToast } from 'vant';
export default {
    props: {

    },
    components: {
        assetsHead
    },
    data() {
        return {
            HOST_URL,
            walletList: [],
            id: '',
            pledgeAmount: '',
            pledgeRate: '',//质押率
            pledgeCurrency: '', //质押币种
            volume: '', //可用余额
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.pledgeCurrency = this.$route.query.pledgeCurrency
        this.getList()
    },
    methods: {
        changeMount() {
            if (this.pledgeAmount >= this.volume) {
                this.pledgeAmount = this.volume
            }

            this.debounceFn()

        },
        debounceFn: debounce(function () {
            this.getLoanParamFn()
        }, 500),
        getLoanParamFn() {
            if (this.pledgeAmount == '') {
                showToast(this.$t('请输入质押数量'))
                return false
            }
            _getLoanParam({
                loanOrderId: this.id,
                pledgeAmount: this.pledgeAmount
            }).then(res => {
                this.pledgeRate = res.pledgeRate
            }).catch(error => {
                if (error.code === 'ECONNABORTED') { showToast(this.$t('网络超时！')); }
                else if (error.msg !== undefined) { showToast(this.$t(error.msg)); }
            })
        },
        getList() {
            _getAllWallet().then((res) => {
                console.log(res)
                this.walletList = res.extends;
                let initObj = this.walletList.find(item => {
                    return item.symbol.toLowerCase() == (this.pledgeCurrency).toLowerCase()
                })
                console.log(initObj)
                this.volume = initObj.usable
            });
        },
        getReplenishOrder() {
            if (this.pledgeAmount == '') {
                showToast(this.$t('请输入质押数量'))
                return false
            }
            _replenishOrder({
                loanOrderId: this.id,
                pledgeAmount: this.pledgeAmount
            }).then(res => {
                showToast(this.$t('质押成功'));
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
    .addPledge {
        width: 100%;
        box-sizing: border-box;
    }

    .contentBox {
        position: relative;

        .imgBox {
            width: 100%;
            height: 300px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .content {
            border-radius: 8px;
            padding: 36px 30px 36px 34px;
            position: relative;
            margin-top: -92px;

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

        &.slectBoxMax {
            max-height: 574px;
            overflow-y: auto;
        }
    }
}
</style>