import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'

export default function Login () {
    const [username, setUsername] =useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        if(username === 'admin' && password === 'password') {
            dispatch(login())
            navigate('/employees')
        } else {
            alert('Usuario o contraseña incorrectos')
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    placeholder="Usuario"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    placeholder="Contraseña"                
                    required
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}