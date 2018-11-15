import React, { Component } from 'react'
import {HomePublic} from '../../contaniners/Public/HomePublic.jsx'
import {PrivateIndex} from '../../contaniners/Private/PrivateIndex.jsx'
import ErrorForm from '../../components/ErrorForm.jsx'
import PrivateRoutePropRender from '../../components/HocOrProprender/PrivateRoutePropRender.jsx'
import PublicRouterPropRender from '../../components/HocOrProprender/PublicRouterPropRender.jsx'
export const publicRoutes = [
    {
        path: '/',
        exact: true,
        main: () => <PublicRouterPropRender publicRouterPropRender={() =>  <HomePublic /> } />
    },
    {
        path: '/sign',
        exact: false,
        main: () => <PublicRouterPropRender publicRouterPropRender={() =>  <HomePublic /> } />
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
        main: () => <PrivateRoutePropRender privateRoutePropRender={() =>  <PrivateIndex /> } />
    }
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
