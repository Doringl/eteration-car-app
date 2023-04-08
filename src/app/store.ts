import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/cars/carsSlice";
// ...

export const store = configureStore({
  reducer: {
    cars: carReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
