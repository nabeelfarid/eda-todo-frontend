module.exports = {
  siteMetadata: {
    title: "EDA Todos App",
    subtitle: ``,
    slogan: `Get Stuff Done!`,
    description: `A place to organise your daily chores.`,
    author: `Nomadic Nabeel`,
    repo: "https://github.com/nabeelfarid/eda-todo-frontend",
    // siteUrl: process.env.SITE_URL,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `AWS Todos App`,
        short_name: `Todos`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
  ],
};
