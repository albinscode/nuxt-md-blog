# Introduction

This is a standard nuxt project with all standard commands.

# Installation

~~~
npm i
~~~

The only specifity is to generate your articles json file from your markdown files.

Put your markdown articles in `articles`.

~~~
npm run build-articles-raw
~~~

You shall have a `articles.json` file.

# Development

~~~
npm run dev
~~~

# Deployment

You shall generate your site then deploy it:

~~~
npm run generate
npm run deploy-prod
~~~

Do not forget to create a `scripts/deploy-prod.js` script from `scripts/deploy-prod.js.sample`.
