import React from 'react'

const Pagination = ({page, onNextPage, onPrevPage, total}) => {
    return (
        <div className="pagination">
            <div className="pagination_total">
                showing {`${page} out of ${Math.ceil(total/10)}`} 
            </div>
            <div className="pagination_nav">
                {page > 1 ? <button type="button" className="btn" onClick={onPrevPage}>Prev</button> : null}
                {total > 10 ? <button type="button" className="btn" onClick={onNextPage}>Next</button> : null }
            </div>
        </div>
    )
}

export default Pagination
