import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

export default function WikiPage({ data, location }) {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const post = data.markdownRemark

  return (
    <Layout location={location} title={siteTitle}>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}
export const Head = () => <Seo title="All posts" />

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fileAbsolutePath: { regex: "/wiki/index.md$/" }) {
      html
      frontmatter {
        title
      }
    }
  }
`
