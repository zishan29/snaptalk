'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

interface Contact {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

export default function Contacts({
  setContactDetails,
}: {
  setContactDetails: (contact: Contact) => void;
}) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
    (async () => {
      let token = localStorage.getItem('token');
      const bearer = `Bearer ${token}`;
      try {
        let res = await fetch('https://snap-talk.adaptable.app/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
          },
        });
        if (res.ok) {
          let resData = await res.json();
          setContacts(resData.user.contacts);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      {contacts.length > 0 &&
        contacts.map((contact) => (
          <div
            key={contact._id}
            className="flex h-16 cursor-pointer items-center gap-2 px-2 font-semibold text-gray-200"
            onClick={() => setContactDetails(contact)}
          >
            {contact.profilePicture ? (
              <Image
                src={contact.profilePicture}
                width={100}
                height={100}
                alt="profile"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4/5 fill-gray-200"
              >
                <title>account-circle</title>
                <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
              </svg>
            )}
            <div className="w-full border-b border-neutral-500 py-4">
              {contact.username}
            </div>
          </div>
        ))}
    </>
  );
}
