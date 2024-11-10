import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbrAllowed, setNumbrAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numbrAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()-_+=<>?{}[]|/';

    for (let i = 0; i < length; i++) {
      let gn = Math.floor(Math.random() * str.length)
      pass = pass + str.charAt(gn)
    }
    setPassword(pass)
  }, [numbrAllowed, charAllowed, length,], setPassword)
  //optimized way and 

  useEffect(() => {
    passwordGenerator()
  }, [charAllowed, numbrAllowed, length, setPassword, passwordGenerator])
  //when change occures in dependencies just run

  const copyPasswordtoClipboard = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); // Prevent Chrome's mini-infobar from appearing
      setDeferredPrompt(e); // Stash the event for later
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };
  return (
    <>
      <div className="overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="">
            <div className="">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Password Generator</h2>
              <div className="mt-6 flex gap-x-4 justify-center">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  name="email"
                  type="text"
                  readOnly
                  value={password}
                  ref={passwordRef}
                  className=" max-w-md min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm sm:text-sm sm:leading-6 outline-none" />
                <button
                  type="submit"
                  onClick={copyPasswordtoClipboard}
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Copy
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-4 justify-center text-white">
                <input
                  name=""
                  type='range'
                  className='justify-start cursor-pointer'
                  value={length}
                  min={6}
                  max={50}
                  onChange={(e) => setLength(e.target.value)}
                />
                <div>
                  <input
                    id="number"
                    className='mx-1 cursor-pointer'
                    type='checkbox'
                    defaultChecked={numbrAllowed}
                    onChange={() => setNumbrAllowed(prev => !prev)}
                  />
                  <label htmlFor="number" className='cursor-pointer select-none active:text-gray-500'>Number</label>
                </div>
                <div>
                  <input
                    id="characters"
                    type='checkbox'
                    className='mx-1 cursor-pointer select-none'
                    defaultChecked={charAllowed}
                    onChange={() => setCharAllowed(prev => !prev)}
                  />
                  <label htmlFor="characters"
                    className='cursor-pointer select-none active:text-gray-500'
                  >Characters</label>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleInstallClick} className='text-white font-bold outline outline-1 p-2 rounded-lg hover:bg-white hover:text-black transition-all duration-200'>Install App</button>
    </>
  )
}

export default App
