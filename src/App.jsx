import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Alert from './Alert'
import Loading from './Loading'
import LoggedImage from './images/user.gif'

function App() {
  const form = useRef();
  const [userEmail, setUserEmail] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [result, setResult] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const templateParams = {
      email_to: userEmail,
      generated_code: Math.floor(Math.random() * 900000) + 100000
    }
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
    .then((result) => {
      setResult({type: result.status})
      setIsLoading(false)
    }, (error) => {
      setResult({type: error.status})
      setIsLoading(false)
    }); 

    setGeneratedCode(templateParams.generated_code)
  }

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)
    return () => clearTimeout(timer);
  }, [result])
  
  
  function handleChange(e, index) {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  }

  function handlePaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const characters = text.split('').filter((_, index) => index < 6);
    const newCode = [...code];
    characters.forEach((char, index) => {
      newCode[index] = char;
    });
    setCode(newCode);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    const enteredCode = Number(code.join(''));
    if (generatedCode === enteredCode) {
      setIsLoggedIn(true)
      setResult(null)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setResult(null)
    }
  }

  return (
    <div className='grid'>
      <div className="row">
        <div className='col-12 col-md-4 mx-auto mt-5 px-5'>
          { isLoading && <Loading /> }
          {result && isVisible && <Alert type={result.type}/>}
          {(() => {
            if (!isLoading && result && result.type === 200) {
              return (
                <form onSubmit={handleSubmit}>
                  <h3 className='mb-4'>Two-factor authentication</h3>
                  <div className='row mb-3'>
                    <input type="text" value={code[0]} maxLength={1} onChange={e => handleChange(e, 0)} onPaste={handlePaste} required className="form-control col form-control mx-2"/>
                    <input type="text" value={code[1]} maxLength={1} onChange={e => handleChange(e, 1)} required className="form-control col form-control mx-2"/>
                    <input type="text" value={code[2]} maxLength={1} onChange={e => handleChange(e, 2)} required className="form-control col form-control mx-2"/>
                    <input type="text" value={code[3]} maxLength={1} onChange={e => handleChange(e, 3)} required className="form-control col form-control mx-2"/>
                    <input type="text" value={code[4]} maxLength={1} onChange={e => handleChange(e, 4)} required className="form-control col form-control mx-2"/>
                    <input type="text" value={code[5]} maxLength={1} onChange={e => handleChange(e, 5)} required className="form-control col form-control mx-2"/>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>)
            } else if (isLoggedIn) {
              return (
                <div className='d-flex flex-column'>
                  <img src={LoggedImage} className='w-25 mx-auto' alt="Image after a happy authentication." />
                  <h5 className='mx-auto mt-4'>You're logged in.</h5>
                </div>
                )
            } else if (!isLoading) {
              return (
                <form ref={form} onSubmit={sendEmail}>
                  <h3 className='mb-4'>Two-factor authentication</h3>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input name="email" onChange={(e) => setUserEmail(e.target.value)} className="form-control" />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                );
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default App;
