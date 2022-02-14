<template>
    <div>
        <NuxtLink to="/">Back to list</NuxtLink>
        <h1 :id="article.id" class="article-title">
            <a class="header-anchor" href="#"><span v-html="article.title"></span></a>
        </h1>
        <div>{{article.date}} - {{article.tags}}</div>
        <div v-html="article.content"></div>
    </div>
</template>

<script>

    import { getArticles } from '../service/articles-service'

    export default {
        computed: {
            article() {
                const articles = this.$store.state.articles.filter(article => article.id === this.$route.query.id)
                console.log(this.$store.state.articles)
                console.log(articles)
                if (articles.length === 1) {
                    return articles[0]
                }
                return {}
            },
        },

        mounted() {
            console.log('mounted from article')
            if (this.$store.state.articles.length === 0) {
                this.$store.commit('setArticles', getArticles())
            }
        }
    }

</script>
