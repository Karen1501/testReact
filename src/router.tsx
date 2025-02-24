import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Employees from './pages/Employees'
import Upload from './pages/Upload'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

export default function Router() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    return (
        <Routes>
            {/* Ruta pública*/}
            <Route path="/login" element={<Login />} />

            {/*Rutas protegidas*/}
            <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />

            {/*Redirección en caso de ruta inexistente*/}
            <Route path='*' element={<Navigate to={isAuthenticated ? '/employees' : '/login'}/>}> </Route>
        </Routes>
    )
} 