import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // default, if we don't to put this, it will ok
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
               query: () => '/todos',
               transformResponse: res=> res.sort((a, b)=> b.id - a.id), // sorting
               providesTags: ['Todos'],
      }),
        addTodos: builder.mutation({
        query: (todo) => ({
            url: '/todos',
            method: 'POST',
            body: todo, // for the body of query, we are just passing new todo
        }),
            invalidatesTags: ['Todos'],
    }),
       updateTodos: builder.mutation({
            // note: an optional `queryFn` may be used in place of `query`
            query: (todo) => ({
              url: `/todos/${todo.id}`,
              method: 'PATCH',
              body: todo,
            }),
            invalidatesTags: ['Todos'],
      }),
      deleteTodos: builder.mutation({
        // note: an optional `queryFn` may be used in place of `query`
        query: ({id}) => ({
          url: `/todos/${id}`,
          method: 'DELETE',
          body: id,
        }),
        invalidatesTags: ['Todos'],
     }),
  })
})

  export const {
    useGetTodosQuery,
    useAddTodosMutation,
    useUpdateTodosMutation,
    useDeleteTodosMutation,
 } =  apiSlice
