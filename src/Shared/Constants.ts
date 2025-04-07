const STRING: string = 'Test';
export { STRING };

// Profile,Cancel,Return,Payment,Address
const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  SIGNUP: '/signup',
  CART: '/cart',
  WISHLIST: '/wishlist',
  PRODUCT_DETAILS: '/product/:productId',
  WILDCARD: '*',
  CATEGORY: '/category/:category',
  ACCOUNT: '/account',
  CHECKOUT: '/cart/checkout',
  PROFILE: 'profile',
  CANCLE: 'cancel',
  RETURN: 'return',
  PAYMENT: 'payment',
  ADDRESS: 'address',
  CONTACT: 'contact',
  SHOP:'shop',
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
  SIGNUP: {
    path: ROUTES.SIGNUP,
    title: 'Signup',
  },
  CART: {
    path: ROUTES.CART,
    title: 'Cart',
  },
  WISHLIST: {
    path: ROUTES.WISHLIST,
    title: 'WishList',
  },
  PRODUCT_DETAILS: {
    path: ROUTES.PRODUCT_DETAILS,
    title: 'Details',
  },
  WILDCARD: {
    path: ROUTES.WILDCARD,
    title: '404 Error',
  },
  CATEGORY: {
    path: ROUTES.CATEGORY,
    title: 'category',
  },
  ACCOUNT: {
    path: ROUTES.ACCOUNT,
    title: 'account details',
  },
  CHECKOUT: {
    path: ROUTES.CHECKOUT,
    title: 'checkout',
  },

  PROFILE: {
    path: ROUTES.PROFILE,
  },
  CANCLE: {
    path: ROUTES.CANCLE,
  },
  RETURN: {
    path: ROUTES.RETURN,
  },
  PAYMENT: {
    path: ROUTES.PAYMENT,
  },
  ADDRESS: {
    path: ROUTES.ADDRESS,
  },
  CONTACT: {
    path: ROUTES.CONTACT,
    title: 'contact',
  },
  SHOP:
  {
    path:ROUTES.SHOP,
    title:'shop'
  }
};
export { ROUTES, ROUTES_CONFIG };
