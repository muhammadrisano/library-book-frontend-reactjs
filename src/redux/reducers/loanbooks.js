const globalState = {

    borrowUser =[],
    borrowAllUser =[],
    isLoading: false,
    isFulfilled: false,
    isRejected: false
};


const loanbooks = (state = globalState, action) => {



    switch (action.type) {
        case 'GET_BOOK_PAGE_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_BOOK_PAGE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_BOOK_PAGE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookshow: action.payload.data.result
            };

        default:
            return state;
    }

}

export default books;