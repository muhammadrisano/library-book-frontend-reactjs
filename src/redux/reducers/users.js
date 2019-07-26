const globalState = {
    token: sessionStorage.getItem('token') || null,
    id_user: sessionStorage.getItem('id_user') || null,
    role_id: sessionStorage.getItem('role_id') || null,
    user: localStorage.getItem('user'),
    isLoading: false,
    isFulfilled: false,
    isRejected: false
};


const users = (state = globalState, action) => {

    switch (action.type) {
        case 'LOGIN_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'LOGIN_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'LOGIN_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                user: action.payload.data.result
            };
        default:
            return state;
    }


}

export default users;