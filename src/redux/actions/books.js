import axios from 'axios';

export const getBooks = () => {
    return {
        type: 'GET_BOOK_PAGE',
        payload: axios.get(`http://localhost:4000/books?page=1`, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};

export const searchBook = (e) => {
    return {
        type: 'SEARCH_BOOK',
        payload: axios.get('http://localhost:4000/books?search=' + e, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};
