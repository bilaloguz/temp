import React, {Fragment} from 'react'

const Pagination = ({roomsPerPage, totalRooms, paginate, currentPage}) => {
    
    const pageNumbers =[];
    const offset = 1
    for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
        pageNumbers.push(i);
    }
       
    const currentPageNumbers =  currentPage > pageNumbers.length-offset ? pageNumbers.slice(pageNumbers.length-2, pageNumbers.length)
                                : currentPage > 2 ? pageNumbers.slice(currentPage-offset, currentPage+offset) 
                                : pageNumbers.slice(0, 3)
    return (
            <nav className="nav-pagination">
                <ul className="pagination">
                    <li className={`pagination-left page-item ${currentPage === 1 ? 'invisible':''}`}>
                    <a onClick={ (e)=>{
                        e.preventDefault()
                        paginate(currentPage-1)
                        }} href="!#" className="page-link">&lt;
                    </a>
                    </li>
                    {currentPage > offset+1 && (
                        <Fragment>
                            <li className={`page-item fff${currentPage===pageNumbers[0] ? 'active':''}`}>
                                <a onClick = { (e) => {
                                        e.preventDefault()
                                        paginate(pageNumbers[0])
                                    }} href="!#" className="page-link">
                                        {pageNumbers[0]}
                                </a>
                            </li>
                            <li className="page-item dots">...</li>
                        </Fragment>)} 

                    { currentPageNumbers.map(number=>(
                        <li key={number} className={`page-item ${currentPage===number ? 'active':''}`} >
                            <a onClick = { (e) => {
                                e.preventDefault()
                                paginate(number)
                            }} href="!#" className="page-link">
                                {number}
                            </a>
                        </li>
                    )) }
                    
                    {currentPage < pageNumbers.length-offset && (
                        <Fragment>
                            <li className="page-item dots">...</li>
                            <li className={`page-item fff${currentPage===pageNumbers.length ? 'active':''}`}>
                                <a onClick = { (e) => {
                                        e.preventDefault()
                                        paginate(pageNumbers.length)
                                    }} href="!#" className="page-link">
                                        {pageNumbers.length}
                                </a>
                            </li>
                        </Fragment>)  }      

                    <li className={`pagination-left page-item ${currentPage === pageNumbers.length ? 'invisible':''}`}>
                    <a onClick={ (e)=>{
                        e.preventDefault() 
                        paginate(currentPage+1)

                        }} href="!#" className="page-link">
                        &gt;
                    </a>
                    </li>
                </ul>
            </nav>
    )
}

export default Pagination