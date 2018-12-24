import React, { Fragment, Component } from 'react'
import HeaderForm from '../components/HeaderForm.jsx'
export const Header = React.memo((props) => {
    const {data} = props;
    return <Fragment>
        <HeaderForm userInfo={data} />
    </Fragment>
})
