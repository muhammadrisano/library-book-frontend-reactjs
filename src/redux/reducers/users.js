const globalState = {
    token: sessionStorage.getItem('token') || null,
    id_user: sessionStorage.getItem('id_user') || null,
    role_id: sessionStorage.getItem('role_id') || null,
    card_number: sessionStorage.getItem('card_number') || null,
    photo: sessionStorage.getItem('photo') || null,
    fullname: sessionStorage.getItem('fullname') || null,
    userid: '',
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
        case 'GET_USER_iD_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };

        case 'GET_USER_ID_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_USER_ID_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userid: action.payload.data.result
            };
        case 'UPDATE_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };

        case 'UPDATE_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'UPDATE_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            };
        default:
            return state;
    }


}

export default users;