import React from 'react';

function Field({ children }) {
    return <div className='field'
        style={{
            borderRight: "1px solid #aaa",
            textAlign: "center",
            display: "grid",
            alignItems: "center"
        }}
    >{children}</div>
}

export default Field;