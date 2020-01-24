import React from 'react'
import './forms.styles.scss'

const Forms = ({ handleChange, ...otherProps }) => {
    return (
        <div>
            <input className='forms' onChange={handleChange} {...otherProps} />
        </div>
    )
}

export default Forms;
