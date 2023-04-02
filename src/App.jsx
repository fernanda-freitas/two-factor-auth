import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const form = useRef();
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const sendEmail = (e) => {
    e.preventDefault();
    
    const templateParams = {
      email_to: email,
      generated_code: Math.floor(Math.random() * 900000) + 100000
    }
    
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
      .then((result) => {
        setStatus(true)
        console.log(result)
      }, (error) => {
        setStatus(true);
        console.log(error)
      }); 
  }

  return (
    <div className='grid'>
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
      <div className="row">
        <form ref={form} onSubmit={sendEmail} className='col-12 col-md-4 mx-auto mt-5 px-5'>
          <h3 className='mb-4'>Two-factor authentication</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
