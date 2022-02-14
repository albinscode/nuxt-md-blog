<template>
    <div>
        <h1 class="subtitle">Articles quick jump</h1>
        <div class="table-of-contents" v-for="article in articles">
            <a :href="'#' + article.id"><span v-html="article.title"></span></a>
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
