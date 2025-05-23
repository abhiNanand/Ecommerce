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
  NAME_REQUIRED: 'Name is required',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  PHONE_NO_REQUIRED: 'Phone number is required',
  EMAIL_INVALID: 'Enter a valid email address',
  MAX_LENGTH_20: 'Must be 20 character or less',
  MAX_LENGTH_30: 'Must be 30 character or less',
  MAX_LENGTH_50: 'Must be 50 character or less',
  NEW_PASSWORD_REQUIRED: 'New Password is required',
  CURRENT_PASSWORD_REQUIRED: 'Current Password is required',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required',
  MESSAGE_IS_REQUIRED: 'Message is required',
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

  // BUY PRODUCTS
  COUPON_ALREADY_APPLIED: 'Coupon already applied on this purchase',
  SUCCESS_20_OFF: 'Congrats 20% OFF',
  COUPON_NOT_FOUND: 'Coupon not found',
  ENTER_VALID_COUPON: 'Enter a valid coupon',
  MESSAGE_SEND_SUCCESSFULLY:
    'Message sent successfully! We will contact you soon',
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
  CONTACT: 'Contact',
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

  // CART TEXT
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

  // CATEGORIES
  CATEGORIES: 'Categories',
  WOMENS_FASHION: "Women's Fashion",
  MENS_FASHION: "Men's Fashion",
  ELECTRONICS: 'Electronics',
  JEWELLERY: 'Jewellery',

  // ADDRESS
  SELECT_ADDRESS: 'Select Address',
  ADD_ANOTHER_ADDRESS: 'Add Another Address',

  // PAYMENT
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

  // WISHLIST
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

  // SHOP
  CUSTOMER_REVIEWS: 'Customer Reviews',
  AND_ABOVE: '& above',
  MIN: 'Min',
  MAX: 'Max',
  NO_PRODUCTS_MATCH: 'No products match the selected filters.',
  BUY_NOW: 'Buy Now',
  RELEATED_ITEMS: 'Related Item',

  // Orders
  SORRY_NO_ORDERS: 'Sorry, we could not find any orders',
  YOUR_ORDERS: 'Your Orders',
  ORDER_DATE: 'Order Date',
  SHIPPING_ADDRESS: 'Shipping Address',
  PHONE: 'Phone',
  QTY: 'Qty',

  ERROR_HEADING: '404 Not Found',
  ERROR_MESSAGE: 'You visited page not found. You may go home page',

  // BUY PRODUCTS
  BILLING_DETAILS: 'Billing Details',
  ETH: 'ETH:',
  PLACEHOLDER_COUPON: 'Coupon Code',
  APPLY_COUPON: 'Apply Coupon',
  COUPON: 'Coupon:',
  COUPON_REMOVE: '[Remove]',
  SAVE20: 'SAVE20',

  // SHARE
  EMAIL: 'Email',
  WHATSAPP: 'Whatsapp',
  TELLEGRAM: 'Telegram',
  COPYLINK: 'CopyLink',

  SHOP_NOW: 'Shop Now',
  THIS_MONTH: 'This Month',
  BEST_SELLING: 'Best Selling Products',
  VIEW_ALL: 'View All',
  BROWSE_BY_CATEGORIES: 'Browse by Categories',

  DAYS: 'Days',
  HOURS: 'Hours',
  MINUTES: 'Minutes',
  SECONDS: 'Second',
  MUSIC_EXPERIENCE: 'Enhance Your',
  ENHANCE_YOUR: 'Music Experience',
  TODAYS: `Today's`,
  FLASH_SALES: 'Flash Sales',
  TRY_AGAIN: 'Try Again',

  EDIT_PROFILE: 'Edit Your Profile',
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  CURRENT_PASSWORD: 'Current Password',
  NEW_PASSWORD: 'New Password',
  CONFIRM_PASSWORD: 'Confirm New Password<',
  CHANGE_PASSWORD: 'Change Password',
  ANNOUNCEMENT:
    'Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!',

  // Contact
  CALL_TO_US: 'Call To Us',
  CALL_TO_US_DESC: 'We are available 24/7, 7 days a week.',
  CALL_TO_US_PHONE: 'Phone: +917091400186',
  WRITE_TO_US: 'Write To Us',
  WRITE_TO_US_DESC:
    'Fill out our form and we will contact you within 24 hours.',
  EMAIL_1: 'Email: customer@exclusive.com',
  EMAIL_2: 'Email support@exclusive.com',
  PLACEHOLDER_NAME: 'Name*',
  PLACEHOLDER_EMAIL: 'Email*',
  PLACEHOLDER_PHONE: 'Phone Number*',
  PLACEHOLDER_MESSAGE: 'Message',
  SEND_MESSAGE: 'Send Message',
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

// src/Shared/Constants.ts

const INFO_SECTIONS = {
  FAQs: [
    {
      id: 'order',
      question: 'How do I place an order?',
      answer:
        'Add items to your cart, go to checkout, fill in shipping details, and proceed to payment.',
    },
    {
      id: 'cancel',
      question: 'Can I cancel or modify my order?',
      answer:
        'Yes, orders can be canceled or changed within 2 hours of placement.',
    },
    {
      id: 'payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept UPI, Credit/Debit Cards, Net Banking, and Wallets.',
    },
    {
      id: 'damaged',
      question: 'What if my product arrives damaged?',
      answer:
        'You can raise a return or replacement request from the "My Orders" section.',
    },
  ],
  PrivacyPolicy: [
    {
      id: 'privacy-1',
      text: `We value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.`,
    },
    {
      id: 'privacy-2',
      text: `We collect information like your name, email, address, and order history only to process transactions and enhance your experience. Your data is stored securely and is never sold or rented to third-party companies.`,
    },
    {
      id: 'privacy-3',
      text: `You have full control over your information. You can update, correct, or delete your data at any time by contacting our support team.`,
    },
  ],
  TermsOfUse: [
    {
      id: 'terms-1',
      text: `By accessing this website, you agree to comply with our terms and conditions. These terms govern your usage of the site and all services provided.`,
    },
    {
      id: 'terms-2',
      text: `You agree not to misuse the website for any unlawful or prohibited activity. Unauthorized use or duplication of content, trademarks, or logos is strictly forbidden.`,
    },
    {
      id: 'terms-3',
      text: `We reserve the right to change these terms at any time. Continued use of the website after changes implies acceptance of the updated terms.`,
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
  INFO_SECTIONS,
};
