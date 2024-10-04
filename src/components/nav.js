import * as React from "react"
import { Link } from "gatsby"

const Nav = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <li>
          <Link to="/">Blog</Link>
        </li>
        <li>
          <Link to="/wiki">Wiki</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
