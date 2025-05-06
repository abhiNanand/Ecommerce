const STRING: string = 'Test';
export { STRING };

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
  ADDRESS: 'address',
  CONTACT: '/contact',
  SHOP: 'shop',
  SEARCH: '/search/:query',
  ORDER: '/order',
  BUY: '/buy/:productId',
  BROWSE: '/browse',
  FAQs: `/faqs`,
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-of-use',
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
  ADDRESS: {
    path: ROUTES.ADDRESS,
  },
  CONTACT: {
    path: ROUTES.CONTACT,
    title: 'contact',
  },
  SHOP: {
    path: ROUTES.SHOP,
    title: 'shop',
  },
  SEARCH: {
    path: ROUTES.SEARCH,
    title: 'search',
  },
  ORDER: {
    path: ROUTES.ORDER,
    title: 'order',
  },
  BUY: {
    path: ROUTES.BUY,
    title: 'buyproduct',
  },
  BROWSE: {
    path: ROUTES.BROWSE,
    title: 'product',
  },
  FAQs: {
    path: ROUTES.FAQs,
    title: 'FAQs',
  },
  PRIVACY_POLICY: {
    path: ROUTES.PRIVACY_POLICY,
    title: 'Privacy Policy',
  },
  TERMS_OF_USE: {
    path: ROUTES.TERMS_OF_USE,
    title: 'Terms Of Use',
  },
};

const VALIDATION_CONSTANTS = {
  NAME_REQUIRED: 'Name is required',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Enter a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  PASSWORD_WEAK: 'Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 symbol',
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
  Email_REGEX:/^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/,
};

export { ROUTES, ROUTES_CONFIG,VALIDATION_CONSTANTS };
