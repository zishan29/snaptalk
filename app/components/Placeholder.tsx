export default function Placeholder() {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center text-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-auto w-40 fill-gray-200"
        >
          <title>message</title>
          <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z" />
        </svg>
        <div className="text-2xl font-semibold">SnapTalk</div>
        <div className="mt-2">Send and receive text or images to friends.</div>
      </div>
    </>
  );
}
