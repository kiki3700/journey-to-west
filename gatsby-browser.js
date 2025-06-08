// custom typefaces
require("@fontsource-variable/montserrat")
require("@fontsource/merriweather")
// normalize CSS across browsers
require("./src/normalize.css")
// custom CSS styles
require("./src/style.css")

// Highlighting for code blocks
require("prismjs/themes/prism.css")

exports.onRouteUpdate = () => {
  var content = document.querySelector("body")
  if (content) {
    content.innerHTML = content.innerHTML.replace(
      /\[\[(.+?)\]\]\{(.+?)\}/g,
      '<a href="/wiki/$1">$2</a>',
    )
    content.innerHTML = content.innerHTML.replace(
      /\[\[(.+?)\]\]/g,
      '<a href="/wiki/$1">$1</a>',
    )
    content.classList.add("ready")
  }
}
