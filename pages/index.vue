<template>

    <div>
        <Search />
        <div class="articles-quickjump">
            <h1>Articles quick jump</h1>
            <div class="table-of-contents" v-for="article in articles">
                <a :href="'#' + article.id"><span v-html="article.title"></span></a>
            </div>
        </div>

        <h1>Articles list</h1>
        <div v-for="article in articles">
            <h1 :id="article.id" class="article-title">
                <NuxtLink class="header-anchor" :to="{ path: '/article', query: { id: article.id }}">
                    <span v-html="article.title"></span>
                </NuxtLink>
            </h1>
            <div>{{article.date}} - {{article.tags}}</div>
            <div v-html="article.content"></div>
            <div class="article-separator">&nbsp;</div>
        </div>
    </div>

</template>

<style>
    .articles-quickjump {
        float: right;
        background-color: slategrey;
    }
    .article-separator {
        background-color: white;
    }
    .markdown-body h1.article-title {
        color: white;
        background-color: white;
        text-transform: uppercase;
    }
</style>

<script>

    // we always load all the articles
    // TODO use a mecanism to call an event if articles are not already loaded
    import { getArticles } from '../service/articles-service'

    export default {

        computed: {
            articles() {
                return this.$store.state.filteredArticles
            }
        },


        async fetch() {

            if (this.$store.state.articles.length === 0) {
                this.$store.commit('setArticles', getArticles())
            }
            console.log('mounted from index')
        }
    }

</script>
