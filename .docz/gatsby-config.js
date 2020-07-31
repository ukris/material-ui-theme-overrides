const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: 'src',

  siteMetadata: {
    title: 'React Typescript',
    description: 'React and TypeScript example starter project',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [
          'Getting Started',
          { name: 'Components', menu: ['Avatar', 'AvatarGroup'] },
        ],
        mdPlugins: [],
        hastPlugins: [],
        ignore: ['README.md'],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root:
          '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/.docz',
        base: 'src',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'React Typescript',
        description: 'React and TypeScript example starter project',
        host: 'localhost',
        port: 4000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides',
          templates:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/node_modules/docz-core/dist/templates',
          docz:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/.docz',
          cache:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/.docz/.cache',
          app:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/.docz/app',
          appPackageJson:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/package.json',
          appTsConfig:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/tsconfig.json',
          gatsbyConfig:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/gatsby-config.js',
          gatsbyBrowser:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/gatsby-browser.js',
          gatsbyNode:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/gatsby-node.js',
          gatsbySSR:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/gatsby-ssr.js',
          importsJs:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/.docz/app/imports.js',
          rootJs:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/.docz/app/root.jsx',
          indexJs:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/.docz/app/index.jsx',
          indexHtml:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/.docz/app/index.html',
          db:
            '/Users/uma.krishnan/projects/uma/material-ui-theme-overrides/.docz/app/db.json',
        },
        codeSandbox: false,
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
