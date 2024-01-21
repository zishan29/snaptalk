'use client';

import { useState, useEffect, useRef } from 'react';
import { MouseEvent } from 'react';

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

export default function EditProfile({
  setEditProfile,
}: {
  setEditProfile: (v: boolean) => void;
}) {
  const [user, setUser] = useState<User>({});
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedUsername, setEditedUsername] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(true);

  const handleEditClickEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditClickUsername = () => {
    setIsEditingUsername(true);
  };

  const handleSaveClickEmail = () => {
    setIsEditingEmail(false);
  };

  const handleSaveClickUsername = () => {
    setIsEditingUsername(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;
    (async () => {
      try {
        let res = await fetch('https://snap-talk.adaptable.app/user', {
          method: 'GET',
          headers: {
            Authorization: bearer,
          },
        });
        if (res.ok) {
          let resData = await res.json();
          setUser(resData.user);
          setEditedUsername(resData.user.username as string);
          setEditedEmail(resData.user.email as string);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  async function updateProfile(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;

    const formData = new FormData();
    formData.append('username', editedUsername as string);
    formData.append('email', editedEmail as string);

    if (image !== null) {
      formData.append('image', image);
    }

    try {
      let res = await fetch('https://snap-talk.adaptable.app/user', {
        method: 'POST',
        headers: {
          Authorization: bearer,
        },
        body: formData,
      });
      if (res.ok) {
        try {
          let res2 = await fetch('https://snap-talk.adaptable.app/user', {
            method: 'GET',
            headers: {
              Authorization: bearer,
            },
          });
          if (res2.ok) {
            let resData2 = await res2.json();
            setUser(resData2.user);
            setEditedUsername(resData2.user.username);
            setEditedEmail(resData2.user.email);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
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
          <nav className="flex h-14 items-center gap-4 px-4 text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 cursor-pointer fill-gray-200"
              onClick={() => setEditProfile(false)}
            >
              <title>arrow-left</title>
              <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
            <div>Your profile</div>
          </nav>
          <div className="mt-6 flex flex-col items-center gap-6 px-4 text-gray-200">
            {user.profilePicture !== '' ? (
              <div className="relative">
                {user.profilePicture && (
                  <img
                    src={user.profilePicture as string}
                    alt="profile"
                    className="h-60 w-auto rounded-full brightness-75"
                  />
                )}
                <div className="h-full w-full cursor-pointer">
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-gray-200"
                    >
                      <title>pencil</title>
                      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                    </svg>
                  </button>
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImage(e.target.files ? e.target.files[0] : null)
                    }
                    ref={inputRef}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-60 rounded-full fill-gray-200 brightness-75"
                >
                  <title>account-circle</title>
                  <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                </svg>
                <div className="h-full w-full cursor-pointer">
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-gray-200"
                    >
                      <title>pencil</title>
                      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                    </svg>
                  </button>
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImage(e.target.files ? e.target.files[0] : null)
                    }
                    ref={inputRef}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="text-sm">Your Username</div>
              <div className="mt-2 flex w-full items-center text-lg">
                {isEditingUsername ? (
                  <div className="flex w-full items-center border-b border-neutral-500">
                    <input
                      type="text"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      className="flex-grow  bg-transparent py-1 outline-none"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 cursor-pointer fill-gray-200"
                      onClick={
                        isEditingUsername
                          ? handleSaveClickUsername
                          : handleEditClickUsername
                      }
                    >
                      <title>check-bold</title>
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                    </svg>
                  </div>
                ) : (
                  <>
                    <div className="grow">
                      <div className="py-1">{user && editedUsername}</div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 cursor-pointer fill-gray-200"
                      onClick={
                        isEditingUsername
                          ? handleSaveClickUsername
                          : handleEditClickUsername
                      }
                    >
                      <title>pencil</title>
                      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                    </svg>
                  </>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="text-sm">Your email</div>
              <div className="mt-2 flex w-full items-center text-lg">
                {isEditingEmail ? (
                  <div className="flex w-full items-center border-b border-neutral-500">
                    <input
                      type="text"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="flex-grow  bg-transparent py-1 outline-none"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 cursor-pointer fill-gray-200"
                      onClick={
                        isEditingEmail
                          ? handleSaveClickEmail
                          : handleEditClickEmail
                      }
                    >
                      <title>check-bold</title>
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                    </svg>
                  </div>
                ) : (
                  <>
                    <div className="grow">
                      <div className="py-1">{user && editedEmail}</div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 cursor-pointer fill-gray-200"
                      onClick={
                        isEditingEmail
                          ? handleSaveClickEmail
                          : handleEditClickEmail
                      }
                    >
                      <title>pencil</title>
                      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                    </svg>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={(e) => updateProfile(e)}
              className="rounded bg-neutral-600 p-2 text-gray-200 hover:bg-neutral-500 active:bg-neutral-700"
            >
              Save
            </button>
          </div>
        </>
      )}
    </>
  );
}
