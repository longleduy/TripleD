import React, { useEffect } from 'react'
//Todo: Component
import PrivateIndexListPostForm from '../../../components/private/index/PrivateIndexListPostForm.jsx'
import { PrivateLoadingListPostForm } from '../../../components/private/loading/PrivateLoadingListPostForm.jsx'
//Todo: PropRender
import QueryPropRender from '../../../components/hocOrProprender/QueryPropRender.jsx'
//Todo: Utils
import { GET_LIMITED_POSTS } from '../../../graphql/querys/post_query'
import {POST_LIKE_SUBSCRIPTION} from '../../../graphql/subscriptions/post_subscription'
import { Error } from 'mongoose';
// const listPost = 
// [{
//   "id": "5bfabfb55aed493f4c1c071d",
//   "image": null,
//   "userInfo": {
//     "__typename": "userInfo",
//     "profileName": "Duy Long",
//     "avatar": "https://res.cloudinary.com/seatechit/image/upload/v1543147951/wesmqszimghcnotr9buc.jpg"
//   },
//   "content": "Any news on this ? I'm getting the same error. My task is executed but this error makes kue retry so it's actually executed a few times.\nThanks !",
//   "postDate": "5 mins",
//   "postTime": "22:28:53",
//   "location": "",
//   "tag": [
//     "Golang",
//     "Koltin"
//   ],
//   "count": {
//     "likes": 34,
//     "liked": true,
//     "comments": 21,
//     "views": 67
//   },
//   "newComment": {
//     "content":"Node_redis: Deprecated: The HSET command contains a 'undefined' argument. This is converted to a 'undefined' string now and will return an error from v.3.0 on. Please handle this in your code to make sure everything works as you intended it to.",
//     "commentDate": "5 mins",
//     "userInfo": {
//       "__typename": "userInfo",
//       "profileName": "Quynh Nga",
//       "avatar": "https://res.cloudinary.com/seatechit/image/upload/v1543147933/hedw9edhtyfwzueuxo0l.jpg"
//     }
//   }
// },
// {
//   "id": "5bfabf935aed493f4c1c071c",
//   "image": "https://res.cloudinary.com/seatechit/image/upload/v1543159699/ltppl5h9ryrebiz11l1z.png",
//   "userInfo": {
//     "__typename": "userInfo",
//     "profileName": "Duy Long",
//     "avatar": "https://res.cloudinary.com/seatechit/image/upload/v1543147951/wesmqszimghcnotr9buc.jpg"
//   },
//   "content": "Node_redis: Deprecated: The HSET command contains a \"undefined\" argument.\nThis is converted to a \"undefined\" string now and will return an error from v.3.0 on.\nPlease handle this in your code to make sure everything works as you intended it to.",
//   "postDate": "5 mins",
//   "postTime": "22:28:19",
//   "location": "",
//   "tag": [
//     "NodeJs",
//     "AngularJs",
//     "Golang"
//   ],
//   "count": {
//     "likes": 56,
//     "liked": false,
//     "comments": 34,
//     "views": 78
//   },
//   "newComment": null
// },{
//   "id": "5bfabfb55aed493f4c1c071d",
//   "image": null,
//   "userInfo": {
//     "__typename": "userInfo",
//     "profileName": "Duy Long",
//     "avatar": "https://res.cloudinary.com/seatechit/image/upload/v1543147951/wesmqszimghcnotr9buc.jpg"
//   },
//   "content": "Any news on this ? I'm getting the same error. My task is executed but this error makes kue retry so it's actually executed a few times.\nThanks !",
//   "postDate": "5 mins",
//   "postTime": "22:28:53",
//   "location": "",
//   "tag": [
//     "Golang",
//     "Koltin"
//   ],
//   "count": {
//     "likes": 23,
//     "liked": true,
//     "comments": 12,
//     "views": 36
//   },
//   "newComment": null
// },
// {
//   "id": "5bfabf935aed493f4c1c071c",
//   "image": "https://res.cloudinary.com/seatechit/image/upload/v1543159699/ltppl5h9ryrebiz11l1z.png",
//   "userInfo": {
//     "__typename": "userInfo",
//     "profileName": "Duy Long",
//     "avatar": "https://res.cloudinary.com/seatechit/image/upload/v1543147951/wesmqszimghcnotr9buc.jpg"
//   },
//   "content": "Node_redis: Deprecated: The HSET command contains a \"undefined\" argument.\nThis is converted to a \"undefined\" string now and will return an error from v.3.0 on.\nPlease handle this in your code to make sure everything works as you intended it to.",
//   "postDate": "5 mins",
//   "postTime": "22:28:19",
//   "location": "",
//   "tag": [
//     "NodeJs",
//     "AngularJs",
//     "Golang"
//   ],
//   "count": {
//     "likes": 12,
//     "liked": false,
//     "comments": 8,
//     "views": 20
//   },
//   "newComment": null
// }]
export const PrivateIndexListPost = React.memo((props) => {
  let loadMore;
  const addEventLoadMore = (fetchMore,length) => {
    window.removeEventListener("scroll", loadMore, false);
    window.addEventListener("scroll", loadMore = function(){
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)) {
        window.removeEventListener("scroll", loadMore, false);
        fetchMore({
          variables: { limitNumber: 1, skipNumber:length },
          updateQuery: (previousResult, { fetchMoreResult }) => {
              const prevPost = previousResult.getLimitedPost;
              const newPost = fetchMoreResult.getLimitedPost;
              return {
                getLimitedPost: [...prevPost, ...newPost]
              }
          }
      })
    }
    } , false);
  }
const subscribeLiked = (subscribeToMore) => {
  subscribeToMore({
    document: POST_LIKE_SUBSCRIPTION,
    updateQuery: (prev,postLiked) => {
      console.log(postLiked);
    }
  });
}
  // useEffect(() => {
  //   console.log(this.subscribeToMore);
  //   return () => {
  //     window.removeEventListener("scroll", loadMore, false);
  //   }
  // })
  return <QueryPropRender
    query={GET_LIMITED_POSTS} variables={{ limitNumber: 5,skipNumber:0 }}
    queryPropRender={({ loading, data,fetchMore,subscribeToMore }) => {
      if (loading) return <PrivateLoadingListPostForm />
      if(!data){
        throw new Error('Client Error')
      }
      const listPost = [...data.getLimitedPost];
      //addEventLoadMore(fetchMore,listPost.length);
      return <PrivateIndexListPostForm loading={loading} listPost={listPost} subscribeToMore ={subscribeToMore} />
    }} />
  //return <PrivateIndexListPostForm  listPost={listPost} />
})

