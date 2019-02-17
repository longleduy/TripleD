import gql from 'graphql-tag'
export const POST_LIKE_SUBSCRIPTION = gql`
	subscription PostLiked{
		postLiked{
        likes,postID
    }
}
`;
export const POST_COMMENT_COUNT_SUBSCRIPTION = gql`
	subscription CommentPostCountSub{
		commentPostCountSub{
        	postID
    }
}
`;
export const CREATE_POST_SUBSCRIPTION = gql`
	subscription CreatePostSub{
        createPostSub{
		__typename
			id
			image
			userInfo{
					__typename
					profileName
					avatar
				}
			content
			isAuthor
			postDate
			postTime
			location
			tag
			count {
				__typename
				likes
				liked
				comments
				views
    }
}
    }
`;
export const POST_COMMENT_SUBSCRIPTION = gql`
	subscription CommentPostSub($postID: String!){
		commentPostSub(postID: $postID){
			commentContent
			commentImage
			commentDate
			userInfoComment {
				profileName
				avatar
			}
		}
}
`;