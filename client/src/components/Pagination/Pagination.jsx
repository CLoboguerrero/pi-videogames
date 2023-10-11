import { useState } from "react";

function Pagination ({ currentPage, totalPages, onPageChange }) {

    const handlePageChange = (newPage) => {
        onPageChange(newPage);
    }

    return(
        <div className="pagination-buttons">
            <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}>First</button>

            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>Prev.</button>

            <span>{`Page ${currentPage} of ${totalPages}`}</span>

            <button onClick={() => handlePageChange(currentPage + 1)}
                disabled = {currentPage === totalPages}>Next</button>

            <button
                onClick={() => handlePageChange(totalPages)}
                disabled = {currentPage === totalPages}>Last</button>
        </div>
    )
}

export default Pagination;