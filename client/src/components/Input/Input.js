import React from 'react'
import './Input.css'

const Input = (props) => {
    return (
        <form className="form">
            <input className="input" type="text" placeholder="Send a message"
                value={props.message}
                onChange={(event) => props.setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? props.sendMessage(event):null}
            />
            <button className='sendButton' onClick={event => props.sendMessage(event)}>Send</button>
        </form>
    )
}


export default Input;