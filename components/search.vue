<template>
    <div>
        <input type="text" v-model="term" placeholder="enter a term" name="term" @keyup="search"></input>
        <button @click="search">search</button>
    </div>
</template>

<script>

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
                let foundArticles = this.articles
                if (this.term !== '') {
                    foundArticles = this.filteredArticles.filter( article => article.title.indexOf(this.term) !== -1)
                }
                this.$store.commit('setFilteredArticles', foundArticles)
            }
        }
    }
</script>
