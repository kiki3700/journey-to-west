import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  // 최상위 'index' 페이지의 자식 노드들만 렌더링합니다.
  const indexNode = data.allMarkdownRemark.nodes.find(
    node => node.fields.slug === "/wiki/"
  )
  const indexChildSlugs = indexNode.fields.child // 'index' 노드의 자식 슬러그 배열
  const renderList = (nodes, slug) => {
    const node = nodes.find(node => node.fields.slug === slug)
    if (!node) return null

    const linkElement = (
      <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
    )

    return (
      <li key={node.fields.slug}>
        {linkElement}
        {node.fields.child && node.fields.child.length > 0 && (
          <ul>
            {node.fields.child.map(childSlug => renderList(nodes, childSlug))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Index</h1>
      <ul>
        {indexChildSlugs.map(slug =>
          renderList(data.allMarkdownRemark.nodes, slug)
        )}
      </ul>
    </Layout>
  )
}

export default IndexPage
export const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fields: { slug: { regex: "/^/wiki/" } } }) {
      nodes {
        fields {
          slug
          child
        }
        frontmatter {
          title
        }
      }
    }
  }
`
