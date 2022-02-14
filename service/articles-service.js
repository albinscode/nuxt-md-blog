import { md } from './md-renderer'


// return all markdown articles rendered using rendering service
export function getArticles() {
    const data = require('../articles')
    return Object.keys(data).reduce( (acc, key) => {
        // we fix some format problems
        var date = '1970-01-01 00:00:00'
        var article = data[key]
        if (typeof(article.date) !== 'undefined') {
            // to avoid having meridian adaptations
            date = article.date
            date = date.split('+')[0]
            date = date.split('.')[0]
            date = date.replace('T', ' ')
        }

        return acc.concat({
            id: key,
            ...data[key],
            // we render the markdown with a toc before each article
            content: md.render(`[toc]${data[key]['content']}`),
            date: date,
        })
    }, [])
}

