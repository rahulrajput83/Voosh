import React from 'react'
import style from '../styles/Home.module.css'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className={style.nav}>
      <Link href='/' className={style.Link}>TO DO</Link>
      <button className={style.logout}>Logout</button>
    </nav>
  )
}

export default Navbar