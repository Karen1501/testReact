import { useState } from "react";
import axios from "axios";
import "../styles/employees.css";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/employees/karen_corona`;

interface EmployeeFormProps {
    fetchEmployees: () => void;
}

export default function EmployeeForm({ fetchEmployees }: EmployeeFormProps) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!name || !lastName || !birthday) {
            setError("Todos los campos son obligatorios");
            setLoading(false);
            return;
        }

        try {
            await axios.post(
                API_URL,
                { name, last_name: lastName, birthday },
                { headers: { "Content-Type": "application/json" } }
            );

            setName("");
            setLastName("");
            setBirthday("");
            fetchEmployees();
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setError("Hubo un problema al agregar el empleado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Apellidos"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
            />
            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Agregando..." : "Agregar Empleado"}
            </button>
        </form>
    );
}
