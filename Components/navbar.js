import React, { useEffect, useState } from 'react'
import style from '../styles/Navbar.module.css'
import Link from 'next/link'
import { del } from './del'
import { useRouter } from 'next/router'
import { PiNotepadBold } from "react-icons/pi";
import { usePathname } from 'next/navigation'

function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [access, setAccess] = useState('')
  useEffect(() => {
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess)
  }, [])
  const handleLogout = () => {
    router.push(del())
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess)
  }
  return (
    <nav className={style.nav}>
      <Link href='/' className={style.Link}>
        <PiNotepadBold />
      </Link>
      {access ?
        <button onClick={handleLogout} className={style.logout}>Logout</button>
        :
        <div className={style.auth}>
          <Link href='/login' className={pathname == '/login' ? style.login : style.signup}>Login</Link>
          <Link href='/signup' className={pathname != '/login' ? style.login : style.signup}>Signup</Link>
        </div>
      }
    </nav>
  )
}

export default Navbar;