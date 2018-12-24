import React, { Component } from "react";
import jwt from 'jsonwebtoken'
import { MUTATION_USER_INFO } from "./utils/contants/local_state_contants";
import { resolve } from "url";


export default class ApolloProviderPropsRender extends Component {
    constructor(props) {
        super(props);
    }
    async componentWillMount() {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            if (token != null && token != '') {
                const info = jwt.decode(token);
                if(info != null && info != ''){
                    info['isAuthen'] = true;
                    const result = await this.props.client.mutate({
                        variables: { userInfo: info },
                        mutation: MUTATION_USER_INFO
                    });
                    return result;
                }
            }
        } catch (error) { }
    }
    render() {
        return (this.props.provider())
    }

}