import React from 'react';

function Field({ className, children }) {
    return <div className={className}
        style={{
            borderRight: "1px solid #ddd",
            textAlign: "center",
            display: "grid",
            alignItems: "center"
        }}
    >{children}</div>
}

export default Field;