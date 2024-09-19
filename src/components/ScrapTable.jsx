import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteScraps } from '../service/scrapping';
import { toast } from 'react-toastify';
import FacebookDarkIcon from '../assets/icons/FacebookDarkIcon';
import TwitterDarkIcon from '../assets/icons/twitterDarkIcon';
import LinkedInDarkIcon from '../assets/icons/LinkedInDarkIcon';
import ListPlusIcon from '../assets/icons/ListPlusIcon';
const API_URL = import.meta.env.VITE_API_URL

const ScrapTable = ({companies, handleScrap}) => {
    const [deleteIds, setDeleteIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(companies.length / itemsPerPage);

    const handleExportCSV = () => {
        const csvData = [
            ['Name', 'Email', 'Description', 'Address', 'Phone'],
            ...companies.map((company) => [
                company.name,
                company.email,
                company.description,
                company.address,
                company.phone,
            ]),
        ].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'companies.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleDelete = async () => {
        try {            
            // return
            const response = await deleteScraps(deleteIds); 
            if(response.status === 200){
                setDeleteIds([])
                setSelectAll(false)
              toast.success(response.message)
              handleScrap(response);
            }else{
              toast.error(response.message)
            }
      

          } catch (error) {
            console.error('Error creating scrap:', error);
          }
    };

    const handleSelectAll = () => {
        if (!selectAll) {
            const allIds = companies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(company => company._id);
            setDeleteIds(allIds);
        } else {
            setDeleteIds([]);
        }
        setSelectAll(!selectAll);
    };

    const handleSelectRow = (id, isChecked) => {
        if (isChecked) {
            setDeleteIds(prev => [...prev, id]);
        } else {
            setDeleteIds(prev => prev.filter(item => item !== id));
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSelectAll(false);
        setDeleteIds([]); // Reset selected IDs when changing pages
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedCompanies = companies.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            {/* Selected Info and Actions */}
            <div className="row mb-2">
                <div className="col-12 d-flex flex-column flex-md-row align-items-center">
                    <div className="mb-2 mb-md-0">
                        <strong>{deleteIds.length} selected</strong>
                    </div>
                    <div className="d-flex flex-wrap mx-2 gap-2">
                        <button className="btn btn-light export_button" onClick={handleDelete} disabled={deleteIds.length === 0}>
                            Delete
                        </button>
                        <button className="btn btn-light export_button" onClick={handleExportCSV} disabled={!companies.length}>
                        <ListPlusIcon height={16} width={16} />  Export as CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="col-12">
                <table className="table  table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">
                                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                            </th>
                            <th className='min' scope="col">Company</th>
                            <th className='min' scope="col">Social Profiles</th>
                            <th className='min' scope="col">Description</th>
                            <th className='min' scope="col">Address</th>
                            <th className='min' scope="col">Phone No.</th>
                            <th className='min' scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedCompanies.map((company) => {
                            const isChecked = deleteIds.includes(company._id);
                            return (
                                <tr key={company._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => handleSelectRow(company._id, e.target.checked)}
                                        />
                                    </td>
                                    {/* <td>
   
                                    </td> */}
                                    <td className='text-truncate  w-25'>
                                    <img 
                                        src={company.logo 
                                            ? `${API_URL}/images/${company.logo}` 
                                            : `../NLogo.jpg`} 
                                        alt="Company Logo" 
                                        height={100}
                                        width={100}
                                        className="mb-2 img-fluid" 
                                        />
                                        <NavLink className='mx-2 text-decoration-none' to={`/details/${company._id}`}>
                                            {company.name}
                                        </NavLink>
                                    </td>
                                    <td>
                                        <FacebookDarkIcon height={16} width={16} /> <TwitterDarkIcon height={16} width={16} className="mx-2" /> <LinkedInDarkIcon height={16} width={16} />
                                    </td>
                                    <td className='text-truncate  w-25'>{company.description}</td>
                                    <td>{company.address ? company.address : 'N/A'}</td>
                                    <td className='link_color'>{company.phone ? company.phone : 'N/A'}</td>
                                    <td className='link_color'>{company.email ? company.email :'N/A'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="col-12 d-flex justify-content-between align-items-center">
                <div>
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, companies.length)} of {companies.length}
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        {[...Array(totalPages).keys()].map(page => (
                            <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default ScrapTable;
