import img from '../assets/red_circle.png'
import plus from '../assets/plus.png'

interface props {
    func: (val: boolean) => void
}

function AddNewNote({ func }: props) {

    return <div className='note-div' style={{ width: "300px", height: "min-content" }} onClick={() => func(true)}>
        <div className="note" style={{ display: 'flex', flexDirection: "column", alignItems: "center", gap: "80px", paddingTop: "50px" }}>
            <img src={img} className="dot"></img>
            <h2 style={{ textAlign: "center", fontSize: "30px" }}>Add Note</h2>
            <img src={plus} style={{ position: "relative", scale: "8", imageRendering: "pixelated" }}></img>
        </div>
    </div>
}

export default AddNewNote