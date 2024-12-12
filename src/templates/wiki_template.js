import React from "react"
import "katex/dist/katex.css"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Toc from "../components/toc"

const WikiPageTemplate = ({ data, location }) => {
  const markdownRemark = data.markdownRemark
  const toc = data.markdownRemark.tableOfContents
  console.log(toc)
  const parent = data.parent
  const parentSlug = data.parent.fields.slug
  const siteTitle = data.site.siteMetadata.title
  const parentTitle = parent.frontmatter.title
  const isIndexPage = parentSlug === "/wiki/"
  return (
    <Layout location={location} title={siteTitle}>
      <Link to="/wiki/">root: / </Link>
      {!isIndexPage && <Link to={parentSlug}>상위 문서: {parentTitle}</Link>}
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
