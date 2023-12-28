import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useCallback, useEffect, useState } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [value, setValue] = useState("");
  const onType = useCallback((val) => {
    console.log(val);
    socket.emit("send_message", val);
  })
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setValue(data);
      console.log(data);
    })
  },[socket])
  return (
    <div className="App">
      <CodeMirror value={value} height="200px" extensions={[javascript({ jsx: true })]} onChange={onType}/>
    </div>
  );
}

export default App;
