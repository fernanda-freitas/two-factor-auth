import React from 'react';

export default function Loading() {
    return (
        <p className='placeholder-glow'>
            <span className="placeholder bg-secondary col-6"></span>
            <span className="placeholder bg-secondary w-75"></span>
            <span className="placeholder bg-secondary" style={{width: '25%'}}></span>
        </p>
    )
}