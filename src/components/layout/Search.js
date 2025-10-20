import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchPagination, resetPagination } from '../../slices/productPaginationSlice';

const Search = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();
        
        if (Keyword.trim()) {
            dispatch(searchPagination({ search: Keyword }));
        }else{
            dispatch(resetPagination());
        }

        navigate('/');
    }

  return (
    <form onSubmit={searchHandler}>
        <div className='input-group'>
            <input 
                type='text'
                className='form-control'
                placeholder='Busca tu producto...'
                onChange={ (e) => setKeyword(e.target.value) }
            />

            <div className='input-group-append'>
                <button id='search_btn' className='btn'>
                    <i className='fa fa-search' aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </form>
  )
}

export default Search