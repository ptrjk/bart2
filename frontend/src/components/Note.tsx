import img from '../assets/red_circle.png'
import delete_img from '../assets/delete.png'
import edit_img from '../assets/edit.png'


interface props {
    text: string,
    email: string,
    isOwner: boolean,
    deleteFunc: () => void,
    editFunc: () => void
}


function Note({ text, email, isOwner, deleteFunc, editFunc }: props) {

    return <div className='note-div' style={{ width: "300px", height: "min-content" }}>
        <div className="note">
            <img src={img} className='dot'></img>
            {isOwner && <img src={delete_img} className='delete' onClick={deleteFunc}></img>}
            {isOwner && <img src={edit_img} className='edit' onClick={editFunc}></img>}
            <p style={{ wordBreak: "break-all" }}>{text}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", wordBreak: "break-all", gap: "10px" }}>
            <p className='note-info-text'>Created by:</p>
            <p className='note-info-text'>{email}</p>
        </div>
    </div>
}

export default Note