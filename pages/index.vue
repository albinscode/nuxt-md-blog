<template>
<div>
    <h1>coucou</h1>

    <h2>Articles</h2>
    <div v-for="article in articles">
        <h3 v-html="article.title"></h3>
        <div>{{article.date}} - {{article.tags}}</div>
        <div v-html="article.contents"></div>
    </div>


</div>

</template>

<script>

    export default {

        data: () => ({
            articles: require('../dist/articles')['data']
        })
    }

</script>
