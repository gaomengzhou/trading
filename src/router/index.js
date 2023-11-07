import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from "@/store/user.js";

// 路由规则
const routes = [
  {
    path: '/',
    children: [
      { path: '', redirect: '/quotes' },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ /* webpackPrefetch: true */'@/views/login/index.vue'),
      },
      {
        path: '/optional',
        name: 'optional',
        meta: {
          tarbar: true,
          keepAlive: true
        },
        redirect: '/optional/index',
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'index', meta: { tarbar: true, keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/optional/index.vue') },
          { path: 'search', meta: { tarbar: false }, component: () => import('@/views/optional/Search.vue') },
          { path: 'groupListManagement', meta: { tarbar: false }, component: () => import('@/views/optional/GroupListManagement.vue') },
          { path: 'groupEdit', meta: { tarbar: true }, component: () => import('@/views/optional/GroupEditOrAdd.vue') },
          { path: 'groupAdd', meta: { tarbar: false }, component: () => import('@/views/optional/GroupEditOrAdd.vue') },
          { path: 'selectSymbol', meta: { tarbar: false }, component: () => import('@/views/optional/SelectSymbol.vue') },
          { path: 'editGroupList', meta: { tarbar: false }, component: () => import('@/views/optional/EditGroupList.vue') },
          { path: '/order/:symbol', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/charts/order.vue') },
          { path: 'result', component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/charts/result.vue') },
        ]
      },
      {
        path: '/quotes',
        name: 'Quotes',
        meta: {
          keepAlive: true
        },
        redirect: '/quotes/index',
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'index', meta: { tarbar: true, keepAlive: true }, name: 'quotesIndex', component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/List.vue') },
          { path: 'detail', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/Detail.vue') },
          { path: 'constituentDetail', meta: { tarbar: true }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/ConstituentDetail.vue') },
          { path: 'usStockDetail', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/usStock/Detail.vue') },
          { path: 'usStockIndexDetail', meta: { tarbar: true, keepAlive: true }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/usStock/IndexDetail.vue') },
          { path: 'hotModules', meta: { tarbar: true }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/HotModules.vue') },
          { path: 'openTrade', meta: { tarbar: false, keepAlive: true }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/OpenTrade.vue') },
          { path: 'UsStockMore', meta: { tarbar: false }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/UsStockMore.vue') },
          { path: 'TwStockMore', meta: { tarbar: false }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/TwStockMore.vue') },
        ]
      },
      {
        path: '/trade',
        name: 'Trade',
        meta: {
          tarbar: true,
          requireAuth: true
        },
        redirect: '/trade/index',
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'index', meta: { tarbar: true, keepAlive: true }, name: 'tradeIndex', component: () => import(/* webpackChunkName: "trade" */ /* webpackPrefetch: true */'@/views/trade/index.vue') },
          // { path: 'detail', meta: { tarbar: true }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/Detail.vue') },
          // { path: 'hotModules', meta: { tarbar: true }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/HotModules.vue') },
          // { path: 'openTrade', meta: { tarbar: false }, component: () => import(/* webpackChunkName: "quotes" */ /* webpackPrefetch: true */'@/views/quotes/OpenTrade.vue') },
        ]
      },
      {
        path: '/foreign',
        name: 'Foreign',
        redirect: '/quotes/index?tabActive=2',
        meta: {
          tarbar: false,
        },
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'search', meta: { keepAlive: true }, name: 'search', component: () => import('@/views/foreign/Search.vue') },
          { path: 'quotation', name: 'quotation', meta: { keepAlive: true }, component: () => import('@/views/foreign/Quotation.vue') },
          { path: 'coinChart', name: 'coinChart', meta: { keepAlive: true }, component: () => import('@/views/foreign/CoinChart.vue') },
          { path: 'opening', name: 'opening', meta: { keepAlive: true }, component: () => import('@/views/foreign/Open.vue'), props: true },
          { //交割合约
            path: 'deliveryContract/:symbol',
            name: 'deliveryContract',
            component: () => import(/* webpackChunkName: "deliveryContract" */ /* webpackPrefetch: true */'@/views/foreign/foreignPerpetualContract/deliveryContract.vue'),
            meta: { keepAlive: true, tarbar: false, }
          },
          {
            //交割合约历史
            path: 'ForexDeliveryContractHistory',
            name: 'ForexDeliveryContractHistory',
            component: () => import(/* webpackChunkName: "deliveryContractHistory" */ /* webpackPrefetch: true */'@/views/foreign/deliveryContractHistory/index.vue')
          },
        ]
      },
      {
        path: '/position',
        name: 'position',
        redirect: '/position/index',
        meta: {
          tarbar: false,
        },
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'index', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/position/index.vue') },
        ]
      },
      {
        path: '/history',
        name: 'History',
        component: () => import('@/views/Layout.vue'),
        meta: { tarbar: false },
        redirect: '/history/list',
        children: [
          { path: 'list', meta: { tarbar: false, keepAlive: true, }, component: () => import(/* webpackChunkName: "history" */ /* webpackPrefetch: true */'@/views/history/List.vue') }
        ]
      },
      {
        path: '/news',
        name: 'News',
        redirect: '/news/index',
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'index', meta: { tarbar: true, keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/news/index.vue') },
        ]
      },
      {
        path: '/funds',
        name: 'Funds',
        redirect: '/funds/index',
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'index', meta: { tarbar: true, keepAlive: true }, component: () => import('@/views/cryptos/Funds/list.vue') },
        ]
      },
      {
        path: '/chart',
        name: 'Chart',
        redirect: '/chart/index',
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'index', meta: { tarbar: true, keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/charts/index.vue') },
          { path: '/order/:symbol', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/charts/order.vue') },
          { path: 'result', component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/charts/result.vue') },
        ]
      },
      {
        path: '/exchangeHistory',
        name: 'ExchangeHistory',
        redirect: '/exchangeHistory/dailyDeal',
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'dailyDeal', meta: { tarbar: false, keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/exchangeHistory/DailyDeal.vue') },
          { path: 'dailyEntrust', meta: { tarbar: false, keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/exchangeHistory/DailyEntrust.vue') },
          { path: 'historicalEntrust', meta: { tarbar: false, keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/exchangeHistory/HistoricalEntrust.vue') },
          { path: 'historicalTransaction', meta: { tarbar: false, keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/exchangeHistory/HistoricalTransaction.vue') },
          { path: 'search', meta: { tarbar: false, keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/exchangeHistory/Search.vue') },
          { path: 'tradeRecord', meta: { tarbar: false, keepAlive: true }, component: () => import(/* webpackChunkName: "chart" */ /* webpackPrefetch: true */'@/views/exchangeHistory/tradeRecord.vue') },
        ]
      },
      {
        path: '/exchange',
        name: 'Exchange',
        redirect: '/exchange/list',
        // meta: { tarbar: true },
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'list', meta: { tarbar: true, keepAlive: true, requireAuth: true }, component: () => import(/* webpackChunkName: "exchange" */ /* webpackPrefetch: true */'@/views/exchange/List.vue') },
          { path: 'channel-in', meta: { keepAlive: true }, name: 'channelIn', component: () => import(/* webpackChunkName: "exchange" */ /* webpackPrefetch: true */'@/views/exchange/Channel.vue') },
          { path: 'channel-out', meta: { keepAlive: true }, name: 'channelOut', component: () => import(/* webpackChunkName: "exchange" */ /* webpackPrefetch: true */'@/views/exchange/Channel.vue') },
          { path: 'charge-bank', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "exchange" */ /* webpackPrefetch: true */'@/views/exchange/charge-bank.vue') },
          { path: 'charge-crypto', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "exchange" */ /* webpackPrefetch: true */'@/views/exchange/charge-crypto.vue') },
          { path: 'warehouse', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "exchange" */ /* webpackPrefetch: true */'@/views/exchange/warehouse.vue') },
          { path: 'withdraw-bank', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "exchange" */ /* webpackPrefetch: true */'@/views/exchange/withdraw-bank.vue') }, //银行卡提现
          { path: 'fund-password-verify', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "exchange" */ /* webpackPrefetch: true */'@/views/exchange/FundPasswordVerify.vue') }, //资金密码验证
          { path: 'withdraw-usdt', meta: { keepAlive: true }, component: () => import(/* webpackChunkName: "exchange" */ /* webpackPrefetch: true */'@/views/exchange/withdraw-usdt.vue') }, //usdt提现
        ]
      },
      {
        //加密货币
        path: '/cryptos',
        name: 'Cryptos',
        redirect: '/quotes/index?tabActive=1',
        meta: {
          tarbar: false,
        },
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'announce', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/Announce/index.vue') },
          { path: 'announceDetail', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/Announce/announceDetail.vue') },
          { path: 'exchangePage', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/Exchange/exchangePage.vue') },
          { path: 'exchangeHistory', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/Exchange/exchangeHistory.vue') },
          { path: 'exchangeSubmit', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/Exchange/exchangeSubmit.vue') },
          { path: 'exchangeRate', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/Exchange/exchangeRate.vue') },
          { path: 'accountChange', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/AccountChange/index.vue') },
          { path: 'funds', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/Funds/index.vue') },
          { path: 'assetsCenter', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/AssetsCenter/index.vue') },
          { path: 'trade/:symbol', name: 'trade', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/Trade/index.vue') },
          { path: 'trendDetails/:symbol', name: 'tradeDetail', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/TrendDetails/index.vue') },
          { path: 'tradeRecord/:symbol', name: 'tradeRecord', meta: { tarbar: false, keepAlive: true }, component: () => import('@/views/cryptos/TradeRecord/index.vue') },
          { //永续合约
            path: 'perpetualContract/:symbol',
            name: 'perpetualContract',
            meta: { tarbar: false, keepAlive: true },
            component: () => import(/* webpackChunkName: "perpetualContract" */ /* webpackPrefetch: true */'@/views/cryptos/PerpetualContract/index.vue'),
          },
          { //充值列表
            path: 'recharge/rechargeList',
            name: 'rechargeList',
            meta: { tarbar: false, keepAlive: true },
            component: () => import(/* webpackChunkName: "perpetualContract" */ /* webpackPrefetch: true */'@/views/cryptos/Recharge/rechargeList.vue'),
          },
          {
            //充值页面
            path: "recharge/rechargePage",
            name: "rechargePage",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                /* webpackChunkName: "rechargePage" */ /* webpackPrefetch: true */"@/views/cryptos/Recharge/rechargePage.vue"
              ),
          },
          {
            //充值提交
            path: "recharge/rechargeSubmit",
            name: "rechargeSubmit",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                /* webpackChunkName: "rechargeSubmit" */ /* webpackPrefetch: true */"@/views/cryptos/Recharge/rechargeSubmit.vue"
              ),
          },
          {
            //充值详情
            path: "recharge/rechargeDetail",
            name: "rechargeDetail",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                /* webpackChunkName: "rechargeDetail" */ /* webpackPrefetch: true */"@/views/cryptos/Recharge/rechargeDetail.vue"
              ),
          },
          {
            path: "assetsCenter/index",
            name: "Assets",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                    /* webpackChunkName: "Assets" */ /* webpackPrefetch: true */"@/views/cryptos/AssetsCenter/index.vue"
              ),
          },
          {
            //充提记录
            path: "assetsCenter/rechargeWithdrawRecord",
            name: "rechargeWithdrawRecord",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                /* webpackChunkName: "rechargeWithdrawRecord" */ /* webpackPrefetch: true */"@/views/cryptos/AssetsCenter/rechargeWithdrawRecord.vue"
              ),
          },
          {
            //提现页面
            path: "withdraw/withdrawPage",
            name: "withdrawPage",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                /* webpackChunkName: "withdrawPage" */ /* webpackPrefetch: true */"@/views/cryptos/Withdraw/withdrawPage.vue"
              ),
          },
          {
            //输入资金密码
            path: "withdraw/securityVerification",
            name: "securityVerification",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                /* webpackChunkName: "withdrawPage" */ /* webpackPrefetch: true */"@/views/cryptos/Withdraw/withdrawalSecurityVerification.vue"
              ),
          },
          {
            //提交成功
            path: "withdraw/withdrawSumbit",
            name: "withdrawSumbit",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                /* webpackChunkName: "withdrawPage" */ /* webpackPrefetch: true */"@/views/cryptos/Withdraw/withdrawSumbit.vue"
              ),
          },
          {
            //详情
            path: "withdraw/withdrawDetail",
            name: "withdrawDetail",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                /* webpackChunkName: "withdrawPage" */ /* webpackPrefetch: true */"@/views/cryptos/Withdraw/withdrawDetail.vue"
              ),
          },
          {
            //充值详情
            path: "recharge/rechargeDetail",
            name: "rechargeDetail",
            meta: { tarbar: false, keepAlive: true },
            component: () =>
              import(
                /* webpackChunkName: "withdrawPage" */ /* webpackPrefetch: true */"@/views/cryptos/Recharge/rechargeDetail.vue"
              ),
          },
          { //U本位历史
            path: 'perpetualHistory',
            name: 'perpetualHistory',
            component: () => import(/* webpackChunkName: "perpetualHistory" */ /* webpackPrefetch: true */'@/views/cryptos/PerpetualContract/perpetualHistory.vue')
          },
          {
            //交割合约历史
            path: 'deliveryContractHistory',
            name: 'DeliveryContractHistory',
            component: () => import(/* webpackChunkName: "DeliveryContractHistory" */ /* webpackPrefetch: true */'@/views/cryptos/DeliveryContractHistory/index.vue')
          },
          { //永续合约订单详情
            path: 'orderDetail',
            name: 'orderDetail',
            component: () => import(/* webpackChunkName: "orderDetail" */ /* webpackPrefetch: true */'@/views/cryptos/PerpetualContract/orderDetail.vue')
          },
          { //永续合约委托详情
            path: 'entrustDetail',
            name: 'entrustDetail',
            component: () => import(/* webpackChunkName: "entrustDetail" */ /* webpackPrefetch: true */'@/views/cryptos/PerpetualContract/entrustDetail.vue')
          },
          { //永续合约订单详情
            path: 'symbolOrderDetail',
            name: 'symbolOrderDetail',
            component: () => import(/* webpackChunkName: "orderDetail" */ /* webpackPrefetch: true */'@/views/cryptos/SymbolOrderDetail/index.vue')
          },
          {
            //理财历史
            path: 'financialHistory',
            name: 'FinancialHistory',
            component: () => import(/* webpackChunkName: "FinancialHistory" */ /* webpackPrefetch: true */'@/views/cryptos/FinancialHistory/index.vue')
          },

          {
            //货币理财盈亏订单详情
            path: "profitLoss",
            name: "profitLoss",
            component: () => import(/* webpackChunkName: "profitLoss" */ /* webpackPrefetch: true */"@/views/cryptos/order/CurrencyOrder/profitLoss.vue")
          },
          {
            //理财订单详情
            path: "financialOrder",
            name: "FinancialOrder",
            component: () => import(/* webpackChunkName: "FinancialOrder" */ /* webpackPrefetch: true */"@/views/cryptos/order/FinancialOrder/index.vue")
          },
          {
            //矿机订单详情
            path: "miningMachineOrder",
            name: "MiningMachineOrder",
            component: () => import(/* webpackChunkName: "MiningMachineOrder" */ /* webpackPrefetch: true */"@/views/cryptos/order/MiningMachineOrder/index.vue")
          },
          {
            //矿机理财购买确认
            path: "machine-confirm",
            name: "MachineConfirm",
            component: () => import(/* webpackChunkName: "MachineConfirm" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/machineConfirm.vue")
          },
          {
            //基金理财购买确认
            path: "financial-confirm",
            name: "FinancialConfirm",
            component: () => import(/* webpackChunkName: "FinancialConfirm" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/FinancialManagementConfirm.vue")
          },
          {
            path: "fund-buy",
            name: "FundBuy",
            component: () =>
              import(/* webpackChunkName: "FundBuy" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/fundBuy.vue"),
          },
          {
            path: "fund",
            name: "Fund",
            meta: { keepAlive: true },
            component: () =>
              import(/* webpackChunkName: "Home" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/fundHome.vue"),
          },
          {
            path: "fund-rule",
            name: "Fundrule",
            meta: { keepAlive: true },
            component: () =>
              import(/* webpackChunkName: "Fundrule" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/fundRule.vue"),
          },
          {
            path: "fm-home",
            name: "financialManagement",
            meta: { keepAlive: true },
            component: () =>
              import(/* webpackChunkName: "financialManagement" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/index.vue"),
          },
          {
            path: "machine-buy",
            name: "MachineBuy",
            component: () =>
              import(/* webpackChunkName: "MachineBuy" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/machineBuy.vue"),
          },
          {
            path: "machine-rule",
            name: "Machinerule",
            meta: { keepAlive: true },
            component: () =>
              import(/* webpackChunkName: "Machinerule" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/machineRule.vue"),
          },
          {
            path: "machine",
            name: "Machine",
            meta: { keepAlive: true },
            component: () =>
              import(/* webpackChunkName: "Home" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/miningMachineHome.vue"),
          },

          {//
            path: 'order-success',
            name: 'orderSuccess',
            component: () =>
              import(/* webpackChunkName: "orderSuccess" */ /* webpackPrefetch: true */'@/views/cryptos/financialManagement/orderSuccess.vue')
          },
          {
            path: "pool-lock",
            name: "PooLock",
            component: () =>
              import(/* webpackChunkName: "PooLock" */ /* webpackPrefetch: true */"@/views/cryptos/financialManagement/poolLock.vue"),
          },
          {//质押借币
            path: 'pledgeLoan',
            name: 'PledgeLoan',
            component: () => import(/* webpackChunkName: "Home" */ /* webpackPrefetch: true */'@/views/cryptos/pledgeLoan/index.vue')
          },
          {//质押订单
            path: 'pledgeLoanOrder',
            name: 'pledgeLoanOrder',
            component: () => import(/* webpackChunkName: "pledgeLoanOrder" */ /* webpackPrefetch: true */'@/views/cryptos/pledgeLoan/pledgeLoanOrder.vue')
          },
          {//质押订单详情
            path: 'pledgeLoanOrderDetail',
            name: 'PledgeLoanOrderDetail',
            component: () => import(/* webpackChunkName: "PledgeLoanOrderDetail" */ /* webpackPrefetch: true */'@/views/cryptos/pledgeLoan/pledgeLoanOrderDetail.vue')
          },
          {//新增质押
            path: 'addPledge',
            name: 'AddPledge',
            component: () => import(/* webpackChunkName: "AddPledge" */ /* webpackPrefetch: true */'@/views/cryptos/pledgeLoan/addPledge.vue')
          },
          {//续借
            path: 'pledgeLoanRenew',
            name: 'PledgeLoanRenew',
            component: () => import(/* webpackChunkName: "PledgeLoanRenew" */ /* webpackPrefetch: true */'@/views/cryptos/pledgeLoan/pledgeLoanRenew.vue')
          },
          {//质押记录
            path: 'pledgeRecord',
            name: 'PledgeRecord',
            component: () => import(/* webpackChunkName: "PledgeRecord" */ /* webpackPrefetch: true */'@/views/cryptos/pledgeLoan/pledgeRecord.vue')
          },
          {//还款
            path: 'repayment',
            name: 'Repayment',
            component: () => import(/* webpackChunkName: "Repayment" */ /* webpackPrefetch: true */'@/views/cryptos/pledgeLoan/repayment.vue')
          },
          {//
            path: 'loan',
            name: 'loan',
            component: () => import(/* webpackChunkName: "quick" */ /* webpackPrefetch: true */"@/views/cryptos/loan/index.vue")
          },
          {//
            path: 'loanHistory',
            name: 'loanHistory',
            component: () => import(/* webpackChunkName: "quick" */ /* webpackPrefetch: true */"@/views/cryptos/loan/loanHistory.vue")
          },
          {//
            path: 'loanRule',
            name: 'loanRule',
            component: () => import(/* webpackChunkName: "quick" */ /* webpackPrefetch: true */"@/views/cryptos/loan/loanRule.vue")
          },
          {//c2c自选区我要买
            path: 'wantBuy',
            name: 'WantBuy',
            component: () => import(/* webpackChunkName: "Home" */ /* webpackPrefetch: true */'@/views/cryptos/placeAnOrder/page/wantBuy/index.vue'),
          },
          {//广告筛选
            path: 'wantBuy/adScreening',
            name: 'adScreening',
            component: () => import(/* webpackChunkName: "adScreening" */ /* webpackPrefetch: true */'@/views/cryptos/placeAnOrder/page/adScreening.vue'),
          },
          {//c2c购买
            path: 'wantBuy/c2cBuy',
            name: 'c2cBuy',
            component: () => import(/* webpackChunkName: "c2cBuy" */ /* webpackPrefetch: true */'@/views/cryptos/c2c-trade/page/c2cBuy.vue'),
          },
          {// c2c买卖交易
            path: 'c2cTrade',
            name: 'c2cTrade',
            props(route) {
              return {
                ...route.query,
              }
            },
            component: () => import(/* webpackChunkName: "c2cTrade" */ /* webpackPrefetch: true */'@/views/cryptos/c2c-trade/index.vue'),
          },
          {// c2c订单列表
            path: 'wantBuy/c2cOrderList',
            name: 'c2cOrderList',
            component: () => import(/* webpackChunkName: "c2cOrderList" */ /* webpackPrefetch: true */"@/views/cryptos/c2c-order-list/index.vue"),
            props(route) {
              return {
                ...route.query
              }
            }
          },
          {// c2c订单详情
            path: 'tradeOrderDetail',
            name: 'tradeOrderDetail',
            component: () => import(/* webpackChunkName: "tradeOrderDetail" */ /* webpackPrefetch: true */"@/views/cryptos/c2c-trade/page/tradeOrderDetail.vue"),
          },
          {// 快捷区
            path: 'wantBuy/quick',
            name: 'quick',
            component: () => import(/* webpackChunkName: "quick" */ /* webpackPrefetch: true */"@/views/cryptos/quick/index.vue")
          },
          {// 选择法币
            path: 'selectLegalCurrency',
            name: 'selectLegalCurrency',
            component: () => import(/* webpackChunkName: "selectLegalCurrency" */ /* webpackPrefetch: true */'@/views/cryptos/selectLegalCurrency/index.vue'),
          },
          {// 收款方式
            path: "paymentMethod",
            name: 'paymentMethod',
            component: () => import(/* webpackChunkName: "paymentMethod" */ /* webpackPrefetch: true */"@/views/cryptos/placeAnOrder/page/payment-method/PaymentMethod.vue")
          },
          {// 银行卡详情
            path: 'wantBuy/bankCard',
            name: 'bankCardDetail',
            component: () =>
              import(/* webpackChunkName: "bankCarDetail" */ /* webpackPrefetch: true */'@/views/cryptos/placeAnOrder/components/bankCardDetail/index.vue'),
            props(route) {
              return {
                ...route.query
              }
            }
          },
          {// 添加收款方式
            path: 'wantBuy/addPaymentMethod',
            name: 'addPaymentMethod',
            component: () =>
              import(/* webpackChunkName: "addPaymentMethod" */ /* webpackPrefetch: true */'@/views/cryptos/placeAnOrder/page/addPaymentMethod/AddPaymentMethod.vue'),
          },
          {
            // 广告商个人信息详情
            path: 'advertiserDetail',
            component: () => import(/* webpackChunkName: "advertiserDetail" */ /* webpackPrefetch: true */'@/views/cryptos/advertiserDetail/index.vue'),
            props(route) {
              return {
                ...route.query
              }
            }
          },
          {// c2c出售订单生成
            path: 'sellGenerate',
            component: () => import(/* webpackChunkName: "sellGenerate" */ /* webpackPrefetch: true */"@/views/cryptos/c2c-trade/page/SellGenerate.vue"),
            props(route) {
              return {
                ...route.query
              }
            }
          },
          {
            // 生成订单详情页
            path: 'orderGeneration',
            name: 'orderGeneration',
            component: () => import(/* webpackChunkName: "orderGeneration" */ /* webpackPrefetch: true */'@/views/cryptos/c2cOrder/order-generation/index.vue'),
            props(route) {
              return {
                ...route.query,
              }
            },
          },
          {// 付款
            path: 'paymentBuy',
            name: 'paymentBuy',
            component: () => import(/* webpackChunkName: "paymentBuy" */ /* webpackPrefetch: true */"@/views/cryptos/c2cOrder/payment/PaymentBuy.vue"),
          },
          {// 联系买家/卖家
            path: 'chat',
            component: () => import(/* webpackChunkName: "chat" */ /* webpackPrefetch: true */"@/views/cryptos/chat/index.vue"),
            props(route) {
              return {
                ...route
              }
            }
          },
          {
            // 取消订单
            path: 'cancelOrder',
            name: 'cancelOrder',
            component: () => import(/* webpackChunkName: "cancelOrder" */ /* webpackPrefetch: true */'@/views/cryptos/c2cOrder/cancel-order/cancelOrder.vue'),
          },
          {
            // 申诉
            path: 'appeal',
            name: 'appeal',
            component: () => import(/* webpackChunkName: "appeal" */ /* webpackPrefetch: true */'@/views/cryptos/c2cOrder/appeal/index.vue'),
          },
          {
            // 申诉成功
            path: 'appeal/page',
            name: 'appealSuccess',
            component: () => import(/* webpackChunkName: "appealSuccess" */ /* webpackPrefetch: true */'@/views/cryptos/c2cOrder/appeal/Appeal.vue'),
          },
          {
            // 付款详情
            path: 'paymentDetail',
            name: 'paymentDetail',
            component: () => import(/* webpackChunkName: "paymentDetail" */ /* webpackPrefetch: true */'@/views/cryptos/c2cOrder/payment/PaymentDetail.vue'),
          },
          {
            //c2c帮助中心
            path: 'c2cHelpCenter',
            name: 'HelpCenter',
            component: () => import(/* webpackChunkName: "c2cHelpCenter" */ /* webpackPrefetch: true */'@/views/cryptos/c2cHelpCenter/index.vue'),
          },
          {
            // c2c收款方式
            path: 'c2cCollection',
            component: () => import(/* webpackChunkName: "c2cCollection" */ /* webpackPrefetch: true */'@/views/cryptos/c2c-trade/page/c2cCollection.vue'),
            props(route) {
              return {
                ...route.query,
              }
            },
          },
          {// c2c帮助
            path: 'c2cHelp',
            name: 'C2cHelp',
            meta: { requireAuth: true },
            component: () => import(/* webpackChunkName: "c2cHelp" */ /* webpackPrefetch: true */"@/views/cryptos/c2c-trade/page/c2cHelp.vue")
          },
          {// 确认收款
            path: 'confirmedPaid',
            meta: { keepAlive: true },
            component: () => import(/* webpackChunkName: "confirmedPaid" */ /* webpackPrefetch: true */"@/views/cryptos/c2cOrder/payment/ConfirmedPaid.vue")
          },
          {// 卖家交易
            path: 'tradeSuccessSell',
            component: () => import(/* webpackChunkName: "tradeSuccessSell" */ /* webpackPrefetch: true */"@/views/cryptos/c2c-trade/page/TradeSuccessSell.vue")
          },
          {// 买家交易成功详情
            path: 'tradeSuccessDetailBuyer',
            component: () => import(/* webpackChunkName: "tradeSuccessDetailBuyer" */ /* webpackPrefetch: true */"@/views/cryptos/c2c-trade/page/TradeSuccessDetailBuyer.vue")
          },
          {// 卖家交易成功详情
            path: 'tradeSuccessDetailSell',
            component: () => import(/* webpackChunkName: "tradeSuccessDetailSell" */ /* webpackPrefetch: true */"@/views/cryptos/c2c-trade/page/TradeSuccessDetailSell.vue")
          },
          {// 买家交易成功
            path: 'tradeSuccessBuyer',
            component: () => import(/* webpackChunkName: "tradeSuccessBuyer" */ /* webpackPrefetch: true */"@/views/cryptos/c2c-trade/page/TradeSuccessBuyer.vue")
          },
        ]
      },
      {
        path: '/my',
        name: 'My',
        redirect: '/my/index',
        component: () => import('@/views/Layout.vue'),
        meta: { tarbar: true },
        children: [
          { path: 'index', meta: { tarbar: true, }, component: () => import(/* webpackChunkName: "my" */ /* webpackPrefetch: true */'@/views/my/index.vue') }
        ]
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ /* webpackPrefetch: true */'@/views/register/index.vue'),
        // meta: { tarbar: true },
      },
      { //验证码
        path: '/verify',
        name: 'verify',
        component: () => import(/* webpackChunkName: "verify" */ /* webpackPrefetch: true */'@/views/register/verify.vue')
      },
      { //设置资金密码
        path: '/setFond',
        name: 'setFond',
        component: () => import(/* webpackChunkName: "setFond" */ /* webpackPrefetch: true */'@/views/register/setFond.vue')
      },
      { //注册身份认证
        path: '/identity',
        name: 'identity',
        component: () => import(/* webpackChunkName: "identity" */ /* webpackPrefetch: true */'@/views/register/identity.vue')
      },
      { //谷歌验证
        path: '/gooleVerify',
        name: 'gooleVerify',
        component: () => import(/* webpackChunkName: "gooleVerify" */ /* webpackPrefetch: true */'@/views/register/gooleVerify.vue')
      },
      { //注册完成
        path: '/finish',
        name: 'finish',
        component: () => import(/* webpackChunkName: "finish" */ /* webpackPrefetch: true */'@/views/register/finish.vue')
      },
      {   //语言设置
        path: '/language',
        name: 'language',
        component: () => import(/* webpackChunkName: "language" */ /* webpackPrefetch: true */'@/views/language/index.vue')
      },
      { //客服
        path: '/customerService',
        name: 'customerService',
        component: () => import(/* webpackChunkName: "customerService" */ /* webpackPrefetch: true */'@/views/customerService/index.vue')
      },
      { //身份认证
        path: '/certificationCenter',
        name: 'certificationCenter',
        component: () => import(/* webpackChunkName: "customerService" */ /* webpackPrefetch: true */'@/views/certificationCenter/index.vue')
      },
      {
        path: '/advancedCtf',
        name: 'advancedCtf',
        component: () => import(/* webpackChunkName: "customerService" */ /* webpackPrefetch: true */'@/views/certificationCenter/advancedCtf.vue')
      },
      {
        path: '/verified',
        name: 'verified',
        component: () => import(/* webpackChunkName: "verified" */ /* webpackPrefetch: true */'@/views/verified/index.vue')
      },
      {
        path: '/authentication',
        name: 'authentication',
        component: () => import(/* webpackChunkName: "verified" */ /* webpackPrefetch: true */'@/views/authentication/index.vue')
      },
      {//修改登录密码
        path: '/changePassword',
        name: 'changePassword',
        component: () => import(/* webpackChunkName: "changePassword" */ /* webpackPrefetch: true */'@/views/changePassword/index.vue')
      },
      {//修改资金密码
        path: '/changeFundsPassword',
        name: 'changeFundsPassword',
        component: () => import(/* webpackChunkName: "changeFundsPassword" */ /* webpackPrefetch: true */'@/views/changeFundsPassword/index.vue')
      },
      {//绑定验证
        path: '/bindVerify',
        name: 'bindVerify',
        component: () => import(/* webpackChunkName: "bindVerify" */ /* webpackPrefetch: true */'@/views/bindVerify/index.vue')
      },
      {//重置绑定
        path: '/resetVerify',
        name: 'resetVerify',
        component: () => import(/* webpackChunkName: "resetVerify" */ /* webpackPrefetch: true */'@/views/resetVerify/index.vue')
      },
      {//安全中心
        path: '/safety',
        name: 'safety',
        component: () => import(/* webpackChunkName: "safety" */ /* webpackPrefetch: true */'@/views/safety/index.vue')
      },
      {//更换绑定
        path: '/changeVerify',
        name: 'changeVerify',
        component: () => import(/* webpackChunkName: "changeVerify" */ /* webpackPrefetch: true */'@/views/safety/changeVerify.vue')
      },
      {
        //服务条款
        path: '/TermsOfService',
        name: 'TermsOfService',
        component: () => import(/* webpackChunkName: "termsOfService" */ /* webpackPrefetch: true */'@/views/termsOfService/index.vue')
      },
      {//
        path: '/resetSuccess',
        name: 'resetSuccess',
        component: () => import(/* webpackChunkName: "resetSuccess" */ /* webpackPrefetch: true */'@/views/resetVerify/resetSuccess.vue')
      },
      {//忘记密码
        path: '/forget',
        name: 'forget',
        component: () => import(/* webpackChunkName: "forget" */ /* webpackPrefetch: true */'@/views/forget/index.vue')
      },
      {//重置登录密码
        path: '/resetPassword',
        name: 'resetPassword',
        component: () => import(/* webpackChunkName: "resetPassword" */ /* webpackPrefetch: true */'@/views/forget/resetPassword.vue')
      },
      {//忘记密码修改成功
        path: '/passSuccess',
        name: 'passSuccess',
        component: () => import(/* webpackChunkName: "passSuccess" */ /* webpackPrefetch: true */'@/views/forget/passSuccess.vue')
      },
      {//安全验证
        path: '/safeVerify',
        name: 'safeVerify',
        component: () => import(/* webpackChunkName: "safeVerify" */ /* webpackPrefetch: true */'@/views/forget/safeVerify.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/404.vue')
      },
      {
        path: '/order',
        name: 'order',
        // meta: { tarbar: true },
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'submit', meta: {}, component: () => import('@/views/order/order-submit.vue') },
          { path: 'success', component: () => import('@/views/order/success.vue') }, //成功
          { path: 'apply-success', component: () => import('@/views/order/apply-success.vue') }, //申请成功
        ]
      },
      {
        path: '/Record',
        name: 'Record',
        // meta: { tarbar: true },
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'DepositAndWithdrawal', meta: { tarbar: false }, component: () => import('@/views/Record/DepositAndWithdrawal.vue') },
          { path: 'RecordDetails', meta: { tarbar: false }, component: () => import('@/views/Record/RecordDetails.vue') }
        ], //充值和提现记录
      },
      {
        path: '/payMentMethod',
        name: 'payMentMethod',
        // meta: { tarbar: true },
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'list', meta: { tarbar: false }, component: () => import('@/views/payMentMethod/list.vue') },
          { path: 'add', meta: { tarbar: false }, component: () => import('@/views/payMentMethod/add.vue') },
          { path: 'selectPay', meta: { tarbar: false }, component: () => import('@/views/payMentMethod/selectPay.vue') },
        ], //收款方式
      },
      {
        //推广中心
        path: '/promote',
        name: 'promote',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "promote" */ /* webpackPrefetch: true */'@/views/cryptos/promote/index.vue')
      },
      {
        //推广规则
        path: '/promote/rules',
        name: 'promoteRules',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "promoteRules" */ /* webpackPrefetch: true */'@/views/cryptos/promote/Rules.vue')
      },
      {
        //分享二维码
        path: '/ShareQRCode',
        name: 'ShareQRCode',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "ShareQRCode" */ /* webpackPrefetch: true */'@/views/cryptos/promote/ShareQRCode.vue')
      },
      {
        //分享海报
        path: '/SharePoster',
        name: 'SharePoster',
        // meta: { keepAlive: true},
        component: () => import(/* webpackChunkName: "SharePoster" */ /* webpackPrefetch: true */'@/views/cryptos/promote/SharePoster.vue')
      },
      {
        //帮助中心
        path: '/helpCenter',
        name: 'helpCenter',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "promoteRules" */ /* webpackPrefetch: true */'@/views/cryptos/HelpCenter/index.vue')
      },
      {
        //帮助中心详情
        path: '/helpDetail',
        name: 'helpDetail',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "promoteRules" */ /* webpackPrefetch: true */'@/views/cryptos/HelpCenter/detail.vue')
      },
      {
        //关于我们
        path: '/aboutUs',
        name: 'aboutUs',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "ShareQRCode" */ /* webpackPrefetch: true */'@/views/cryptos/AboutUs/index.vue')
      },
      {
        //导航更多
        path: '/more',
        name: 'more',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "ShareQRCode" */ /* webpackPrefetch: true */'@/views/morePage/index.vue')
      },
      {
        path: '/ipo',
        name: 'ipo',
        // meta: { tarbar: true },
        redirect: '/ipo/index',
        component: () => import('@/views/Layout.vue'),
        children: [
          { path: 'index', meta: { tarbar: false }, component: () => import('@/views/ipo/index.vue') },
          { path: 'drawLots', meta: { tarbar: false }, component: () => import('@/views/ipo/drawLots.vue') },
          { path: 'drawLotsDetail', meta: { tarbar: false }, component: () => import('@/views/ipo/drawLotsDetail.vue') },
          { path: 'lotteryRecord', meta: { tarbar: false }, component: () => import('@/views/ipo/lotteryRecord.vue') },
          { path: 'stock', meta: { tarbar: false }, component: () => import('@/views/ipo/stock.vue') },
          { path: 'progress', meta: { tarbar: false }, component: () => import('@/views/ipo/progress.vue') },
          { path: 'spotStock', meta: { tarbar: false }, component: () => import('@/views/ipo/spotStock.vue') },
        ], //ipo中心
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (userStore.userInfo && userStore.userInfo.token) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
      })
    }
  } else {
    next()
  }
})

export default router
