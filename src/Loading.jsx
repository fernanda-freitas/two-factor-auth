import React from 'react';
// import Loader from './images/loader.svg'
import Loader from './images/connection.gif'

export default function Loading() {
    return (
        <div className='d-flex mt-5'>
            <img src={Loader} className='mx-auto w-25' alt="loader spinner" />
        </div>
    )
}