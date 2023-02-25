import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import style from '../styles/Home.module.css'
import Navbar from '../Components/navbar'
import { MdClose, MdDelete, MdEdit, MdSave } from 'react-icons/md'
import { useRouter } from 'next/router'
import { del } from '../Components/del'
import AddPost from '../Components/AddPost'



export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [access, setAccess] = useState('');
  const [showToDo, setShowToDo] = useState(false);
  const [oneToDo, setOneToDo] = useState({
    title: '',
    desc: '',
    lastUpdate: ''
  })
  const [loaded, setLoaded] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleId, setSingleId] = useState('');
  const [addPost, setAddPost] = useState(false)

  const getAllToDo = useCallback(() => {
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess);
    setLoaded(false)
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
        else if (res.message === 'Success') {
          setLoaded(true)
          setData(res.data);
        }

      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    getAllToDo();
  }, [getAllToDo])

  useEffect(() => {
    const getAccess = localStorage.getItem('accessToken');
    if (!getAccess) {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    if (showToDo && data && data.length > 0) {
      fetch(`/api/oneToDo?post=${singleId}`, {
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
            setOneToDo({ ...oneToDo, title: res.data.title, desc: res.data.desc, lastUpdate: res.data.lastUpdate });
            setSingleLoading(false)
          }
        })
        .catch((err) => {
          console.log('err')
        })
    }
  }, [showToDo, data])

  const handleDelete = () => {
    if (showToDo && data && data.length > 0) {
      fetch(`/api/delete?post=${singleId}`, {
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
            setShowToDo(false);
            getAllToDo();
          }
        })
        .catch((err) => {
          console.log('err')
        })
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if (showToDo && data && data.length > 0) {
      let date = new Date();
      date = date.toLocaleString();
      fetch(`/api/edit`, {
        method: 'POST',
        headers: {
          access: access
        },
        body: JSON.stringify({ id: singleId, title: oneToDo.title, desc: oneToDo.desc, time: date })
      })
        .then(res => res.json())
        .then((res) => {
          if (res.message === 'Token Expired') {
            router.push(del())
          }
          else if (res.message === 'Success') {
            setShowToDo(false);
            getAllToDo();
            setReadOnly(!readOnly)
          }
        })
        .catch((err) => {
          console.log('err')
        })
    }
  }

  return <>
    <Head>
      <title>Home</title>
    </Head>
    <Navbar />

    <div className={style.dashboard}>
      <div className={style.newToDo}>
        <div className={style.inputContainer}>
          {/* {addBtnDisable ? <div className={style.loader}></div> : null} */}
          <input readOnly onClick={() => setAddPost(true)} type='text' placeholder='Enter New To Do' />
        </div>
      </div>
      {!loaded ? <div className={style.loader}></div> : null}

      <div className={style.toDo}>
        {data && data.length > 0 && data.map((e, index) => {
          return (
            <div onClick={() => { setShowToDo(true); setSingleLoading(true); setSingleId(e._id) }} /* href={`/todo/${e._id}`} */ className={style.item} key={`item-${index}`}>
              <span className={style.number}>{index + 1}</span>
              <span className={style.title}>{e.title}</span>
              <span className={style.lastUpdate}>{e.lastUpdate}</span>
            </div>
          )
        })}

        {data && loaded && data.length === 0 && <span className={style.empty}>Your To Do list is empty. Add Now !!</span>}
      </div>
      {showToDo ?
        <div className={style.showToDo}>
          {singleLoading ? <div className={style.loading}></div> : null}
          {oneToDo.lastUpdate && !singleLoading ?
            <>
              <div className={style.oneHead}>
                <span className={style.oneLast}>Last Update: {oneToDo.lastUpdate}</span>
                <MdClose className={style.icon} onClick={() => { setShowToDo(false); setReadOnly(true) }} />
              </div>
              <div className={style.data}>
                <form onSubmit={handleUpdate}>
                  <input required placeholder='Title' className={`${style.input} ${!readOnly ? style.border : ''}`} readOnly={readOnly} name='title' onChange={(e) => setOneToDo({ ...oneToDo, [e.target.name]: e.target.value })} value={oneToDo.title} />
                  <textarea placeholder='Description' className={`${style.textarea} ${!readOnly ? style.border : ''}`} readOnly={readOnly} name='desc' onChange={(e) => setOneToDo({ ...oneToDo, [e.target.name]: e.target.value })} cols='10' value={oneToDo.desc} />
                  <div className={style.bottomIcon}>
                    {!readOnly ?
                      <button className={style.edit} type='submit'>
                        <MdSave />
                      </button> :
                      <MdEdit onClick={() => setReadOnly(!readOnly)} className={style.edit} />}
                    <MdDelete onClick={handleDelete} className={style.delete} />
                  </div>
                </form>

              </div>

            </>
            : null
          }
        </div>
        : null
      }
      {addPost ? <AddPost getAllToDo={getAllToDo} access={access} addPost={addPost} setAddPost={setAddPost} /> : null}

    </div>
  </>
}
