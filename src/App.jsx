import { useCallback, useState, useRef ,useEffect } from 'react'

import './App.css'

function App() {
const [length, setlength] = useState(8)
const [characterAllowed, setcharacterAllowed] = useState(false)
const [numberAllowed, setNumberAllowed] = useState(false)
const [password, setpassword] = useState("")
let passwordRef =  useRef(null)

const passwordgenerator=useCallback(()=>{
  let pass="";
  let char='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if(characterAllowed) char+='~!@#$%^&*()_+';
  if(numberAllowed) char+='1234567890';
  for (let i = 1; i <= length; i++) {
  let str=Math.floor(Math.random()*char.length+1);
    pass+=char.charAt(str)
  }
setpassword(pass);
},[length,characterAllowed,numberAllowed,setpassword])
useEffect(()=>{
passwordgenerator();
},[length,characterAllowed,numberAllowed,setpassword,passwordgenerator])

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password)
}, [password])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-3 text-4xl'>Password generator</h1>
  <div className="flex shadow rounded-lg overflow-hidden mt-10 mb-4 h-10">
      <input
          type="text"
          value={password}
          className="w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          
      />
      <button
      onClick={copyPasswordToClipboard}
      className=' bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >copy</button>
      
  </div>
  <div className='flex gap-x-2 text-sm'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={6}
      max={100}
      value={length}
       className='cursor-pointer'
       onChange={(e) => {setlength(e.target.value)}}
        />
        <label>Length: {length}</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() => {
            setNumberAllowed((prev) => !prev);
        }}
    />
    <label htmlFor="numberInput">Number</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={characterAllowed}
            id="characterInput"
            onChange={() => {
                setcharacterAllowed((prev) => !prev )
            }}
        />
        <label htmlFor="characterInput">Special Characters</label>
    </div>
  </div>
</div>
  )
}

export default App
