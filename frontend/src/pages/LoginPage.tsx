import { useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [error, setError] = useState(false)

    function sendData() {
        const buildDB = async () => {
            try {
                const d = await fetch('http://localhost:5000/login/setup')
                if (!d.ok) throw new Error('error')
            } catch (e) {
                console.log(e)
            }

        }
        const func = async () => {
            try {
                const d = await fetch('http://localhost:5000/login/' + input, { method: 'POST' })
                if (!d.ok) throw new Error('error')
                const data = await d.json()
                const { token, userid } = data;
                localStorage.setItem('jwt', token);
                localStorage.setItem('userid', userid);
                console.log(data)
                navigate("/notes", { replace: true })

            } catch (e) {
                setError(true)
                console.log(e)
            }
        }
        buildDB()
        func()
    }


    return <section className="loginPage">
        <div className="loginForm">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {error && <p style={{ color: "red" }}>Something went wrong...</p>}
                <label style={{ color: "white", fontSize: "18px" }}>Email:</label>
                <input onChange={(e) => setInput(e.target.value)} type="email" required></input>
            </div>
            <button onClick={sendData}>Log In</button>
        </div>
    </section>
}

export default LoginPage