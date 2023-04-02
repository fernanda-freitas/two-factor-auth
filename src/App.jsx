import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const form = useRef();
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(false)
  const [isFormSent, setIsFormSent] = useState(false)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  
  const sendEmail = (e) => {
    e.preventDefault();
    const templateParams = {
      email_to: email,
      generated_code: Math.floor(Math.random() * 900000) + 100000
    }
    
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
      .then((result) => {
        setStatus(true)
        setIsFormSent(true)
      }, (error) => {
        setStatus(true);
        setIsFormSent(false)
      }); 
      
  }

  // const validateCode = () => {
  //   console.log("Code validation should happen here")
  // }

  
  function handleChange(event, index) {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);
  }

  function handlePaste(event) {
    const text = event.clipboardData.getData('text');
    const characters = text.split('').filter((_, index) => index < 6);
    const newCode = [...code];
    characters.forEach((char, index) => {
      newCode[index] = char;
    });
    setCode(newCode);
    event.preventDefault();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const enteredCode = code.join('');
    // Add code validation logic here
    alert(`Entered code: ${enteredCode}`);
  }

  return (
    <div className='grid'>
      <div className="row">
        <div className='col-12 col-md-4 mx-auto mt-5 px-5'>
          {status.status === 412 ? (
            <div className="alert alert-success" role="alert">
              O código foi enviado corretamente.
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              Algo deu errado.
            </div>
            ) 
          }
          {!isFormSent ? (
            <form ref={form} onSubmit={sendEmail}>
              <h3 className='mb-4'>Two-factor authentication</h3>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                <div className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="text" value={code[0]} maxLength={1} onChange={event => handleChange(event, 0)} onPaste={handlePaste} required />
              <input type="text" value={code[1]} maxLength={1} onChange={event => handleChange(event, 1)} required />
              <input type="text" value={code[2]} maxLength={1} onChange={event => handleChange(event, 2)} required />
              <input type="text" value={code[3]} maxLength={1} onChange={event => handleChange(event, 3)} required />
              <input type="text" value={code[4]} maxLength={1} onChange={event => handleChange(event, 4)} required />
              <input type="text" value={code[5]} maxLength={1} onChange={event => handleChange(event, 5)} required />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
