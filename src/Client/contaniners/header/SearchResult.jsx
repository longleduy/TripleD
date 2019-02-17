import React, { useState,useEffect } from 'react'
import QueryPropRender from '../../components/hocOrProprender/QueryPropRender.jsx'
import {FILTER_ALL_BY_KEYWORD_QUERY} from '../../graphql/querys/search_query'
import SearchResultForm from '../../components/header/SearchResultForm.jsx'
export const SearchResult = React.memo((props) => {
    let {keyWord} = props;
    const closeResultDiv = () => {
        props.closeResultDiv();
    }
    return <QueryPropRender
        query={FILTER_ALL_BY_KEYWORD_QUERY} variables={{keyWord}}
        queryPropRender={({ loading, data }) => {
           return <SearchResultForm loading={loading} keyWord={keyWord} searchResult={data} closeResultDiv={closeResultDiv}/>
        }} />
})
