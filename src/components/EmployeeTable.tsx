import "../styles/employees.css";

interface Employee {
    id: string;
    name: string;
    last_name: string;
    birthday: string;
}

interface EmployeeTableProps {
    employees: Employee[];
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
    return (
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha de Nacimiento</th>
                </tr>
            </thead>
            <tbody>
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.birthday}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3} style={{ textAlign: "center" }}>
                            No hay empleados disponibles
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
