import api from '../../api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProductById: build.query({
      query: (id) => `/products/${id}`,
    }),
    getProduct: build.query({
      query: () => `/products`,
    }),
    getProductByCategory: build.query({
      query: (category) => `/products/category/${category}`,
    }),
  }),
  overrideExisting: false,
});

// We can use the Lazy Query as well for GET requests depends on our Requirements.
// For POST request we will use mutations.
export const {
  useGetProductByIdQuery,
  useGetProductQuery,
  useGetProductByCategoryQuery,
} = userApi;

// all categories
// men's clothing //electronics women's clothing
// note
// id come directly after /products/ but not category directly after products because product has a unique identifier, so the URL structure directly maps to that resource.
// another method to fetch products check its correct way
// url :`products`,
// category ,
