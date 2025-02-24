import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import EmployeeForm from "../components/EmployeeForm";  // ✅ Importa el formulario
import EmployeeTable from "../components/EmployeeTable";  // ✅ Importa la tabla
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/employees.css";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/employees/karen_corona`;

interface Employee {
    id: string;
    name: string;
    last_name: string;
    birthday: string;
}

export default function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get<{ data: { employees: Employee[] } }>(API_URL);
            console.log("🔍 Respuesta completa de la API:", response.data);

            if (response.data && Array.isArray(response.data.data.employees)) {
                setEmployees(response.data.data.employees);
            } else {
                console.error("La API no devolvió un array válido:", response.data);
                setEmployees([]);
            }
        } catch (error) {
            console.error("Error al obtener empleados:", error);
            setEmployees([]);
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <div className="employees-container">
                <h2 className="title">Empleados</h2>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar empleados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                {/* Llamar al formulario, pasando la función fetchEmployees */}
                <EmployeeForm fetchEmployees={fetchEmployees} />

                {/* Llamar a la tabla de empleados, pasando la lista de empleados filtrados */}
                <EmployeeTable employees={currentEmployees} />

                <Pagination
                    employeesPerPage={employeesPerPage}
                    totalEmployees={filteredEmployees.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
}
