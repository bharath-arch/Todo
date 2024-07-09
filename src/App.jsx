import React, { useState } from 'react'; 
import './App.css'; 
import InputBox from './components/inputBox'; 

function App() {
  const [count, setCount] = useState(0); 

  return (
    <div className="App"> 
      <InputBox /> 
     
    </div>
  );
}

export default App;
