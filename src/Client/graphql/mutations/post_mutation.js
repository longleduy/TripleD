import gql from 'graphql-tag'
export const CREATE_POST_MUTATION = gql`
	mutation CreatePost($postData: postData){
		createPost(postData: $postData){
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
export const LIKE_POST_MUTATION = gql`
	mutation LikePost($likeData: likeData){
		likePost(likeData: $likeData){
			__typename
			likes
			liked
		}
}
`;
export const DEL_POST_MUTATION = gql`
	mutation DelPost($postID: String!,$likes: Int!,$comments: Int!,$views: Int!){
		delPost(postID: $postID,likes: $likes,comments: $comments,views: $views){
			status
		}
}
`;
export const COMMENT_POST_MUTATION = gql`
	mutation CommentPost($postID: String!,$commentContent: String!,$commentImage: String!,$commentCount: Int!){
		commentPost(postID: $postID,commentContent: $commentContent,commentImage: $commentImage,commentCount: $commentCount){
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

