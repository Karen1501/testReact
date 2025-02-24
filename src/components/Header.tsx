import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { RootState } from "../store/store";
import '../styles/header.css'

export default function Header () {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated)

    return (
        <nav className="header-container">
            <ul className="nav-list">
                <li><Link to='/'>Inicio</Link></li>
                {isAuthenticated && (
                    <>
                        <li><Link to='/employees'>Empleados</Link></li>
                        <li><Link to='/upload'>Subir Archivos</Link></li>
                        <li><button onClick={() => dispatch(logout())}>Cerrar Sesión</button></li>
                    </>
                )}
            </ul>
        </nav>
    )
}