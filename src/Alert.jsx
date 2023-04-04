import React from 'react';

export default function Alert({ type }) {
    
    return (
        <div className={`alert alert-${type === 200 ? 'success' : 'danger'}`}>
            {type === 200 ? 'O código foi enviado para o email.' : 'Algo deu errado. Verifique o email inserido.'}
        </div>
    )
}