export const mutationUserInfo = (_, args, { cache }) => {
    cache.writeData({
        data: {
            queryUserInfo: {
                __typename: 'UserInfo',
                userID: args.userInfo.userID,
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
export const mutationChatChanel = (_, args, { cache }) => {
    if(args.isOpen){
        cache.writeData({
            data: {
                chatChanel: {
                    __typename: 'ChatChanel',
                    isOpen: args.isOpen,
                    chanelId: null,
                    toUser:{
                        __typename: 'ToUser',
                        profileName: args.to.profileName,
                        avatar: args.to.avatar,
                        id: args.to.id
                    }
                }
            }
        })
    }
    else{
        cache.writeData({
            data: {
                chatChanel: {
                    __typename: 'ChatChanel',
                    isOpen: args.isOpen,
                    chanelId: null,
                    toUser:{
                        __typename: 'ToUser',
                        profileName: null,
                        avatar: null,
                        id: '5c45717a5cc6f200b8154b2c'
                    }
                }
            }
        })
    }
    return null
}
