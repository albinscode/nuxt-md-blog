<template>
    <div class="columns">

        <v-text-field v-model="term" class="column" placeholder="enter a term to search" @keyup="search"></v-text-field>
        <v-btn class="column" @click="search">search</v-btn>
    </div>
</template>

<style>
    .highlight {
        background-color: yellow;
    }
</style>

<script>

    import highlightWords from 'highlight-words';
    import { DateTime } from 'luxon';

    // to improve we can use search highlighting with chunks: https://www.npmjs.com/package/highlight-words
    export default {

        data() {
            return {
                term: '',
            }
        },
        computed: {
            articles() {
                return this.$store.state.articles
            },
        },
        methods: {
            // a new array of articles from original articles
            sortedArticles() {
                console.log('getting sorted articles')
                const result = [...this.articles].sort( (a, b) => {
                    let diff = DateTime.fromSQL(b.date).diff(DateTime.fromSQL(a.date))
                    /* console.log(`${a.date} and ${b.date} => ${diff}`) */
                    // to have most recent
                    return diff
                })
                return result
            },
            search: function () {

                console.log('search')

                let foundArticles = this.sortedArticles()
                if (this.term !== '') {
                    // we wan't to modify this list, we have to copy it
                    foundArticles = foundArticles.map( article => { return {...article }} )
                    foundArticles = foundArticles.filter( (article) => {

                        // an array of chunks with matching and non matching terms
                        const chunks = highlightWords({
                            text: article.content,
                            query: this.term,
                            // previous and next words after match too keep to have context
                            clipBy: 10,
                            matchExactly: true,
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
                console.log('commit from search')
                this.$store.commit('setFilteredArticles', foundArticles)
            }
        },
        mounted() {
            this.search()
        }
    }
</script>
