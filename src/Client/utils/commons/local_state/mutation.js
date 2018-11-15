export const mutationUserInfo = (_, args, { cache }) => {
    cache.writeData({
        data: {
            queryUserInfo: {
                __typename: 'UserInfo',
                isAuthen: args.userInfo.isAuthen,
                jwt: args.userInfo.jwt,
                profile_name: args.userInfo.profile_name
            }
        }
    })
    return null
}