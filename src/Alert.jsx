import React from 'react';

export default function Alert({ type }) {
    return (
        <>
        {type === 200 ? (
            <div className="alert alert-success" role="alert">
                O código foi enviado para o email.
            </div>
        ) : (
            <div className="alert alert-danger" role="alert">
                Algo deu errado. Reveja o email inserido.
            </div>
        )}
        </>
    )
}