import React from 'react'

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            <div className='d-flex justify-content-center'>
                <nav>
                    <ul className="pagination">
                        {pageNumbers.map(number => (
                            <li key={number} className="page-item">
                                <a onClick={() => paginate(number)} className='page-link' style={{cursor: "pointer"}}>{number}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Pagination;