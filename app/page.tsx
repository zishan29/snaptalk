'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Contacts from './components/Contacts';
import Chat from './components/Chat';
import AppNav from './components/AppNav';
import EditProfile from './components/EditProfile';
import Placeholder from './components/Placeholder';

interface Contact {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

export default function Home() {
  const [contactDetails, setContactDetails] = useState<Contact>({});
  const [editProfile, setEditProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch('https://snap-talk.adaptable.app/verifyToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: localStorage.getItem('token') }),
        });
        if (res.status === 401) {
          let resData = await res.json();
          console.log(resData.error);
          router.push('/login');
        }
      } catch (err) {
        console.log(err);
      }
    })();
  });

  const isEmptyObject = (obj: Contact) => !Object.keys(obj).length;

  return (
    <main className="flex h-screen w-screen justify-center bg-neutral-900">
      <div className="grid h-screen w-4/5 grid-cols-6">
        <div className="relative col-span-2 border-r border-neutral-500 bg-neutral-800">
          {editProfile ? (
            <EditProfile setEditProfile={setEditProfile} />
          ) : (
            <>
              <div className="relative h-16 w-full bg-neutral-600">
                <AppNav setEditProfile={setEditProfile} />
              </div>
              <Contacts setContactDetails={setContactDetails} />
            </>
          )}
        </div>
        <div className="col-span-4 bg-neutral-600">
          {isEmptyObject(contactDetails) ? (
            <Placeholder />
          ) : (
            <Chat contactDetails={contactDetails} />
          )}
        </div>
      </div>
    </main>
  );
}
