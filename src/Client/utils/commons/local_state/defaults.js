

export const getCacheLocalStorage = () => {
    // try {
    //     const userInfo = JSON.parse( localStorage.getItem('userInfo'))
    //    if(userInfo.isAuthen){
    //     const defaults = {
    //         queryUserInfo: {
    //             __typename: 'UserInfo',
    //             isAuthen: userInfo.isAuthen,
    //             jwt: userInfo.jwt,
    //             profile_name: userInfo.profile_name
    //         }
    //     }
    //     return defaults
    //    }
    //    throw new Error();
    // } catch (error) {
        const defaults = {
            queryUserInfo: {
                __typename: 'UserInfo',
                isAuthen: false,
                jwt: null,
                profile_name: null
            }
        }
        return defaults;
    //}
}