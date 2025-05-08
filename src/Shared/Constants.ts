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

const VALIDATION = {
  REQUIRED: 'Required',
  MAX_LENGTH_20: 'Must be 20 character or less',
  MAX_LENGTH_30: 'Must be 30 character or less',
  NAME_REQUIRED: 'Name is required',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Enter a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  NEW_PASSWORD_REQUIRED: 'New Password is required',
  CURRENT_PASSWORD_REQUIRED: 'Current Password is required',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required',
  PASSWORD_CANNOT_SAME: 'New password cannot be the same as current password',
  PASSWORD_MUST_MATCH: 'Confirm Passwords must match with new password',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  PHONE_NO_LENGTH: 'Phone number must have 10 digits',
  PASSWORD_WEAK:
    'Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 symbol',
  PASSWORD_REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
  Email_REGEX: /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/,
  PHONE_NO_REGEX: /^\d{10}$/,
};

const TOAST = {
  CHANGE_SUCCESFULLY: 'Password changed successfully!',
  WRONG_PASSWORD: 'Current password is wrong.',
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  EMAIL_NOT_VERIFIED: 'Email not verified. Please check your inbox.',
  NO_USER_FOUND: 'No user found with this email.',
  RESET_EMAIL_SEND: 'Reset email sent! Check your inbox',
  FAILED_TO_SEND_EMAIL: 'Failed to send reset email',
  ADDRESS_ERROR: 'Address not selected',
  PAYMENT_FAIL: 'Payment initiation failed',
  MINT_FAIL: 'Payment failed. Please try again.',
};

const WEBLINK = {
  INSTAGRAM: 'https://www.instagram.com/chicmic.in/',
  TWITTER: 'https://twitter.com/chic_mic',
  LINKEDIN: 'https://www.linkedin.com/company/chicmicstudios',
  FACEBOOK: 'https://www.facebook.com/ChicmicAU',
};

const BREADCRUMB = {
  HOME: 'Home /',
  ABOUT: ' About',
  ACCOUNT: ' Account',
  CART: ' Cart',
  WISHLIST: ' Wishlist',
};

const TEXT = {
  MANAGE_ACCOUNT: 'Manage My Account',
  MY_PROFILE: 'My Profile',
  ADDRESS_BOOK: 'Address Book',
  BRAND_NAME: 'EXCLUSIVE',
  NAV_HOME: 'Home',
  NAV_CONTACT: 'Contact',
  NAV_ABOUT: 'About',
  NAV_LOGIN: 'Login',
  SEARCH_PLACEHOLDER: 'What are you looking for?',
  SEARCH_EMPTY_WARNING: 'Search field cannot be empty',
  ORDERS: 'My Orders',
  LOGOUT: 'Logout',
  LOGOUT_CONFIRM_TITLE: 'Logout Confirmation',
  LOGOUT_CONFIRM_MESSAGE: 'Are you sure you want to log out?',
  LOGOUT_CONFIRM_BTN: 'Confirm',
  LOGOUT_CANCEL_BTN: 'Cancel',
  WELCOME: 'Welcome',
  NO_SEARCH_QUERY: 'No search query provided',
  ERROR_LOADING: 'Error in loading product',
  NOT_FOUND: 'Sorry, we could not found any result',
  SHOWING_RESULT: 'Showing results for:',
  DATA_NOT_AVAILABLE: 'No product data available.',

  //CART TEXT
  PLEASE_SIGN_IN: 'Please sign in to view your cart',
  SIGN_IN_SYNC: 'Sign in to sync your across all devices.',
  NO_ITEMS: 'No items in the cart',
  PRODUCT: 'Product',
  PRICE: 'Price',
  QUANTITY: 'Quantity',
  SUBTOTAL: 'Subtotal',
  REMOVE: 'Remove',
  RETURN_TO_SHOP: 'Return to Shop',
  CLEAR_CART: 'Clear Cart',
  CART_TOTAL: 'Cart Total',
  SUBTOTAL_LABEL: 'Subtotal',
  SHIPPING: 'Shipping',
  SHIPPING_FREE: 'Free',
  TOTAL: 'Total',
  PROCEED_TO_CHECKOUT: 'Proceed to Checkout',
  CLEAR_CART_CONFIRMATION: 'Clear Cart Confirmation',
  CLEAR_CART_PROMPT: 'Are you sure you want to clear cart?',
  CONFIRM: 'Confirm',
  CANCEL: 'Cancel',
  REMOVE_FAILED: 'Failed to remove Item',
  UPDATE_QUANTITY_FAILED: 'error updating quantity',

  //CATEGORIES
  CATEGORIES: 'Categories',
  WOMENS_FASHION: "Women's Fashion",
  MENS_FASHION: "Men's Fashion",
  ELECTRONICS: 'Electronics',
  JEWELLERY: 'Jewellery',

  //ADDRESS
  SELECT_ADDRESS: 'Select Address',
  ADD_ANOTHER_ADDRESS: 'Add Another Address',

  //PAYMENT
  PAY: 'Pay',
  PROCESSING: 'Processing...',
  PAYMENT_IN_PROGRESS: 'Payment in Progress',
  TX_PROCESSING: 'Your transaction is processing on the blockchain...',
  TX: 'Transaction',
  VIEW_ON_ETHERSCAN: 'View on Etherscan',
  ORDER_CONFIRMED: 'Order Confirmed',
  ORDER_RECEIVED: 'Your order has been received and will be processed shortly.',
  VIEW_ORDER: 'View Order',
  CONTINUE_SHOPPING: 'Continue Shopping',
  TX_HASH: 'Transaction Hash:',
  COMING_SOON: 'Coming Soon',
  BACK_TO_HOME: 'Back to home Page',

  //WISHLIST
  EMPTY_WISHLIST_TITLE: 'Your wishlist is empty',
  EMPTY_WISHLIST_DESCRIPTION:
    'Save items you love in your wishlist and review them anytime.',
  WISHLIST_HEADING: 'My Wishlist',
  ITEMS: 'items',
  MOVE_ALL_TO_CART: 'Move All to Cart',
  MOVE_TO_CART: 'Move to Cart',
  LOAD_MORE: 'Load More',
  LOADING: 'Loading...',
  ADD_TO_CART: 'Add to Cart',

  //SHOP
  CUSTOMER_REVIEWS: 'Customer Reviews',
  AND_ABOVE: '& above',
  MIN: 'Min',
  MAX: 'Max',
  NO_PRODUCTS_MATCH: 'No products match the selected filters.',
  BUY_NOW: 'Buy Now',
  RELEATED_ITEMS: 'Related Item',

  //Orders
  SORRY_NO_ORDERS: 'Sorry, we could not find any orders',
  YOUR_ORDERS: 'Your Orders',
  ORDER_DATE: 'Order Date',
  SHIPPING_ADDRESS: 'Shipping Address',
  PHONE: 'Phone',
  QTY: 'Qty',

  ERROR_HEADING: '404 Not Found',
  ERROR_MESSAGE: 'You visited page not found. You may go home page',
};

const ABOUT_PAGE = {
  PARAGRAPH_1:
    "Launched in 2015,Exclusive in South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers adn 300 brands and serves 3 millions customers across the region.",
  PARAGRAPH_2:
    'Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assessment in categories ranging from consumer.',

  STATS: [
    {
      count: '10.5k',
      label: 'Sellers active in our site',
    },
    {
      count: '33k',
      label: 'Monthly Product Sale',
    },
    {
      count: '45k',
      label: 'Custombers active in our site',
    },
    {
      count: '25k',
      label: 'Anual gross sale in our site',
    },
  ],
  FEATURES: [
    {
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
    },
    {
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
    },
    {
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
    },
  ],
};

export {
  ROUTES,
  ROUTES_CONFIG,
  VALIDATION,
  TOAST,
  WEBLINK,
  BREADCRUMB,
  ABOUT_PAGE,
  TEXT,
};
