import gql from 'graphql-tag'

export const GET_LIMITED_POSTS = gql`
     query GetLimitedPosts($limitNumber:Int!,$skipNumber:Int!){
        getLimitedPost(limitNumber:$limitNumber,skipNumber:$skipNumber){
			id
			userInfo{
					profileName,
					avatar
				}
			content
			isAuthor
			image
			postDate
			postTime
			location
			tag
			count {
				likes
				liked
				comments
				views
			}
		}
    }
`;
export const LOAD_MORE_CMT_QUERY = gql`
     query LoadMoreCmt($postID: String!,$limitNumber:Int!,$skipNumber:Int){
        loadMoreComment(postID:$postID,limitNumber:$limitNumber,skipNumber:$skipNumber){
			commentContent,
			commentImage,
			commentDate,
			userInfoComment{
			profileName,
			avatar
			}
		}
    }
`;