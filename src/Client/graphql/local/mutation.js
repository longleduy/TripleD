export const mutationUserInfo = (_, args, { cache }) => {
    cache.writeData({
        data: {
            queryUserInfo: {
                __typename: 'UserInfo',
                isAuthen: args.userInfo.isAuthen,
                jwt: args.userInfo.jwt,
                profileName: args.userInfo.profileName
            }
        }
    })
    return null
}