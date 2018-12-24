export const mutationUserInfo = (_, args, { cache }) => {
    cache.writeData({
        data: {
            queryUserInfo: {
                __typename: 'UserInfo',
                isAuthen: args.userInfo.isAuthen,
                profileName: args.userInfo.profileName,
                email: args.userInfo.email,
                gender: args.userInfo.gender,
                level: args.userInfo.level,
                avatar: args.userInfo.avatar,
                joinAt: args.userInfo.joinAt,
                dateOfBirth:args.userInfo.dateOfBirth,
                point:0,
                rank:14,
                facebookAdress:args.userInfo.facebookAdress,
                instagramAdress:args.userInfo.instagramAdress,
                posts:0
            }
        }
    })
    return null
}