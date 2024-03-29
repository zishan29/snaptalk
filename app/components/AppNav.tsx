'use client';

import { useEffect, useState } from 'react';

interface Contact {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

interface User {
  username?: string;
  password?: string;
  email?: string;
  profilePicture?: string;
  contacts?: Contact[];
}

export default function AppNav({
  setEditProfile,
}: {
  setEditProfile: (v: boolean) => void;
}) {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;
    (async () => {
      try {
        let res = await fetch('https://snap-talk.adaptable.app/user', {
          headers: {
            Authorization: bearer,
          },
        });
        if (res.ok) {
          let resData = await res.json();
          setUser(resData.user);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      {loading ? (
        <div className="lds-ellipsis absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <nav className="flex h-16 items-center bg-neutral-600 px-2 text-gray-100">
            <div
              className="flex cursor-pointer items-center gap-2 rounded-md p-2"
              onClick={() => setEditProfile(true)}
            >
              {user && user.profilePicture !== '' ? (
                <img
                  src={user.profilePicture as string}
                  alt=""
                  className="h-10 w-auto rounded-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-10 rounded-full fill-gray-200"
                >
                  <title>account-circle</title>
                  <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                </svg>
              )}
              <div className="font-semibold">{user && user.username}</div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
