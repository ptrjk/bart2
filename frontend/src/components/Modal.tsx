import { useState } from 'react'
import img from '../assets/red_circle.png'

interface props {
    func: (val: boolean) => void
    sendData: (text: string) => void
    value: string
}

function Modal({ func, sendData, value }: props) {
    const [text, setText] = useState(value)

    return <div className='modal'>
        <div className='new-note'>
            <img src={img} className='dot'></img>
            <textarea placeholder="Type here to create a new note :-)" onChange={(e) => setText(e.target.value)} value={text} maxLength={300}></textarea>
        </div>
        <div style={{ gap: "20px", display: "flex" }}>
            <button style={{ backgroundColor: "#ff4242" }} onClick={() => func(false)}>Close</button>
            <button style={{ backgroundColor: "#66fa5c" }} onClick={() => sendData(text)}> Add Note</button>
        </div>
    </div >
}

export default Modal