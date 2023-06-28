import React, { useState } from 'react';

const Math = () => {
    const {value, setValue}=useState(1);
    console.log(value)
    const handleClick=()=>{
        setValue(value+1)
    }
    return (
        <div>
           <div>{value}</div>
           <button onClick={handleClick}>+</button>
            
        </div>
    );
}

export default Math;
