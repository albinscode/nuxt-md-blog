export const state = () => ({
    counter: 0,
    articles: [],
    filteredArticles: [],
})

export const mutations = {
    increment(state) {
        state.counter++
    },
    setArticles(state, articles) {
        state.articles = articles
    },
    setFilteredArticles(state, articles) {
        state.filteredArticles = articles
    }
}

