import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react'
import Navbar from '../../Components/navbar';


function todo() {
    const router = useRouter()
    const [id, setId] = useState('')

    useEffect(() => {
        setId(router.query.todo)
    })
  return (
    <Navbar />
  )
}

export default todo;