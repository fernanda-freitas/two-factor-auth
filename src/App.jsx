import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  
  const sendEmail = (e) => {
    e.preventDefault();
    setCode(Math.floor(Math.random() * 900000) + 100000)
    console.log(code)


    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, {
      email: {email},
      code: {code}
    }, process.env.REACT_APP_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  const form = useRef();

  return (
    <div className='grid'>
      <div className="row">
        <form ref={form} onSubmit={sendEmail} className='col-12 col-md-4 mx-auto mt-5 px-5'>
          <h3 className='mb-4'>Two-factor authentication</h3>
          <div className="mb-3">
          
            <label htmlFor="email" className="form-label">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} className="form-control" />
            <div className="form-text">We'll never share your email with anyone else.</div>
          
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
