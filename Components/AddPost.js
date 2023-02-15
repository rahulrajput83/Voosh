import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { MdClose, MdSave } from 'react-icons/md';
import style from '../styles/AddPost.module.css'
import { del } from './del';


function AddPost({ getAllToDo, setAddPost, access }) {
    const router = useRouter();
    const [data, setData] = useState({
        title: '',
        desc: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        date = date.toLocaleString();

        fetch('/api/newToDo', {
            method: 'POST',
            headers: {
                access: access
            },
            body: JSON.stringify({ title: data.title, desc: data.desc, time: date })
        })
            .then(res => res.json())
            .then((res) => {
                if (res.message === 'Token Expired') {
                    router.push(del())
                }
                else if (res.message === 'Successfully Added') {
                    setAddPost(false)
                    getAllToDo();
                }

            })
            .catch(() => {
                console.log('err')
            })
    }
    return (
        <div className={style.AddPost}>
            <span className={style.title}>Add New To Do</span>
            <MdClose onClick={() => setAddPost(false)} className={style.close} />
            <form onSubmit={handleSubmit}>
                <input required onChange={(e) => setData({ ...data, title: e.target.value })} className={style.input} placeholder='Enter Title' />
                <textarea onChange={(e) => setData({ ...data, desc: e.target.value })} className={style.textarea} placeholder='Enter Description' />
                <button type='submit' className={style.save}>
                    <MdSave />
                </button>
            </form>

        </div>
    )
}

export default AddPost;