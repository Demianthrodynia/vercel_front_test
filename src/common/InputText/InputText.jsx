import React from 'react';
import "./InputText.css"

export const InputText = ({type, className, placeholder, name, handler}) => {

    return (
        <div >
            <input className='inputTextDesign'
                type={type}
                placeholder={type}
                name={name}
                onChange={(e)=>handler(e)}
            />
        </div>
    )
}