import { defineStore } from 'pinia'
import { SET_COIN_LIST, SET_STAGE, SET_CURRENCY, SET_HISTORY_LIST, OPCIONA_LIST, CITAS_LIST, IS_LOAD } from '@/store/types.store'
import { _getCoinList } from '@/service/quotes.api';
import { defaultStage, defaultSeconds } from '@/config';

export const useQuotesStore = defineStore('qoutes', {
    // state 持久化
    persist: true,
    state: () => ('quotes', {
        coins: [],
        stage: defaultStage, // 阶段
        seconds: defaultSeconds,
        currency: '',
        historyList: [], // 搜索历史
        opcionalList: [], // 自选list
        citasList: [],
        isLoad: 1
        // name: 'Eduardo',
        // token: 'token' // token值
    }),
    getters: {
        coinList: (state) => state.coins,
        // historyList: (state) => state.historyList
        // stage: state => state.stage
    },
    actions: {
        async [SET_COIN_LIST]() {
            const result = await _getCoinList()
            this.coins = result
        },
        [SET_STAGE]({ stage, seconds }) {
            this.stage = stage
            this.seconds = seconds
        },
        [SET_HISTORY_LIST](list) { // 搜索历史
            this.historyList = list
        },
        [OPCIONA_LIST](list) { // 自选list
            console.log(list)
            this.opcionalList = list
        },
        [OPCIONA_LIST](list) { // 自选list
            console.log(list)
            this.opcionalList = list
        },
        [CITAS_LIST](list) { // 自选list
            console.log(list)
            this.citasList = list
        },
        [IS_LOAD](val) { // 是否加载
            this.isLoad = val
        },
    },
})
