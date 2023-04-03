import React from 'react';

export default function Alert({ message, type }) {
    return (
        <>
            <div className="alert alert-success" role="alert">
                {message}
                {type}
            </div>
        </>
    )
}