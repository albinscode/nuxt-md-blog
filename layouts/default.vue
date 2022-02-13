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

            // we fix some format problems
            const articles = getArticles().map( (article) => {
                // default date
                var date = '1970-01-01 00:00:00'
                if (typeof(article.date) !== 'undefined') {
                    // to avoid having meridian adaptations
                    date = article.date
                    date = date.split('+')[0]
                    date = date.split('.')[0]
                    date = date.replace('T', ' ')
                }

                return {
                    ...article,
                    date: date,
                }
            })

            console.log('displaying articles')
            articles.forEach( a => console.log(a.basename))
            console.log('end of displaying articles')

            this.$store.commit('setArticles', articles)
        }
    }
</script>
