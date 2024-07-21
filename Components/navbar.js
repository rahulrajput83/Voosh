import React, { useEffect, useState } from 'react'
import style from '../styles/Navbar.module.css'
import Link from 'next/link'
import { del } from './del'
import { useRouter } from 'next/router'
import { PiNotepadBold } from "react-icons/pi";
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react';
import userImg from '/image.png'

/* Common navbar component */
function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [access, setAccess] = useState('')
  const [imgUrl, setImgUrl] = useState(userImg)
  /* Get the accessToken from local storage */
  useEffect(() => {
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess)
  }, [])

  useEffect(() => {
    if(access) {
      getUserImg()
    }
  }, [access])

  /* Logout function */
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(del())
  }

  /* get user image */
  const getUserImg = () => {
    fetch(`/api/getUser`, {
      method: 'GET',
      headers: {
        access: access
      }
    })
      .then(res => res.json())
      .then((res) => {
        if (res.message === 'Token Expired') {
          router.push(del())
        }
        else if (res.message === 'Success') {
          if(res.data && res.data.imgUrl) {
            setImgUrl(res.data.imgUrl)
          }
          else{
            setImgUrl(userImg)
          }
        }
      })
      .catch((err) => {
        console.log('err')
      })
  }

  /* Return */
  return (
    <nav className={style.nav}>
      <Link href='/' className={style.Link}>
        <PiNotepadBold />
      </Link>
      {access ?
        <div className={style.userRight}>
          <img className={style.userImage} src={imgUrl} alt='user profile' />
          <button onClick={handleLogout} className={style.logout}>Logout</button>
        </div>
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