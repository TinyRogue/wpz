export const api = {
  BASE_URL: process.env.REACT_APP_BASE_API_URL,
  endpoints: {
    POST_BOOK: '/books',
    GET_BOOKS: (userId: string) => `/user/${userId}/books`,
    POST_PHRASE: '/phrases',
    GET_PHRASES: (userId: string) => `/user/${userId}/phrases`,
  },
};
