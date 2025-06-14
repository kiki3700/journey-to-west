const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const blogTemplate = path.resolve("./src/templates/blog_template.js")
const wikiTemplate = path.resolve("./src/templates/wiki_template.js")

exports.createPages = async ({ graphql, actions, reporter }) => {
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
          internal {
            content
          }
        }
      }
    }
  `)
  if (wikiResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your wiki page`,
      wikiResult.errors,
    )
    return
  }
  const slugMap = wikiResult.data.allMarkdownRemark.nodes.reduce(
    (acc, node) => {
      acc[node.fields.slug] = node
      return acc
    },
    {},
  )

  let componentPath = wikiTemplate
  function travelAndCreateWikiPages(node, parent = null, visited = new Set()) {
    if (visited.has(node)) return
    visited.add(node)
    const links = extractLinks(node.internal.content)
    const childrenIds = []
    links.forEach(slug => {
      const childNode = slugMap[slug]
      if (childNode) {
        travelAndCreateWikiPages(childNode, node, visited)
        childrenIds.push(childNode.id)
      }
    })
    const parentId = parent ? parent.id : null
    if (node.fields.slug != "/wiki/") {
      createPage({
        path: node.fields.slug,
        component: componentPath,
        context: {
          id: node.id,
          parentId: parentId,
          childrenIds: childrenIds,
        },
      })
    }
  }

  travelAndCreateWikiPages(slugMap["/wiki/"])
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
      blogResult.errors,
    )
    return
  }
  const posts = blogResult.data.allMarkdownRemark.nodes
  // Create pages for blog posts and wiki entries based on their paths
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
      let componentPath = blogTemplate
      let slug = post.fields.slug
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    value = createFilePath({ node, getNode })
    // 파일의 절대 경로를 가져옴
    const fileNode = getNode(node.parent)
    const filePath = fileNode.absolutePath
    value = adjustSlugForContent(filePath, value)
    createNodeField({
      name: "slug",
      node,
      value,
    })
    if (filePath.includes("/content/wiki/")) {
      value = `/wiki${value}`
      createWikiNode(node, actions, getNode)
    }
  }
}
function adjustSlugForContent(filePath, slugValue) {
  if (filePath.includes("/content/blog/")) {
    return `/blog${slugValue}`
  }
  if (filePath.includes("/content/wiki/")) {
    return `/wiki${slugValue}`
  }
  return slugValue
}

function createWikiNode(node, actions, getNode) {
  const { createNodeField } = actions
  const links = extractLinks(node.internal.content)
  createNodeField({
    name: `child`,
    node: node,
    value: links,
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

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
function extractLinks(content) {
  const linkPattern = /\[\[([^\]]+)\]\]/g
  let match
  const links = []

  while ((match = linkPattern.exec(content)) !== null) {
    links.push(`/wiki/${match[1]}/`)
  }

  return links
}
