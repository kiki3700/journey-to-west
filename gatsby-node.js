/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const blogTemplate = path.resolve("./src/templates/blog_template.js")
const wikiTemplate = path.resolve("./src/templates/wiki_template.js")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Blog posts query
  await createBlogPost(graphql, actions, reporter)
  await createWikiPage(graphql, actions, reporter)
}

async function createWikiPage(graphql, actions, reporter) {
  const { createPage } = actions
  const wikiResult = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/wiki/" } }
        sort: { frontmatter: { date: ASC } }
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)
  if (wikiResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your wiki page`,
      wikiResult.errors
    )
    return
  } // Wiki entries quer
  pages = wikiResult.data.allMarkdownRemark.nodes
  if (pages.length > 0) {
    pages.forEach(page => {
      let componentPath = wikiTemplate
      slug = "/wiki" + page.fields.slug

      createPage({
        path: slug,
        component: componentPath,
        context: {
          id: page.id,
        },
      })
    })
  }
}
async function createBlogPost(graphql, actions, reporter) {
  const { createPage } = actions
  const blogResult = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { frontmatter: { date: ASC } }
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (blogResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  } // Wiki entries query
  const posts = blogResult.data.allMarkdownRemark.nodes
  // Create pages for blog posts and wiki entries based on their paths
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
      let componentPath = blogTemplate
      let slug = post.fields.slug
      console.log(slug)
      createPage({
        path: slug,
        component: componentPath,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
