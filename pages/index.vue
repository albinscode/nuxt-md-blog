<template>

    <div>

        <h1>Articles</h1>
        <div v-for="article in articles">
            <h2 v-html="article.title"></h2>
            <div>{{article.date}} - {{article.tags}}</div>
            <div v-html="article.content"></div>
        </div>
    </div>

</template>

<script>

    export default {

        computed: {
            articles() {
                return this.$store.state.filteredArticles
            }
        },
    }

</script>
