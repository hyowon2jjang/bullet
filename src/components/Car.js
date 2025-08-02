// src/components/Car.js
import React from 'react';

const carStyle = {
    position: 'absolute',
    width: '30px',
    height: '20px',
    backgroundColor: 'red',
    borderRadius: '5px'
};

const Car = ({ id, x, y, color }) => {
    return (
        <div 
            style={{
                ...carStyle,
                left: x,
                top: y,
                backgroundColor: color 
            }}
        >
        </div>
    );
};

export default Car;