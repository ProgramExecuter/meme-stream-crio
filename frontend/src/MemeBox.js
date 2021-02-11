import React from 'react'
import './MemeBox.css';

const MemeBox = () => {
    fetch('localhost:3000/memes')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    return (
        <div>
            Hello
        </div>
    );
};

export default MemeBox;