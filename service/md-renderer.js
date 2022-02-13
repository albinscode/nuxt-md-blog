// this file allows to provide the markdown renderer
// using various plugins
// some other plugins of markdown-it: https://www.npmjs.com/search?q=keywords:markdown-it-plugin

const hljs = require('highlight.js');
// const anchor = require('markdown-it-anchor')
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'

export const md = require('markdown-it')({
    // Enable HTML tags in source
    html:         false,
    // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    xhtmlOut:     false,
    // Convert '\n' in paragraphs into <br>
    breaks:       false,
    // CSS language prefix for fenced blocks. Can be
    langPrefix:   'language-',
    // useful for external highlighters.
    // Autoconvert URL-like text to links
    linkify:      true,
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

        // use external default escaping
        return '';
    }
})
// to define the links on headers
md.use(anchor, {
    permalink: anchor.permalink.headerLink({ safariReaderFix: true }),
    // permalink: true,
    // permalink: anchor.permalink.headerLink(),
    permalinkBefore: true,
    permalinkSymbol: '§',
})
// to define a table of content injectable via [toc] or ${toc}
md.use(toc)
