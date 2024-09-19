import React from 'react';
import { FaSearch } from 'react-icons/fa'; 
import { useForm } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; 
import { createScrap } from '../service/scrapping';
import { toast } from 'react-toastify';


const schema = yup.object().shape({
    url: yup.string()
      .matches(/^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/, 'Invalid domain format')
      .required('Domain name is required'),
  });

const Header = ({ handleScrap }) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      console.log(data, 'data+++');

      const response = await createScrap(data); 
      console.log(response, 'response+++');
      if(response.status === 200){
        toast.success(response.message)
        handleScrap(response);
        reset()
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      console.error('Error creating scrap:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row mb-3 align-items-center">
      <div className="col-md-4 col-12 position-relative mb-2 mb-md-0">
        <div className="input-wrapper">
          <input
            type="text"
            className="form-control ps-5 search_input"
            placeholder='Enter domain name'
            {...register('url')}
          />
                    {errors.url && (
          <span className="text-danger">{errors.url.message}</span>
        )}
          <FaSearch className="search-icon" />
         

        </div>
      
      </div>
      <div className="col-md-4 col-12">
        <button type='submit' className=" btn btn-light fetch_btn">
          <span className='btn_color'>Fetch & Save Details</span>
        </button>
      </div>
    </form>
  );
};

export default Header;
