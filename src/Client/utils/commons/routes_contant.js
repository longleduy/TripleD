import React, { Component } from 'react'

import HomePublic from '../containers/publicContainers/HomePulic.jsx'
import SignUp from '../containers/publicContainers/SignUp.jsx'
import SignIn from '../containers/publicContainers/SignIn.jsx'
import ErrorForm from '../forms/ErrorForm.jsx'
import MainDocument from '../containers/privateContainers/MainDocument.jsx'
import PrivateRoutePRD from '../utils/form/props_render_component/PrivateRoutePRD.jsx'
import NotSignInRoutePRD from '../utils/form/props_render_component/NotSignInRoutePRD.jsx'
import Index from '../containers/privateContainers/Index.jsx'
import MainPostForm from '../forms/privateForm/post_form_view/MainPostForm.jsx'
export const publicRoutes = [
    {
        path: '/',
        exact: true,
        main: () =><NotSignInRoutePRD notSignInRoutePRD={() =>   <HomePublic />} />
    },
    {
        path: '/sign-in',
        exact: true,
        main: () =><NotSignInRoutePRD notSignInRoutePRD={() =>  <SignIn /> } />
    },
    {
        path: '/sign-up',
        exact: true,
        main: () => <NotSignInRoutePRD notSignInRoutePRD={() =>  <SignUp /> } />
    },
    {
        path: '/error',
        exact: true,
        main: () => <ErrorForm />
    }
];
export const privateRoutes = [
    {
        path: '/index',
        exact: true,
        main: () => <PrivateRoutePRD title="Home" privateRoutePRD={() =>  <Index /> } />
    },
    {
        path: '/nodejs',
        exact: false,
        main: () => <PrivateRoutePRD title="NodeJs" privateRoutePRD={() =>  <MainDocument /> } />
    },
    {
        path: '/reactjs',
        exact: false,
        main: () => <PrivateRoutePRD title="ReactJs" privateRoutePRD={() =>  <MainDocument /> } />
    },
    {
        path: '/golang',
        exact: true,
        main: () => <PrivateRoutePRD title="Go lang" privateRoutePRD={() =>  <MainDocument /> } />
    },
    {
        path: '/angularjs',
        exact: true,
        main: () => <PrivateRoutePRD title="AngularJs" privateRoutePRD={() =>  <MainDocument /> } />
    },
    {
        path: '/python',
        exact: true,
        main: () => <PrivateRoutePRD title="Python" privateRoutePRD={() =>  <MainDocument /> } />
    },
    {
        path: '/graphql',
        exact: true,
        main: () => <PrivateRoutePRD privateRoutePRD={() =>  <MainDocument /> } />
    },
    {
        path: '/index/post/:id',
        exact: true,
        main: () => <PrivateRoutePRD privateRoutePRD={() =>  <MainPostForm /> } />
    },
];
export const menuContants = [
    {
        name: 'Home',
        to: '/index',
        exact: true
    },
    {
        name: 'NodeJs',
        to: '/nodejs/posts',
        exact: true
    },
    {
        name: 'ReactJs',
        to: '/reactjs',
        exact: true
    }
    ,
    {
        name: 'AngularJs',
        to: '/angularjs',
        exact: true
    },
    {
        name: 'Go Lang',
        to: '/golang',
        exact: true
    },
    {
        name: 'GraphQL',
        to: '/graphql',
        exact: true
    },
    {
        name: 'Python',
        to: '/python',
        exact: true
    }
];
export const userOptions = [
    {
        name:'Notifications',
        icon : <i className="material-icons edit-icon"> notifications_none</i>,
        to: '/account/notifications',
        exact: true
    },
    {
        name:'Setting',
        icon : <i className="material-icons edit-icon"> settings</i>,
        to: '/account/setting',
        exact: true
    },
    {
        name:'Change info',
        icon : <i className="material-icons edit-icon"> loop</i>,
        to: '/account/change-info',
        exact: true
    },
    {
        name:'Secure',
        icon : <i className="material-icons edit-icon"> security</i>,
        to: '/account/secure',
        exact: true
    }
];
