export const routes = {
  login: '/login',
  register: '/register',

  home: '/',
  book: '/book/:id',
  addBook: '/add-book',
  phrases: '/phrases',
};

export const paths = {
  book: (id: string) => `/book/${id}`,
};
