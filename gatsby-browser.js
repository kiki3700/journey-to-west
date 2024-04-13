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
  // 여기에 추가적인 브라우저 환경에서 실행되어야 할 코드를 작성할 수 있습니다.
  var content = document.querySelector("body")
  if (content) {
    content.innerHTML = content.innerHTML.replace(
      /\[\[(.+?)\]\]\{(.+?)\}/g,
      '<a href="/wiki/$1">$2</a>'
    )
    content.innerHTML = content.innerHTML.replace(
      /\[\[(.+?)\]\]/g,
      '<a href="/wiki/$1">$1</a>'
    )
  }
}
