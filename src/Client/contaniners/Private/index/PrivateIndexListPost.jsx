import React, { useEffect } from 'react'
//Todo: Component
import PrivateIndexListPostForm from '../../../components/private/index/PrivateIndexListPostForm.jsx'
import { PrivateLoadingListPostForm } from '../../../components/private/loading/PrivateLoadingListPostForm.jsx'
//Todo: PropRender
import QueryPropRender from '../../../components/hocOrProprender/QueryPropRender.jsx'
//Todo: Utils
import { GET_LIMITED_POSTS } from '../../../graphql/querys/post_query'
import {POST_LIKE_SUBSCRIPTION} from '../../../graphql/subscriptions/post_subscription'
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
  //   return () => {
  //     window.removeEventListener("scroll", loadMore, false);
  //   }
  // })
  return <QueryPropRender
    query={GET_LIMITED_POSTS} variables={{ limitNumber: 5,skipNumber:0 }}
    queryPropRender={({ loading, data,fetchMore,subscribeToMore }) => {
      if (loading) return <PrivateLoadingListPostForm />
      if(!data){
        return null;
      }
      const listPost = [...data.getLimitedPost];
      //addEventLoadMore(fetchMore,listPost.length);
      return <PrivateIndexListPostForm loading={loading} listPost={listPost} subscribeToMore ={subscribeToMore} />
    }} />
  //return <PrivateIndexListPostForm  listPost={listPost} />
})

