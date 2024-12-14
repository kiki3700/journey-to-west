/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */

const React = require("react")

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `kr` })

  setHeadComponents([
    React.createElement("meta", {
      name: "google-site-verification",
      content: "_KL6lnRiaQhvsiJV-lujk3dvGMIWEOS_kjZGMUjkuh0",
      key: "google-site-verification",
    }),
  ])
}
