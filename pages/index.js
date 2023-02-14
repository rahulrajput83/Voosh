import Head from 'next/head'
import { useEffect, useState } from 'react'
import style from '../styles/Home.module.css'
import Link from 'next/link'
import Navbar from '../Components/navbar'



export default function Home() {
  const [data, setData] = useState([]);
  const [time, setTime] = useState('');
  const [newToDo, setNewToDo] = useState('');
  const [addBtnDisable, setAddBtnDisable] = useState(false);
  const [access, setAccess] = useState('');

  useEffect(() => {
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess);
    if (getAccess) {
      fetch('/api/getToDo', {
        method: 'GET',
        headers: {
          access: getAccess
        }
      })
        .then(res => res.json())
        .then((res) => {
          setData(res.data)
        })
        .catch(() => {
          console.log('err')
        })
    }
    else {
      console.log('LogOut')
    }
  }, [])

  useEffect(() => {
    function getLocaltime() {
      return new Date().toLocaleTimeString();
    }
    setTime(`${new Date().getDate()}/${new Date().getMinutes()}/${new Date().getFullYear()} ${getLocaltime()}`);
  }, [])
  return <>
    <Head>
      <title>Home</title>
    </Head>
    <Navbar />

    <div className={style.dashboard}>
      <div className={style.newToDo}>
        <div className={style.inputContainer}>
          {addBtnDisable ? <div className={style.loader}></div> : null}
          <input value={newToDo} onChange={(e) => setNewToDo(e.target.value)} type='text' placeholder='Enter New To Do' />
        </div>
        <button onClick={() => setAddBtnDisable(!addBtnDisable)} disabled={addBtnDisable}>ADD</button>
      </div>
      <div className={style.toDo}>
        {data.length > 0 && data.map((e, index) => {
          return (
            <Link href={`/todo/${e._id}`} className={style.item} key={`item-${index}`}>
              <span className={style.number}>{index + 1}</span>
              <span className={style.title}>{e.title}</span>
              <span className={style.lastUpdate}>{e.lastUpdate}</span>
            </Link>
          )
        })}
        {data.length === 0 && <span className={style.empty}>Your To Do list is empty. Add Now !!</span>}
      </div>
    </div>
  </>
}
