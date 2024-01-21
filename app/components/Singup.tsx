'use client';

import { useEffect, useState } from 'react';
import styles from './components.module.css';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

interface Errors {
  username?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  email?: string | null;
}

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  async function signUpUser(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
    };

    try {
      let res = await fetch('https://snap-talk.adaptable.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        let resData = await res.json();
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', resData.token);
        }
        router.push('/');
      }
      if (res.status === 400) {
        let resData = await res.json();
        setErrors(resData.errors);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
  }, []);

  return (
    <>
      <form className={styles.form}>
        <div className="self-center text-xl font-semibold">
          Create a SnapTalk account
        </div>
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
        {errors.username && (
          <div className="text-sm text-[#818181]">{errors.username}</div>
        )}

        <label>
          <input
            required
            placeholder=""
            type="email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <span>email</span>
        </label>
        {errors.email && (
          <div className="text-sm text-[#818181]">{errors.email}</div>
        )}

        <div className={styles.flex}>
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

          <label>
            <input
              required
              placeholder=""
              type="password"
              className={styles.input}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <span>confirm password</span>
          </label>
        </div>
        {errors.password ? (
          <div className="text-sm text-[#818181]">{errors.password}</div>
        ) : errors.confirmPassword ? (
          <div className="text-sm text-[#818181]">{errors.confirmPassword}</div>
        ) : (
          ''
        )}

        <button className={styles.fancy} onClick={(e) => signUpUser(e)}>
          <span className={styles['top-key']}></span>
          <span className={styles.text}>sign up</span>
          <span className={styles['bottom-key-1']}></span>
          <span className={styles['bottom-key-2']}></span>
        </button>

        <div className="self-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="underline">
            Log in
          </a>
        </div>
      </form>
    </>
  );
}
