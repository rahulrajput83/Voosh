import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/navbar';


function todo() {
  let router = useRouter()
  const [id, setId] = useState('')

  useEffect(() => {
    if (router.isReady) {
      const { todo } = router.query
      setId(todo);
    }
  }, [router.isReady])

  useEffect(() => {
    const getAccess = localStorage.getItem('accessToken');
    if (getAccess) {
      if (id) {
        fetch(`/api/oneToDo?post=${id}`, {
          method: 'GET',
          headers: {
            access: getAccess
          }})
          .then(res => res.json())
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    else {
      console.log('LogOut')
    }
  }, [id])

  return (
    <>
      <Navbar />
      <div className=''>
        {id}
      </div>
    </>
  )
}

export default todo;