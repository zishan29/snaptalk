'use client';

import styles from './components.module.css';
import { useEffect, useState } from 'react';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token')) {
        (async () => {
          try {
            let res = await fetch(
              'https://snap-talk.adaptable.app/verifyToken',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: localStorage.getItem('token') }),
              },
            );
            if (res.status === 401) {
              let resData = await res.json();
              console.log(resData.error);
              router.push('/login');
            }
            if (res.status === 200) {
              router.push('/');
            }
          } catch (err) {
            console.log(err);
          }
        })();
      }
    }
  });

  async function loginUser(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let data = {
      username: username,
      password: password,
    };

    try {
      let res = await fetch('https://snap-talk.adaptable.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        let resData = await res.json();
        localStorage.setItem('token', resData.token);
        localStorage.setItem('id', resData.userData._id);
        router.push('/');
      }
      if (res.status === 403) {
        const resData = await res.json();
        setErrorMessage(resData.info.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form className={styles.form}>
        <div className="self-center text-xl font-semibold">Welcome back</div>
        <label>
          <input
            required
            placeholder=""
            type="text"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <span>username</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <span>password</span>
        </label>
        {errorMessage && (
          <div className="text-sm text-[#818181]">{errorMessage}</div>
        )}
        <button className={styles.fancy} onClick={(e) => loginUser(e)}>
          <span className={styles['top-key']}></span>
          <span className={styles.text}>Log in</span>
          <span className={styles['bottom-key-1']}></span>
          <span className={styles['bottom-key-2']}></span>
        </button>
        <div className="self-center text-sm">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="underline">
            Sign up
          </a>
        </div>
      </form>
    </>
  );
}
