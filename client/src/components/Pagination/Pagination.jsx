import './Pagination.modules.css';
import { useState } from "react";

function Pagination ({ currentPage, totalPages, onPageChange }) {

    const handlePageChange = (newPage) => {
        onPageChange(newPage);
    }

    return(
        <div className="pagination-buttons">
            <button id='pagination-buttons'
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}>&lt;&lt; First</button>

            <button id='pagination-buttons'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>&lt; Previous</button>

            <span id='page-number'>{`Page ${currentPage} of ${totalPages}`}</span>

            <button id='pagination-buttons'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled = {currentPage === totalPages}>Next  &gt;</button>

            <button id='pagination-buttons'
                onClick={() => handlePageChange(totalPages)}
                disabled = {currentPage === totalPages}>Last &gt;&gt;</button>
        </div>
    )
}

export default Pagination;