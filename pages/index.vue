<template>

    <div>
        <div class="columns">
            <Search class="column" />
        </div>
        <div class="columns is-desktop">
            <Quickjump class="column is-one-quarter articles-quickjump" />

            <div class="column is-three-quarters">
                <h1 class="title">Articles list</h1>
                <div v-for="article in articles">
                    <h1 :id="article.id" class="article-title">
                        <NuxtLink class="header-anchor" :to="{ path: '/article', query: { id: article.id }}">
                            <span v-html="article.title"></span>
                        </NuxtLink>
                    </h1>
                    <div style="padding-bottom: 10px">
                        <div style="float: right">
                            <code>{{article.date}}</code>
                        </div>
                        <div>
                            <Tags :values="typeof article.tags === 'string' ? article.tags.split(',') : article.tags" />
                        </div>
                    </div>
                    <div v-html="article.content"></div>
                    <div class="article-separator">&nbsp;</div>
                </div>
            </div>
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
