import { useState } from "react";
import { ReactComponent as ReactLogo } from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <ReactLogo />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="bg-green-600">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-3xl font-bold underline">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
