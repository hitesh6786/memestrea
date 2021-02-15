import React from 'react'
import '../Meme/Meme.css'

const Meme = ({ name, caption, imageURL}) => {
    return (
        <div className='meme'>
            <h1 className='name'>{name}</h1>
            <h2 className='caption'>{caption}</h2>
            <img src={imageURL} className="images"/>
        </div>
    )
}

export default Meme
