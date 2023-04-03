import React from 'react';

export default function Alert({ message }) {
    return (
        <>
            <div className="alert alert-success" role="alert">
                {message}
            </div>
        </>
    )
}