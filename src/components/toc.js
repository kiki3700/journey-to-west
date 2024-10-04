import * as React from "react"

const Toc = ({ toc }) => {
  return (
    <nav className="toc-container">
      <h4>목차</h4>
      <div className="toc" dangerouslySetInnerHTML={{ __html: toc }} />
    </nav>
  )
}

export default Toc
