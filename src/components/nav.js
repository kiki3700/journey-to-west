import * as React from "react"
import { Link } from "gatsby"

const Nav = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to="/">blog</Link>
        </li>
        <li>
          <Link to="/wiki">wiki</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
