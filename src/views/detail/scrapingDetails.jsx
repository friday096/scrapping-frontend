import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the 'id' from URL
import Header from '../../components/Header';
import PhoneIcon from '../../assets/icons/PhoneIcon';
import InfoIcon from '../../assets/icons/InfoIcon';
import EmailIcon from '../../assets/icons/EmailIcon';
import GlobalIcon from '../../assets/icons/GlobalIcon';
import FacebookIcon from '../../assets/icons/FacebookIcon';
import TwitterIcon from '../../assets/icons//TwitterIcon';
import InstagramIcon from '../../assets/icons/InstagramIcon';
import CameraIcon from '../../assets/icons/CameraIcon';
import LinkedInIcon from '../../assets/icons/LinkedInIcon';
import LocationIcon from '../../assets/icons/LocationIcon';

import { getCompanyDetails } from '../../service/scrapping';
import Breadcrumb from '../../components/BreadCrumb';

const API_URL = import.meta.env.VITE_API_URL
const ScrapingDetails = () => {
    const { id } = useParams(); // Get the 'id' from URL
    const [scrapData, setScrapData] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Loading state

    const fetchScrapById = async () => {
        try {
            const response = await getCompanyDetails(id); // Pass the 'id'
            setScrapData(response?.data);
        } catch (error) {
            console.error('Error fetching scrap data:', error);
        } finally {
            setLoading(false); // Stop loading after fetching data
        }
    };

    useEffect(() => {
        fetchScrapById();
    }, [id]);

    if (loading) {
        return <h4 className="text-center">Loading...</h4>;
    }

    if (!scrapData) {
        return <h4 className="text-center">No Scrap Data Found</h4>;
    }


    return (
        <div className="container-fluid bg-grey py-4">
            <Header />
            <div className='row'>
            <Breadcrumb title={scrapData.companyName ? scrapData.companyName:'Title'} />

            </div>
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="card p-3">
                        <div className="row">
                            <div className="col-12">
                                <div className="row align-items-start">
                                    <div className="col-12 col-sm-2 col-md-1 mb-3 mb-sm-0">
                                    <img 
                                    height={200}
                                    width={100}
                                        src={scrapData.logo 
                                            ? `${API_URL}/images/${scrapData.logo}` 
                                            : `../NLogo.jpg`} 
                                        alt="Company Logo" 
                                        className="company-logo mb-2 img-fluid" 
                                        />                                    
                                    </div>

                                    <div className="col-12 col-sm-10 col-md-4 mb-3 mb-md-0 vertical-line">
                                        <h1 className="company-name">{scrapData.companyName ? scrapData.companyName:'Title'}</h1>
                                        <InfoIcon height="22" width="22" /> <span className='text_color'>Description</span>
                                        <p className="text-muted description text-wrap">
                                            {scrapData.description}
                                        </p>
                                    </div>

                                    <div className="col-12 col-md-7">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 mb-3">
                                                <h5 className="text-muted">
                                                    <PhoneIcon height="24" width="24" /> <span className='text_color'>Phone</span> 
                                                </h5>
                                                <p>{scrapData.phone ? scrapData.phone :'N/A'}</p>
                                                <div className="col-12 col-sm-6 mb-3">
                                                <h5 className="text-muted">
                                                <EmailIcon height="24" width="24" /> <span className='text_color'>Email</span> 
                                                </h5>
                                                <p>{scrapData.email ? scrapData.email : 'N/A'}</p>
                                            </div>
                                            </div>                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 mb-4">
                        <h4 className='title_heading'>Company Details</h4>
                        <ul className="list-unstyled">
                            <li className="row mb-3">
                                <div className=" d-flex align-items-center">
                                   
                                    <GlobalIcon height="20" width="20" />
                                    
                                    <span className='text_color mx-2'>Website:</span>
                                </div>
                                <div className="title_tag">{scrapData.url}</div>
                            </li>
                            <li className="row mb-3">
                                <div className=" d-flex align-items-center">
                                <InfoIcon height="22" width="22" />
                                    <span className='text_color mx-2'>Description:</span>
                                </div>
                                <div className="title_tag">{scrapData.description}</div>
                            </li>
                            <li className="row mb-3">
                                <div className=" d-flex align-items-center">
                                <EmailIcon height="20" width="20" />
                                    <span className='text_color mx-2'>Email:</span>
                                </div>
                                <div className="title_tag">{scrapData.email ? scrapData.email :'N/A'}</div>
                            </li>

                            <li className="row mb-3">
                                <div className=" d-flex align-items-center">
                                <FacebookIcon height="20" width="20" />
                                    <span className='text_color mx-2'>Facebook:</span>
                                </div>
                                <div >
                                    <a  className='link_color text-decoration-none' href={scrapData.facebook}>{scrapData.facebook?scrapData.facebook:'N/A'}</a>
                                </div>
                            </li>

                            <li className="row mb-3">
                                <div className=" d-flex align-items-center">
                                <InstagramIcon height="20" width="20" />
                                    
                                    <span className='text_color mx-2'>Instagram:</span>
                                </div>
                                <div className="">
                                    <a  className='link_color text-decoration-none' href={scrapData.instagram}>{scrapData.instagram ? scrapData.instagram : 'N/A'}</a>
                                </div>
                            </li>

                            <li className="row mb-3">
                                <div className=" d-flex align-items-center">
                                <TwitterIcon height="20" width="20" />
                                    <span className='text_color mx-2'>Twitter:</span>
                                </div>
                                <div className="">
                                    <a  className='link_color text-decoration-none' href={scrapData.twitter}>{scrapData.twitter ? scrapData.twitter :'N/A'}</a>
                                </div>
                            </li>

                            <li className="row mb-3">
                                <div className=" d-flex align-items-center">
                                <LinkedInIcon height="20" width="20" />
                                    <span className='text_color mx-2'>LinkedIn:</span>
                                </div>
                                <div className="">
                                    <a  className='link_color text-decoration-none' href={scrapData.linkedin}>{scrapData.linkedin ? scrapData.linkedin :'N/A'}</a>
                                </div>
                            </li>

                            <li className="row mb-3">
                                <div className=" d-flex align-items-center">
                                <LocationIcon height="20" width="20" />
                                    <span className='text_color mx-2'>Address:</span>
                                </div>
                                <div className="">{scrapData.address ? scrapData.address :'N/A'}</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card p-3">
                        <h4 className='title_heading'><CameraIcon height="24" width="24" /> Screenshot of Webpage</h4>
                        <img src={`${API_URL}/images/${scrapData.screenshot}`} alt="Website Screenshot" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrapingDetails;
