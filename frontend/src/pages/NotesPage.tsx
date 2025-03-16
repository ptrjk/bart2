import { useEffect, useState } from 'react'
import AddNewNote from '../components/AddNewNote'
import Note from '../components/Note'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router';

interface NoteType {
    email: string
    noteid: number
    text: string
    userid: number
}

function NotesPage() {
    const [showModal, setShowModal] = useState(false)
    const [textModal, setTextModal] = useState({ noteid: -1, text: '' })
    const [notes, setNotes] = useState([])
    const [showUserNotes, setShowUserNotes] = useState(false)
    const navigate = useNavigate()

    function toggleModal(val: boolean): void {
        setShowModal(val)
        if (val === false) {
            setTextModal({ noteid: -1, text: '' })
            console.log("clearing text modal")
        }
    }

    function toggleUserNotes(): void {
        setShowUserNotes((val) => { return !val })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData()
                setNotes(data)
                console.log(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    function getData() {
        console.log("getting data..")
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt")
                if (!token) throw new Error("Something went wrong..")
                const res = await fetch("http://localhost:5000/notes/", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const data = await res.json()
                return data
            } catch (e) {
                console.log(e)
            }
        }
        return fetchData()
    }

    function sendData(text: string): void {
        const postData = async () => {
            const token = localStorage.getItem("jwt")
            const res = await fetch("http://localhost:5000/notes/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ text })
            })
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await getData()
            setNotes(data)
            toggleModal(false)
        }
        const updateData = async () => {
            const token = localStorage.getItem("jwt")
            const res = await fetch("http://localhost:5000/notes/edit/" + textModal.noteid, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ text })
            })
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await getData()
            setNotes(data)
            toggleModal(false)
        }

        if (textModal.noteid !== -1)
            updateData()
        else
            postData()
    }

    function logOut() {
        localStorage.removeItem("jwt")
        localStorage.removeItem("userid")
        navigate('/', { replace: true })
    }

    function deleteNote(id: number): void {
        console.log("trying to deletr id ", id)
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt")
                if (!token) throw new Error("Something went wrong..")
                const res = await fetch("http://localhost:5000/notes/delete/" + id, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: "DELETE"
                })
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const data = await getData()
                setNotes(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }

    function editModal(text: string, id: number): void {
        console.log("editing modal")
        setTextModal({ noteid: id, text: text })
        setShowModal(true)

        console.log({ noteid: id, text: text })
    }

    let userId: number = parseInt(localStorage.getItem("userid") || "");

    return <section className="mainPage">
        <ul>
            <li onClick={toggleUserNotes}>
                {showUserNotes ? "Show all notes" : "Show user notes"}
            </li>
            <li onClick={logOut}>
                Log out
            </li>
        </ul>
        <div></div>
        <div className="notes">
            <AddNewNote func={toggleModal} />
            {
                notes.filter((note: NoteType) => !showUserNotes || note.userid === userId).map((note: NoteType) => {
                    return <Note text={note.text} email={note.email} isOwner={userId === note.userid} deleteFunc={() => deleteNote(note.noteid)} editFunc={() => editModal(note.text, note.noteid)} key={note.noteid} />
                })
            }
        </div>
        {showModal && < Modal func={toggleModal} sendData={sendData} value={textModal.text} />}
    </section >

}

export default NotesPage    