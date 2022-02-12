<template>

    <div>
        <div class="markdown-body">
            <Search />
            <h1>Welcome!</h1>
            <Nuxt />
        </div>
    </div>
</template>

<script>
    // in this template we always load all the articles
    import { getArticles } from '../service/articles-service'

    export default {
        async fetch() {
            const articles = getArticles()
            this.$store.commit('setArticles', articles)
            this.$store.commit('setFilteredArticles', articles)
        }
    }
</script>
