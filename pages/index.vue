<template>
<div class="markdown-body">

    <h1>Articles</h1>
    <div v-for="article in articles">
        <h2 v-html="article.title"></h2>
        <div>{{article.date}} - {{article.tags}}</div>
        <div v-html="article.content"></div>
    </div>

</div>

</template>

<style>
</style>

<script>

    const hljs = require('highlight.js');
    const anchor = require('markdown-it-anchor')
    const md = require('markdown-it')({
        html:         false,        // Enable HTML tags in source
        xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                    // This is only for full CommonMark compatibility.
        breaks:       false,        // Convert '\n' in paragraphs into <br>
        langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                    // useful for external highlighters.
        linkify:      true,        // Autoconvert URL-like text to links

        // Enable some language-neutral replacement + quotes beautification
        // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
        typographer:  false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '“”‘’',

        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externally.
        // If result starts with <pre... internal wrapper is skipped.
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(str, { language: lang }).value;
              } catch (__) {}
            }

            return ''; // use external default escaping
        }
    })
    .use(anchor, {
        /* permalink: anchor.permalink.headerLink({ safariReaderFix: true }) */
        permalink: anchor.permalink.headerLink(),
        permalinkBefore: true,
        permalinkSymbol: '§',
    })
    .use( require("markdown-it-toc-done-right"))

    // some plugins of markdown-it: https://www.npmjs.com/search?q=keywords:markdown-it-plugin

    export default {

        data: () => ({
            articles: []
        }),
        async fetch() {
            const data = require('../dist/articles')
            this.articles = Object.keys(data).reduce( (acc, key) => {
                return acc.concat({
                    id: key,
                    ...data[key],
                    // we render the markdown with a toc before each article
                    content: md.render(`[toc]${data[key]['content']}`)
                })
            }, [])
        }

    }

</script>
