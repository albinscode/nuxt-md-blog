import { md } from './md-renderer'


// return all markdown articles rendered using rendering service
export function getArticles() {
    const data = require('../articles')
    return Object.keys(data).reduce( (acc, key) => {
        return acc.concat({
            id: key,
            ...data[key],
            // we render the markdown with a toc before each article
            content: md.render(`[toc]${data[key]['content']}`)
        })
    }, [])
}

