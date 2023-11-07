<template>
    <div id="cryptos">
        <div class="announceDetail">
            <assets-head :title="$t('公告详情')" />
            <div class="content">
                <div class="font-52 font-700 textColor">{{ title }}</div>
                <p class="mt-20 text-grey font-30">{{ createTimeStr }}</p>
                <div class="flex justify-center mt-30" v-if="imgUrl"><img :src="`${imgUrl}`" class="w-200 h-200" alt="">
                </div>
                <div class="mt-32 text-cont textColor font-28" v-html="content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import assetsHead from "@/components/Transform/assets-head/index.vue";
import { dataTimeEx } from '@/utils/utis'
import { _getNews } from '@/service/user.api'
export default {
    props: {

    },
    components: {
        assetsHead
    },
    data() {
        return {
            title: '',
            createTimeStr: '',
            content: '',
            imgUrl: ''
        }
    },
    mounted() {
        this.getNews();
    },
    methods: {
        getNews() {
            _getNews({
                id: this.$route.query.id,
                language: this.$i18n.locale,
            }).then(res => {
                const { title, startTime, content, imgUrl } = res
                this.title = title;
                this.createTimeStr = startTime.substring(0, 10)
                this.content = content
                this.imgUrl = imgUrl
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/init.scss";

#cryptos {
    .announceDetail {
        width: 100%;
        box-sizing: border-box;
    }

    .content {
        padding: 40px 32px;
    }

    .title {
        text-decoration: underline;
    }

    .text-cont {
        word-wrap: break-word;
    }
}
</style>