import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const WikiPageTemplate = ({ data, location }) => {
  const { markdownRemark } = data

  console.log(location)
  // let location = data.markdownRemark.frontmatter.slug
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout location={location} title={siteTitle}>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    </Layout>
  )
}

export default WikiPageTemplate

export const query = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        slug
      }
    }
  }
`
