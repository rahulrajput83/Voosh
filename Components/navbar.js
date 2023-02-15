import React, { useEffect, useState } from 'react'
import style from '../styles/Navbar.module.css'
import Link from 'next/link'
import { del } from './del'
import { useRouter } from 'next/router'

function Navbar() {
  const router = useRouter()
  const [access, setAccess] = useState('')
  const [time, setTime] = useState('')
  useEffect(() => {
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess)
    let date = new Date();
    setTime(date.toLocaleString());
  }, [])
  const handleLogout = () => {
    router.push(del())
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess)
  }
  return (
    <nav className={style.nav}>
      {time}
      <Link href='/' className={style.Link}>TO DO</Link>
      {access ? <button onClick={handleLogout} className={style.logout}>Logout</button>: <button className={style.logout}>Login</button>}
    </nav>
  )
}

export default Navbar