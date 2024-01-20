'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Contacts from './components/Contacts';
import Chat from './components/Chat';

interface Contact {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

export default function Home() {
  const [contactDetails, setContactDetails] = useState<Contact>({});
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
  }, []);

  return (
    <main className="flex h-screen w-screen justify-center">
      <div className="grid h-screen w-4/5 grid-cols-6">
        <div className="col-span-2 bg-gray-200">
          <Contacts setContactDetails={setContactDetails} />
        </div>
        <div className="col-span-4 bg-gray-100">
          <Chat contactDetails={contactDetails} />
        </div>
      </div>
    </main>
  );
}
