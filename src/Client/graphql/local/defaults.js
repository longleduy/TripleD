
export const getCacheLocalStorage = () => {
        const defaults = {
            queryUserInfo: {
                __typename: 'UserInfo',
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
            }
        }
        return defaults;
    //}
}