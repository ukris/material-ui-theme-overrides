module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-module-resolver',
      options: {
        root: './src', // <- will be used as a root dir
        alias: {
          "apps": "./apps",
          "components": "./components",
          "config": "./config",
          "context": "./context",
          "endpoints": "./endpoints",
          "helpers": "./helpers",
          "i18n": "./i18n",
          "layouts": "./layouts",
          "mocks": "./mocks",
          "pages": "./pages",
          "settings": "./settings",
          "theme": "./theme",
          "types": "./types",
        },
        extensions: [
          "js",
          "jsx",
          "tsx",
          "ts"
        ]
      }
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    }]
}
