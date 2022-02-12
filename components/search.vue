<template>
    <div>
        <input type="text" v-model="term" placeholder="enter a term" name="term" @keyup="search"></input>
        <button @click="search">search</button>
    </div>
</template>

<style>
    .highlight {
        background-color: yellow;
    }
</style>

<script>

    import highlightWords from 'highlight-words';

    // to improve we can use search highlighting with chunks: https://www.npmjs.com/package/highlight-words
    export default {

        data() {
            return {
                term: '',
            }
        },
        computed: {
            filteredArticles() {
                return this.$store.state.filteredArticles
            },
            articles() {
                return this.$store.state.articles
            }
        },
        methods: {
            search: function () {

                let foundArticles = this.articles.map(article => {
                    return {...article}
                })
                if (this.term !== '') {
                    foundArticles = foundArticles.filter( (article) => {

                        // an array of chunks with matching and non matching terms
                        const chunks = highlightWords({
                            text: article.content,
                            query: this.term
                        });

                        let hasMatch = false
                        // we concatenate all chunks after having highlighted all matching chunks
                        const newContent = chunks.reduce( (acc, chunk) => {
                            if (chunk.match) {
                                acc += `<span class="highlight">${chunk.text}</span>`
                                hasMatch = true
                            }
                            else {
                                acc += chunk.text
                            }
                            return acc
                        }, '')

                        if (hasMatch) {
                            article.content = newContent
                        }
                        return hasMatch
                    })




                }
                this.$store.commit('setFilteredArticles', foundArticles)
            }
        }
    }
</script>
