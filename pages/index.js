import Head from 'next/head'
import { useEffect, useState } from 'react'
import style from '../styles/Home.module.css'
import Link from 'next/link'
import Navbar from '../Components/navbar'



export default function Home() {
  const [data, setData] = useState('');
  const [time, setTime] = useState('');
  const [newToDo, setNewToDo] = useState('')
  const [addBtnDisable, setAddBtnDisable] = useState(false)
  const ToDo = [
    {
      title: 'This is first to Do, This is first to DoThis is first to DoThis is first to DoThis is first to DoThis is first to Do',
      lastUpdate: time,
      addedOn: 'jsfdgwygfju',
    },
    {
      title: 'This is first to Do',
      lastUpdate: time,
      addedOn: 'jsfdgwygfju',
    },
    {
      title: 'This is first to Do',
      lastUpdate: time,
      addedOn: 'jsfdgwygfju',
    },
    {
      title: 'This is first to Do',
      lastUpdate: time,
      addedOn: 'jsfdgwygfju',
    },
    {
      title: 'This is first to Do',
      lastUpdate: time,
      addedOn: 'jsfdgwygfju',
    }
  ]

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
        {ToDo.length > 0 && ToDo.map((e, index) => {
          return (
            <Link href={`/todo/${e.addedOn}`} className={style.item} key={`item-${index}`}>
              <span className={style.number}>{index + 1}</span>
              <span className={style.title}>{e.title}</span>
              
              <span className={style.lastUpdate}>{e.lastUpdate}</span>
            </Link>
          )
        })}
        {ToDo.length === 0 && <span className={style.empty}>Your To Do list is empty. Add Now !!</span>}
      </div>
    </div>
  </>
}
