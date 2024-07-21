import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import style from '../styles/Home.module.css'
import Navbar from '../Components/navbar'
import { MdClose, MdDelete, MdEdit, MdSave } from 'react-icons/md'
import { useRouter } from 'next/router'
import { del } from '../Components/del'
import AddPost from '../Components/AddPost'
import DragDrop from '../Components/DragDrop'


/* Home page component */
export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [access, setAccess] = useState('');
  const [showToDo, setShowToDo] = useState(false);
  const [oneToDo, setOneToDo] = useState({
    title: '',
    desc: '',
    createdAt: ''
  })
  const [loaded, setLoaded] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleId, setSingleId] = useState('');
  const [addPost, setAddPost] = useState(false);
  const [search, setSearch] = useState({
    field: '',
    order: 'recent'
  });

  /* get all task function */
  const getAllToDo = () => {
    const getAccess = localStorage.getItem('accessToken');
    setAccess(getAccess);
    setLoaded(false)
    fetch(`/api/getToDo?search=${search.field}&order=${search.order}`, {
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
  }

  useEffect(() => {
    getAllToDo();
  }, [])

  useEffect(() => {
    const getAccess = localStorage.getItem('accessToken');
    if (!getAccess) {
      router.push('/login')
    }
  }, [])

  /* get one task function */
  const getOneTask = () => {
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

  /* delete task endpoint */
  const handleDelete = (id) => {
    fetch(`/api/delete?post=${id}`, {
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

  /* update task endpoint */
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

  useEffect(() => {
    getAllToDo()
  }, [search])

  /* update task category function */
  const updateTaskCategory = (taskId, taskNewCategory) => {
    fetch(`/api/updateCategory`, {
      method: 'PUT',
      headers: {
        access: access
      },
      body: JSON.stringify({ id: taskId, category: taskNewCategory + 1 })
    })
      .then(res => res.json())
      .then((res) => {
        if (res.message === 'Token Expired') {
          router.push(del())
        }
        else if (res.message === 'Success') {
          getAllToDo();
        }
      })
      .catch((err) => {
        console.log('err')
      })
  }

  useEffect(() => {
    if (singleId) getOneTask();
  }, [singleId, readOnly])

  /* Return */
  return <>
    <Head>
      <title>Home</title>
    </Head>
    <Navbar />

    <div className={style.dashboard}>
      <button className={style.addNewTask} onClick={() => setAddPost(true)}>Add Task</button>
      {/* Filters */}
      <div className={style.filterCard}>
        <div className={style.search}>
          <span>Search</span>
          <input name='field' onChange={(e) => setSearch({ ...search, [e.target.name]: e.target.value })} value={search.field} placeholder='Search...' />
        </div>
        <div className={style.search}>
          <span>Sort By</span>
          <select name='order' value={search.order} onChange={(e) => setSearch({ ...search, [e.target.name]: e.target.value })}>
            <option value='recent'>Recent</option>
            <option value='oldest'>Oldest</option>
          </select>
        </div>
      </div>
      {!loaded && <div className={style.loader}></div>}

      {/* Show task popup */}
      {showToDo &&
        <div className={style.showToDo}>
          {!oneToDo ? <div className={style.loading}></div> : null}
          {oneToDo ?
            <>
              <div className={style.data}>
                <span>{readOnly ? 'Task Details' : 'Edit Task'}</span>
                <form onSubmit={handleUpdate}>
                  <span className={style.textStyle}>Title</span>
                  <input required placeholder='Title' className={readOnly ? style.input : style.borderInput} readOnly={readOnly} name='title' onChange={(e) => setOneToDo({ ...oneToDo, [e.target.name]: e.target.value })} value={oneToDo.title} />
                  <span className={style.textStyle}>Description</span>
                  <textarea placeholder='Description' className={readOnly ? style.textarea : style.borderTextBox} readOnly={readOnly} name='desc' onChange={(e) => setOneToDo({ ...oneToDo, [e.target.name]: e.target.value })} cols='10' value={oneToDo.desc} />
                  <div className={style.bottomIcon}>
                    {!readOnly &&
                      <button className={style.edit} type='submit'>
                        Save
                      </button>}
                    <button className={readOnly ? style.close : style.cancel} onClick={() => { setShowToDo(false); setReadOnly(true) }}>
                      {readOnly ? 'Close' : 'Cancel'}
                    </button>
                  </div>
                </form>

              </div>

            </>
            : null
          }
        </div>
      }
      {/* Common all task component */}
      {data && data.length > 0 && <DragDrop setData={setData} data={data} handleDelete={handleDelete} setReadOnly={setReadOnly} setShowToDo={setShowToDo} setSingleLoading={setSingleLoading} setSingleId={setSingleId} updateTaskCategory={updateTaskCategory} />}
      {/* Add new task popup */}
      {addPost && <AddPost getAllToDo={getAllToDo} access={access} addPost={addPost} setAddPost={setAddPost} />}

    </div >
  </>
}
