import React, { Fragment, Component } from 'react'
//Todo: Component
import {PrivateIndexTopMemberForm} from '../../../components/private/index/PrivateIndexTopMemberForm.jsx'
//Todo: PropRender
import QueryPropRender from '../../../components/hocOrProprender/QueryPropRender.jsx'
//Todo: Utils

// const listPost = 
// []
export const PrivateIndexTopMember = React.memo((props) => {
  // return <QueryPropRender
  //   query={GET_LIMITED_POSTS} variables={{ limitNumber: 5 }}
  //   queryPropRender={({ loading, data }) => {
  //     if(loading) return <PrivateLoadingListPostForm />
  //     const listPost = [...data.getLimitedPost];
  //     return <PrivateIndexListPostForm loading={loading} listPost={listPost} />
  //   }} />
    return <PrivateIndexTopMemberForm />
})