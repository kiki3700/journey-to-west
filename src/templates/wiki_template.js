import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const WikiPageTemplate = ({ data, pageContext, location }) => {
  const markdownRemark = data.markdownRemark
  const parent = data.parent
  console.log(pageContext)
  const parentSlug = data.parent.fields.slug
  // let location = data.markdownRemark.frontmatter.slug
  const siteTitle = data.site.siteMetadata.title
  const parentTitle = parent.frontmatter.title
  return (
    <Layout location={location} title={siteTitle}>
      <Link to={parentSlug}>상위 문서 : {parent.frontmatter.slug} </Link>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    </Layout>
  )
}

export default WikiPageTemplate

export const query = graphql`
  query WikiPostBySlug(
    $id: String!
    $parentId: String
    $childrenIds: [String]
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        slug
        description
      }
    }
    parent: markdownRemark(id: { eq: $parentId }) {
      fields {
        slug
      }
      frontmatter {
        title
        slug
      }
    }
    children: markdownRemark(id: { in: $childrenIds }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
