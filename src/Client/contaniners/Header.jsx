import React, { Fragment, Component } from 'react'
import HeaderForm from '../components/HeaderForm.jsx'

export const Header = React.memo((props) => {
    const userInfo = props.data;
    return <HeaderForm userInfo={userInfo}/>
})
