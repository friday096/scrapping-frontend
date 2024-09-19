import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ScrapTable from '../../components/ScrapTable';
import { getAllScraps } from '../../service/scrapping';

const Home = () => {
  const [scrapData, setScrapData] = useState([]);


  const fetchScrap = async ()=>{
    const scraps = await getAllScraps();

    setScrapData(scraps.data);
  }

  const handleScrap = (data) =>{
    fetchScrap()
  }

useEffect(()=>{
  fetchScrap()
},[])



  return (
    <div className='container mt-4'>
      <Header handleScrap={handleScrap} />
      <div >
      <ScrapTable companies={scrapData} handleScrap={handleScrap} />
      </div>
    </div>
  );
}

export default Home;
