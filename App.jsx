import { useState ,useCallback , useEffect , useRef } from 'react'

import './App.css'

function App() {
  const [length, setLlength] = useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[specialCharacterAllowed, setSpecialCharacterAllowed] = useState(false);
  const[password, setPassword] = useState('');
  //ref hook
  const inputRef = useRef(null);
  //useCallback hook
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){
      str+= "0123456789";
    }
    if(specialCharacterAllowed){
      str+= "!@#$%^&*()_+";
    }
    for(let i = 0; i<length; i++){
      pass += str.charAt(Math.floor(Math.random()*str.length+1));
    }
    setPassword(pass);
  },[length, numberAllowed, specialCharacterAllowed]);
   
  const copyPasswordToClipboard = useCallback(()=>{
    inputRef.current?.select();
    inputRef.current?.setSelectionRange(0,9999);
    window.navigator.clipboard.writeText(password);
  },
  [password]);
  useEffect(()=>{
     passwordGenerator();
   }
   ,[length,numberAllowed,specialCharacterAllowed,passwordGenerator]);
  return (
   <>
    
    <div className=' flex items-center w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>Password Generator
    <div class="w-full max-w-sm min-w-[200px]">

    <input
      
      type="text"
      value={password}
      placeholder = 'password'
      readOnly
      ref={inputRef}
      className='outline-none w-full px-4 py-2 rounded-lg shadow-md bg-gray-800 text-orange-500'
    />
    <button
    onClick={copyPasswordToClipboard}
    className='absolute top-0 right-0 px-3py-0.5 bg-blue-500 text-white-800 rounded-lg shadow-md shrink-0'
    backgroundColor='white'
   >Copy</button>
   
      
 
      
 </div>

  <div className='flex  flex-wrap items-center gap-0 text-sm  px-1 gap-x'>
    <div className='flex gap-x-1 '>
      <input
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>setLlength(e.target.value)}
        
      />
      <label >Length:{length}</label>
    </div>

    <div className='flex items-center gap-x'>
      <input
        type='checkbox'
       dafaultChecked={numberAllowed}
       id='numberInput'
        onChange={(e)=>setNumberAllowed(e.target.checked)}
      />
      <label htmlFor='numberInput'>Numbers</label>
    </div>

    <div className='flex items-center gap-x-1'>
      <input
        type='checkbox'
        dafaultChecked={specialCharacterAllowed}
        id='specialCharacterInput'
        onChange={(e)=>setSpecialCharacterAllowed(e.target.checked)}
      />
      <label htmlFor='specialCharacterInput'>Special Characters</label>
   </div>
</div>
  </div>


   </>
    
  )
}

export default App
