import React, { Fragment, Component } from 'react'
import { Route, Link, NavLink } from "react-router-dom"
import Button from '@material-ui/core/Button'
import * as Routes from './routes_contant.js'

const MyNavLink = ({ name, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact}
            children={({ match }) => {
                let active = match ? 'active' : '';
                return (
                    <NavLink to={to} exact={true}>
                        <Button color="inherit" className="no-upper color-w no-bgc menu">{name}</Button>
                    </NavLink>
                )
            }}
        />
    )
}
export const showMenu = () => {
    let menu = null;
    menu = Routes.menuContants.map((menu, key) => {
        return <MyNavLink
            key={key}
            name={menu.name}
            to={menu.to}
            activeOnlyWhenExact={menu.exact}
        />
    })
    return menu;
}
export const showPublicRoutes = () => {
    let route = null;
    route = Routes.publicRoutes.map((router, index) => {
        return <Route
            key={index}
            path={router.path}
            render={router.main}
            exact={router.exact}
        />
    })
    return route;
}
export const showPrivateRoutes = () => {
    let route = null;
    route = Routes.privateRoutes.map((router, index) => {
        return <Route
            key={index}
            path={router.path}
            render={router.main}
            exact={router.exact}
        />
    })
    return route;
}