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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (getAccess) {
            router.push('/')
        }
    }, [])

    return (
        <>
            <Head>
                <title>Signup</title>
            </Head>
            <Navbar />
            <div className={style.LoginCard}>
                <span className={style.heading}>Signup</span>
                <form className={style.Form} onSubmit={handleSubmit}>
                    <Input name='firstName' className={style.input} placeholder='First Name' type='text' userData={userData} setUserData={setUserData} />
                    <Input name='lastName' className={style.input} placeholder='Last Name' type='text' userData={userData} setUserData={setUserData} />
                    <Input name='email' className={style.input} placeholder='Email' type='email' userData={userData} setUserData={setUserData} />
                    <Input name='password' className={style.input} placeholder='Password' type='password' userData={userData} setUserData={setUserData} />
                    <Input name='confirmPassword' className={style.input} placeholder='Confirm Password' type='password' userData={userData} setUserData={setUserData} />
                        <button disabled={loginDisable} className={style.Button} type="submit">
                            {loginDisable ? <div className={style.loader}></div> : null}
                            <span>Register</span>
                        </button>
                        <div className={style.btnGroup}>
                        <span>Already have an account?</span>
                        <Link href='/login' className={style.Link}>
                            <span>
                                Login
                            </span>
                        </Link>
                    </div>
                    <button className={style.Button1}>
                        <span>Login with Google</span>
                    </button>
                </form>
                <span className={style.error}>{message}</span>
            </div>
        </>
    )
}

export default SignUp;