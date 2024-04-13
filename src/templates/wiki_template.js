import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const WikiPageTemplate = ({ data }) => {
  const { markdownRemark } = data
  const siteTitle = data.stieMetadata.title
  return (
    <Layout title={siteTitle}>
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
      }
    }
  }
`
