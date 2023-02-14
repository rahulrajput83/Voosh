import Head from 'next/head'
import { useEffect, useState } from 'react'
import style from '../styles/Home.module.css'
import Navbar from '../Components/navbar'
import { MdClose } from 'react-icons/md'
import { useRouter } from 'next/router'
import {del} from '../Components/logOut'



export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [newToDo, setNewToDo] = useState('');
  const [addBtnDisable, setAddBtnDisable] = useState(false);
  const [access, setAccess] = useState('');
  const [showToDo, setShowToDo] = useState(false);
  const [oneToDo, setOneToDo] = useState({
    title: '',
    desc: '',
    lastUpdate: ''
  })


  useEffect(() => {
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess);
    fetch('/api/getToDo', {
      method: 'GET',
      headers: {
        access: getAccess
      }
    })
      .then(res => res.json())
      .then((res) => {
        if (res.message === 'Token Expired') {
          router.push(del())
        }
        else {
          setData(res.data);
        }

      })
      .catch(() => {
        console.log('err')
      })
  }, [])

  useEffect(() => {
    if (showToDo && data && data.length > 0) {
      fetch(`/api/oneToDo?post=63eb065944e7ef2b5280d45a`, {
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
          else {
            setOneToDo({ ...oneToDo, title: res.data.title, desc: res.data.desc, lastUpdate: res.data.lastUpdate })
          }
        })
        .catch((err) => {
          console.log('err')
        })
    }
  }, [showToDo, data])

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
        {data && data.length > 0 && data.map((e, index) => {
          return (
            <div onClick={() => setShowToDo(true)} /* href={`/todo/${e._id}`} */ className={style.item} key={`item-${index}`}>
              <span className={style.number}>{index + 1}</span>
              <span className={style.title}>{e.title}</span>
              <span className={style.lastUpdate}>{e.lastUpdate}</span>
            </div>
          )
        })}
        {data && data.length === 0 && <span className={style.empty}>Your To Do list is empty. Add Now !!</span>}
      </div>
      {showToDo ?
        <div className={style.showToDo}>
          {oneToDo.title ?
            <>
              <div className={style.oneHead}>
                <span className={style.oneLast}>Last Update: {oneToDo.lastUpdate}</span>
                <MdClose className={style.icon} onClick={() => setShowToDo(false)} />
              </div>
              <div className={style.data}>
                <input value={oneToDo.title} />
                <input value={oneToDo.desc} />
                <textarea cols='10' value={oneToDo.desc} />
              </div>
              
            </>
            : null
          }
        </div>
        : null
      }
    </div>
  </>
}
