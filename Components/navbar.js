import React, { useEffect, useState } from 'react'
import style from '../styles/Navbar.module.css'
import Link from 'next/link'

function Navbar() {
  const [access, setAccess] = useState('')
  useEffect(() => {
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess)
  }, [])
  return (
    <nav className={style.nav}>
      <Link href='/' className={style.Link}>TO DO</Link>
      {access ? <button className={style.logout}>Logout</button>: <button className={style.logout}>Login</button>}
    </nav>
  )
}

export default Navbar