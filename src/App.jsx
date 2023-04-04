import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Alert from './Alert'
import Chick from './images/chicken.png'

function App() {
  const form = useRef();
  const [userEmail, setUserEmail] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [result, setResult] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [showChick, setShowChick] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault();
    const templateParams = {
      email_to: userEmail,
      generated_code: Math.floor(Math.random() * 900000) + 100000
    }
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
    .then((result) => {
      setResult({type: result.status})
    }, (error) => {
      setResult({type: error.status})
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
    const text = e.clipboardData.getData('text');
    const characters = text.split('').filter((_, index) => index < 6);
    const newCode = [...code];
    characters.forEach((char, index) => {
      newCode[index] = char;
    });
    setCode(newCode);
    e.preventDefault();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const enteredCode = Number(code.join(''));
    if (generatedCode === enteredCode) {
      console.log('code matches')
      setShowChick(true)
      setResult(null)
    } else {
      console.log('wrong code')
    }
  }

  return (
    <div className='grid'>
      <div className="row">
        <div className='col-12 col-md-4 mx-auto mt-5 px-5'>
          {result && isVisible && <Alert type={result.type}/>}
          {(() => {
            if (result && result.type === 200) {
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
            } else if (showChick) {
              return <img src={Chick} alt="Chick image after a happy authentication." />
            } else {
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
