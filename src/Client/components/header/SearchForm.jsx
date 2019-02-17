import React, { useState,useEffect } from 'react'
import stylesHeader from '../../Styles/Header.scss'
import { SearchResult } from '../../contaniners/header/SearchResult.jsx'
export const SearchFrom = React.memo((props) => {
    const [keyWord, setKeyWord] = useState('');
    const [openResultDiv, setOpenResultDiv] = useState(false);
    const handleChange = (e) => {
        let keyWord = e.target.value;
        setKeyWord(keyWord);
    }
    const handleChange2 = (e) => {
        let keyWord = e.target.value;
        if(keyWord !== ''){
            setKeyWord(keyWord);
        }
    }
    const closeResultDiv = () => {
        setKeyWord('');
    }
    return <div className={stylesHeader.divSearch}>
        <input type="text" id="search-txt" className={stylesHeader.searchInput} onChange={handleChange} onClick={handleChange2} placeholder="Search keywords..." />
        {keyWord !== '' && <SearchResult keyWord={keyWord} closeResultDiv={closeResultDiv} />}
    </div>
})
