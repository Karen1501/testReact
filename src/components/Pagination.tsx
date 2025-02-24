interface PaginationProps {
    employeesPerPage: number;
    totalEmployees: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

export default function Pagination({ employeesPerPage, totalEmployees, paginate, currentPage }: PaginationProps) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            {pageNumbers.map((number) => (
                <button key={number} onClick={() => paginate(number)} disabled={currentPage === number} className="pagination-button">
                    {number}
                </button>
            ))}
        </div>
    );
}