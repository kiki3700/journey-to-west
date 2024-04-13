import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Bio from "../components/bio"

const Main = ({ data }) => {
  console.log(data)
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout location="main" title={siteTitle}>
      <Bio />
      <p>
        No blog posts found. Add markdown posts to "content/blog" (or the
        directory you specified for the "gatsby-source-filesystem" plugin in
        gatsby-config.js).
      </p>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default Main
