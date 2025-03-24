const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about-us',
  SIGNUP:'/signup',
  CART:'/cart',
  WISHLIST:'/wishlist'
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.LOGIN,
  PRIVATE: ROUTES.HOMEPAGE,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Home',
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Login',
  },
  REGISTER: {
    path: ROUTES.REGISTER,
    title: 'Register',
  },
  ABOUT: {
    path: ROUTES.ABOUT,
    title: 'About us',
  },
  SIGNUP:
  {
    path: ROUTES.SIGNUP,
    title:'Signup',
  },
  CART:{
    path:ROUTES.CART,
    title:'Cart',
  },
  WISHLIST:{
    path:ROUTES.WISHLIST,
    title:'WishList',
  },
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
