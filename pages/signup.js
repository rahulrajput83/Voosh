import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Input from "../Components/Input";
import Navbar from "../Components/navbar";
import style from '../styles/Login.module.css'

function SignUp() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const [loginDisable, setLoginDisable] = useState(false)
    const [message, setMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.email === '' || userData.password === '') {
            setMessage('Please fill all details...')
        }
        else {
            setLoginDisable(true);
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then((res) => res.json())
                .then((res) => {
                    setMessage(res.message);
                    setLoginDisable(false);
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err);
                    setLoginDisable(false)
                })
        }

    }

    useEffect(() => {
        setMessage('')
    }, [userData])

    useEffect(() => {
        const getAccess = localStorage.getItem('accessToken');
        if(getAccess){
            router.push('/')
        }
      }, [])

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <Navbar />
            <div className={style.LoginCard}>
                <span className={style.heading}>Register</span>
                <form className={style.Form} onSubmit={handleSubmit}>
                    <Input name='email' className={style.input} placeholder='Enter Email Address' type='email' userData={userData} setUserData={setUserData} />
                    <Input name='password' className={style.input} placeholder='Enter Password' type='password' userData={userData} setUserData={setUserData} />
                    <div className={style.btnGroup}>
                        <button disabled={loginDisable} className={style.Button} type="submit">
                            {loginDisable ? <div className={style.loader}></div> : null}
                            <span>Register</span>
                        </button>
                        <Link href='/login' className={style.Link}>
                            <span>
                                Login
                            </span>
                        </Link>
                    </div>
                </form>
                <span className={style.error}>{message}</span>
            </div>
        </>
    )
}

export default SignUp;