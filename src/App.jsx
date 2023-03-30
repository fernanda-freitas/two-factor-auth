import React from 'react';

function App() {
  return (
    <div className="d-flex">
      <form className='mx-auto mt-5'>
        <h3 className='mb-4'>Two-factor authentication</h3>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
