import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"

const AboutPage = ({ data, location }) => {
  const { site, markdownRemark } = data
  const title = site.siteMetadata.title
  const { html } = markdownRemark
  return (
    <Layout location={location} title={title}>
      <h1>About</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fileAbsolutePath: { regex: "/content/about\\.md$/" }) {
      html
    }
  }
  

`

export default AboutPage
