import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { useRef ,useEffect, useState, useCallback } from 'react';

function App() {
  const [length, setLenght] = useState(8)
  const [numberAl, setNumberal] = useState(false)
  const [charAl, setCharal] = useState(false)
  const [password, setPassword] = useState('pword')

  const passwordRef = useRef(null)

  const passwordgen = useCallback(()=>{
      let pword = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmonpqrstuvwxyz"
      if(numberAl) str += "0123456789"
      if(charAl) str += "!@#$%^&*()_+/*-+=?[]{}|:;,.<>"

      for (let i= 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        
        pword += str.charAt(char)
      }
      
      setPassword(pword);

  }, [length, numberAl, charAl, setPassword])

      const copyPassword = useCallback(()=>{
        passwordRef.current.select();
        document.execCommand("copied");
          window.navigator.clipboard.writeText(password)
      },[password])

  useEffect(()=>{
      passwordgen()
  }, [length, numberAl, charAl, passwordgen])
  return (
    <>
      <div className='text-light'>
      <h1 className='text-light'>Password Genretor</h1>
      <div className=''>
        <input 
        type="text"
        value={password}
        id='pass'
        className='bg-dark'
        placeholder='Password'
        readOnly
        ref={passwordRef}
         />
         <button 
         onClick={copyPassword}
         >Copy</button>
      </div>
      <div>
        <div>
          <input 
          type="range" 
          min={8}
          max={12}
          id='range'
          value={length}
          className='cursor-pointer' 
          onChange={(e) =>{setLenght(e.target.value)}}
          />
          <label htmlFor='range'>Lenght: {length}</label>
        </div>
        <div>
        <input 
          type="checkbox" 
          defaultChecked ={numberAl}
          id='numberInput'
          className='cursor-pointer' 
          onChange={() =>{setNumberal((prev) => !prev)}}/>
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div>
        <input 
          type="checkbox" 
          defaultChecked ={charAl}
          id='charInput'
          className='cursor-pointer' 
          onChange={() =>{setCharal((prev) => !prev)}}/>
          <label htmlFor='charInput'>Character</label>
        </div>
      </div>
      </div>

    </>
  )
}

export default App
