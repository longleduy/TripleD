
export const getCacheLocalStorage = () => {
        const defaults = {
            queryUserInfo: {
                __typename: 'UserInfo',
                userID: null,
                isAuthen: false,
                profileName: null,
                joinAt: null,
                dateOfBirth:null,
                email: null,
                gender: null,
                level: null,
                avatar: null,
                dateOfBirth:null,
                point:null,
                rank:null,
                facebookAdress:null,
                instagramAdress:null,
                posts:null
            },
            chatChanel:{
                __typename: 'ChatChanel',
                isOpen: false,
                chanelId: null,
                toUser:{
                    __typename: 'ToUser',
                    profileName: null,
                    id: null,
                    avatar: null
                }
            }
        }
        return defaults;
    //}
}