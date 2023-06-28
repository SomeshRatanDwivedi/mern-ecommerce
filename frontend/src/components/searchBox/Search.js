import React, { useState } from 'react';
import './search.css'

const Search = ({ handleSearch }) => {
    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <div className='search-box-parent'>
            <input type='text' autoComplete='off' name='searchKeyword' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
            <button onClick={()=>handleSearch(searchKeyword)}>Search</button>
        </div>
    );
}

export default Search;
