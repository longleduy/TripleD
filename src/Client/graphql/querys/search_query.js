import gql from 'graphql-tag'
export const FILTER_ALL_BY_KEYWORD_QUERY = gql`
     query FilterAllByKeyWord($keyWord:String!){
        filterAllByKeyWord(keyWord:$keyWord){
        userSearchResult{
            id
            profileName
            avatar
            }
        postSearchResult{
            id
            userInfo2{
                id
                profileName
                avatar
            }
            content
            image
            }
        }
            }
`;