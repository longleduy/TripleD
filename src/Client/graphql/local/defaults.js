
export const getCacheLocalStorage = () => {
        const defaults = {
            queryUserInfo: {
                __typename: 'UserInfo',
                isAuthen: false,
                jwt: null,
                profileName: null
            }
        }
        return defaults;
    //}
}