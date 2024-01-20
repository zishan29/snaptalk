'use client';

import { MouseEvent } from 'react';
import { useState, useRef } from 'react';
import { Button, chakra } from '@chakra-ui/react';

interface Contact {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

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

export default function Message({
  contactDetails,
  setMessages,
}: {
  contactDetails: Contact;
  setMessages: (array: Message[]) => void;
}) {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const userId = localStorage.getItem('id');

  async function sendMessage(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;

    const formData = new FormData();
    formData.append('receiverId', contactDetails._id);

    formData.append('content[type]', message ? 'text' : 'image');
    formData.append('content[data]', message);

    if (image) {
      formData.append('image', image);
    }

    try {
      let res = await fetch('https://snap-talk.adaptable.app/messages', {
        method: 'POST',
        headers: {
          Authorization: bearer,
        },
        body: formData,
      });
      if (res.ok) {
        let data = await res.json();
        setMessage('');
        (async () => {
          let res2 = await fetch(
            `https://snap-talk.adaptable.app/messages/${contactDetails._id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: bearer,
              },
            },
          );
          if (res2.ok) {
            let resData = await res2.json();
            const updatedMessages = resData.messages.map(
              (message: Message) => ({
                ...message,
                isUser: message.sender === userId,
              }),
            );

            setMessages(updatedMessages);
          }
        })();
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form>
      <div className="flex">
        <input
          type="text"
          className="w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          border="2px solid"
          h="1.75rem"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-full w-full"
          >
            <title>image</title>
            <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
          </svg>
        </Button>
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          ref={inputRef}
          style={{ display: 'none' }}
        />
        <button onClick={(e) => sendMessage(e)}>send</button>
      </div>
    </form>
  );
}