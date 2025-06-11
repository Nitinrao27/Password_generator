import { useState ,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {

  //defining some hooks.
  const[length,setLength] = useState(8);
  const[numberAllowed,setNumberAllowed] = useState(false);
  const[charAllowed,setCharAllowed] = useState(false);
  const[pass,setPass] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{

    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str+="0123456789"
    if(charAllowed)str+="!@#$%`~^&*()"
    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass+=str[char-1];
      
    }
    setPass(pass);

  },[length,numberAllowed,charAllowed,setPass])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,5);
    window.navigator.clipboard.writeText(pass) 
  },[pass])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed])


  return (
    <>
      <div className='bg-black min-h-screen flex justify-center'>
        
        <div className='bg-slate-700 h-45 w-2xl mt-10 rounded-2xl flex flex-col justify-center items-center'>
          <h1 className='text-amber-50 text-3xl'>Password Generator</h1>
           <div className='flex items-center justify-center p-4'>
            <input type="text" 
             value={pass}
             readOnly
            placeholder='     -- Password --'
            name="" id="" 
            ref = {passwordRef}
            className='bg-amber-50 rounded-l-xl h-10 w-100 '/>
            <div 
            onClick={copyPasswordToClipboard}
            
            className='bg-blue-700 h-10 rounded-r-xl px-2 py-1.5 text-amber-50 cursor-pointer hover:bg-blue-900 hover:shadow-blue-700 shadow-lg'>
              Copy
            </div>


           </div>
          <div className="flex  gap-4 p-4 bg-gray-100 rounded-xl shadow-md w-160 h-15">
  <div className="flex flex-row">
    
    <input
      type="range"
      id="length"
      min="4"
      max="100"
      defaultChecked={length}
      onChange={(e)=>
        setLength(e.target.value)

      }
      className="w-20 accent-blue-500 mr-4 cursor-pointer"
    />
    <label htmlFor="length" className="mb-1 font-medium text-gray-700">
      Length: {length}
    </label>
  </div>

  <div className="flex items-center space-x-2">
    <input type="checkbox" 
    defaultChecked={numberAllowed}
    id="number" 
    onChange={()=> setNumberAllowed((prev)=> !prev)}
    className="accent-blue-600 cursor-pointer" />
    <label htmlFor="number" className="text-sm text-gray-800 ">Include Numbers</label>
  </div> 

  <div className="flex items-center space-x-2">
    <input type="checkbox" id="character" 
    defaultChecked={charAllowed}
    onChange={()=> setCharAllowed((prev)=>!prev)}
    className="accent-blue-600 cursor-pointer" />
    <label htmlFor="character" className="text-sm text-gray-800">Include Characters</label>
  </div>
</div>

        </div>

      </div>
    </>
  )
}

export default App
