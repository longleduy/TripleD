import React, { useEffect, PureComponent } from 'react'
import _ from 'lodash'
import { PrivatePostChildForm } from './PrivatePostChildForm.jsx'
import { POST_LIKE_SUBSCRIPTION, CREATE_POST_SUBSCRIPTION } from '../../../graphql/subscriptions/post_subscription'
let postDateInterval;
class PrivateIndexListPostForm extends PureComponent {
    componentWillMount(){
        this.props.subscribeToMore({
            document: POST_LIKE_SUBSCRIPTION,
            updateQuery: (prev,result) => {
             let post = _.filter(prev.getLimitedPost,{id:`${result.subscriptionData.data.postLiked.postID}`});
             post[0].count.likes = result.subscriptionData.data.postLiked.likes;
              return {
                getLimitedPost: prev.getLimitedPost
              }
            }
          });
          this.props.subscribeToMore({
            document: CREATE_POST_SUBSCRIPTION,
            updateQuery: (prev,result) => {
             let newPost = result.subscriptionData.data.createPostSub;
             prev.getLimitedPost.unshift(newPost)
              return {
                getLimitedPost: prev.getLimitedPost
              }
            }
          });
          postDateInterval = setInterval(this.calcPostDate,60000);
    }
    componentWillUnmount(){
      window.clearInterval(postDateInterval)
    }
    calcPostDate = () => {
      let arr = $('[name="postDate"]');
      arr.each((idx,ele) => {
        const postDate = $(ele).text();
        if(postDate.indexOf('mins') != -1){
          const time = postDate.split(" ")[0];
          if(parseInt(time) < 59){
            const newTime = parseInt(time) + 1;
            $(ele).text(`${newTime} mins`)
          }
        }
        if(postDate.indexOf('now') != -1){
          $(ele).text(`1 mins`)
        }
      })
    }
    render() {
        const { listPost } = this.props;
        return listPost.map((post, key) => {
            const likes = post.count.likes;
            const comments = post.count.comments;
            const liked = post.count.liked;
            return <PrivatePostChildForm key={key} post={post} likes={likes} comments={comments} index={key} liked={liked} />
        })

    }
}
export default PrivateIndexListPostForm;