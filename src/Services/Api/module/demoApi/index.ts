import api from '../../api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    demoApi: build.query({
      query: () => '/products',
    }),
  }),
  overrideExisting: false,
});

// We can use the Lazy Query as well for GET requests depends on our Requirements.
// For POST request we will use mutations.
export const { useDemoApiQuery } = userApi;
