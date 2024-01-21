'use client';
import { useEffect, useState } from 'react';
import ChatNav from './ChatNav';
import Message from './Message';
import Image from 'next/image';
import clsx from 'clsx';

interface Message {
  content: {
    type: string;
    data: string;
  };
  createdAt: string;
  updatedAt: string;
  receiver: string;
  sender: string;
  _id: string;
  isUser?: boolean;
}

interface Contact {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

export default function Chat({ contactDetails }: { contactDetails: Contact }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('id') : null;
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const bearer = `Bearer ${token}`;
      try {
        if (!isEmptyObject(contactDetails)) {
          let res = await fetch(
            `https://snap-talk.adaptable.app/messages/${contactDetails._id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: bearer,
              },
            },
          );
          if (res.ok) {
            let resData = await res.json();
            const updatedMessages = resData.messages.map(
              (message: Message) => ({
                ...message,
                isUser: message.sender === userId,
              }),
            );

            setMessages(updatedMessages);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [contactDetails, userId]);

  const isEmptyObject = (obj: Contact) => !Object.keys(obj).length;
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex-none">
          <ChatNav contactDetails={contactDetails} />
        </div>
        <div className="flex-1 overflow-y-auto bg-neutral-800 text-gray-200">
          <div className="mx-2 my-4 grid gap-4">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message._id}
                  className={clsx(
                    message.isUser ? 'justify-self-end' : 'justify-self-start',
                  )}
                >
                  {message.content.type === 'text' ? (
                    <div className="rounded-md bg-neutral-600 px-4 py-2">
                      {message.content.data}
                    </div>
                  ) : (
                    <Image
                      src={message.content.data}
                      alt={message.content.type}
                      width={400}
                      height={400}
                      className="h-auto w-auto rounded-md bg-neutral-600 p-4"
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="color-gray-200 justify-self-center">
                You have no conversation with this user
              </div>
            )}
          </div>
        </div>
        {!isEmptyObject(contactDetails) && (
          <div className="flex-none">
            <Message
              contactDetails={contactDetails}
              setMessages={setMessages}
            />
          </div>
        )}
      </div>
    </>
  );
}
