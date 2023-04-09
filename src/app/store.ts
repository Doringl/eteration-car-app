import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/cars/carsSlice";
// ...

const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("cars");
    if (serialisedState === null) return [];
    return JSON.parse(serialisedState) as Array<Car & { count: number }>;
  } catch (e) {
    console.warn(e);
    return [];
  }
};

export const store = configureStore({
  reducer: {
    cars: carReducer,
  },
  preloadedState: {
    cars: {
      cart: loadFromLocalStorage(),
      pageDataStatus: "idle",
      pageDataError: { message: "", file: "", line: 0 },
      pageData: [],
      currentPage: 1,
      paginatedData: [],
      filteredData: [],
      isFiltering: false,
    },
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
