import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Reducer,
  SerializedError,
} from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import moment from "moment";

export interface ICarsState {
  pageDataStatus: "idle" | "loading" | "failed";
  pageDataError: IMyKnownError | SerializedError;
  pageData: Cars;
  currentPage: number;
  paginatedData: Cars;
  filteredData: Cars;
  isFiltering: boolean;
}

const initialState: ICarsState = {
  pageDataStatus: "idle",
  pageDataError: { message: "", file: "", line: 0 },
  pageData: [],
  currentPage: 1,
  paginatedData: [],
  filteredData: [],
  isFiltering: false,
};

export const fetchCarsPageData = createAsyncThunk<
  Cars,
  undefined,
  { rejectValue: IMyKnownError }
>("cars/fetchPageData", async (_, { rejectWithValue }) => {
  try {
    return await axios
      .get("https://5fc9346b2af77700165ae514.mockapi.io/products")
      .then((res: AxiosResponse<Cars>) => res.data);
  } catch (err: any) {
    const error: AxiosError<IMyKnownError> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data);
  }
});

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
export const carsSlice = createSlice({
  name: "cars",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPaginatedData: (state) => {
      state.paginatedData = state.pageData.slice(
        state.currentPage * 12 - 12,
        state.currentPage * 12
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.paginatedData = state.isFiltering
        ? state.filteredData.slice(
            state.currentPage * 12 - 12,
            state.currentPage * 12
          )
        : state.pageData.slice(
            state.currentPage * 12 - 12,
            state.currentPage * 12
          );
    },
    search: (state, action: PayloadAction<string>) => {
      state.currentPage = 1;
      if (action.payload.length > 0) {
        state.isFiltering = true;
        state.filteredData = state.pageData.filter((car) =>
          car.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.paginatedData = state.filteredData.slice(
          state.currentPage * 12 - 12,
          state.currentPage * 12
        );
      } else {
        state.isFiltering = false;
        state.paginatedData = state.pageData.slice(
          state.currentPage * 12 - 12,
          state.currentPage * 12
        );
      }
    },
    sort: (state, action: PayloadAction<SortType>) => {
      state.currentPage = 1;
      switch (action.payload) {
        case "new-to-old":
          state.filteredData = state.pageData.sort(
            (a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix()
          );
          break;
        case "price-low-to-hight":
          state.filteredData = state.pageData.sort(
            (a, b) => Number(a.price) - Number(b.price)
          );
          break;
        case "price-hight-to-low":
          state.filteredData = state.pageData.sort(
            (a, b) => Number(b.price) - Number(a.price)
          );
          break;

        default:
          state.filteredData = state.pageData.sort(
            (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix()
          );
          break;
      }
      state.paginatedData = state.filteredData.slice(
        state.currentPage * 12 - 12,
        state.currentPage * 12
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsPageData.pending, (state) => {
        state.pageDataStatus = "loading";
      })
      .addCase(fetchCarsPageData.fulfilled, (state, action) => {
        state.pageDataStatus = "idle";
        state.pageData = action.payload.sort(
          (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix()
        );
      })
      .addCase(fetchCarsPageData.rejected, (state, action) => {
        state.pageDataStatus = "failed";

        if (action.payload) {
          // Since we passed in `IMyKnownError` to `rejectValue` in `fetchPageData`, the type information will be available here.
          state.pageDataError = action.payload;
        } else {
          state.pageDataError = action.error;
        }
      });
  },
});

export const carsActions = carsSlice.actions;

export default carsSlice.reducer as Reducer<typeof initialState>;
