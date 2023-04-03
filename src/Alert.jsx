import React from 'react';

export default function Alert({ message, type }) {
    return (
        <>
        {type === 200 ? (
            <div className="alert alert-success" role="alert">
                {message}
            </div>
        ) : (
            <div className="alert alert-danger" role="alert">
                {message}
            </div>
        )}
        </>
    )
}