import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-4xl font-bold">Vite + React</h1>
      <button
        type="button"
        onClick={() => setCount((count) => count + 1)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        count is {count}
      </button>
    </>
  );
}
