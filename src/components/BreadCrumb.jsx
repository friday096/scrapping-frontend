import React from 'react';
import { NavLink } from 'react-router-dom';
import ChevronRIghtIcon from '../assets/icons/ChevronRIghtIcon';

const Breadcrumb = ({ title }) => {
    return (
        <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <NavLink to="/" className="text-decoration-none">
                       <span className='bread_title'>Home</span> 
                    </NavLink>
                </li>
                <li>
                <ChevronRIghtIcon height={20} width={21} /> 

                </li>
                <li className="breadcrumb-item active" aria-current="page">
                <NavLink to="/" className="text-decoration-none">
                    
                    <span className='bread_title'>{title}</span> 
                    </NavLink>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
