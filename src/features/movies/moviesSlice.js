import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

// export const fetchAsyncShows = createAsyncThunk(
//   "movies/fetchAsyncShows",
//   async () => {
//     const seriesText = "Friends";
//     const response = await movieApi.get(
//       `?apiKey=${APIKey}&s=${seriesText}&type=series`
//     );
//     return response.data;
//   }
// );

// export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
//   "movies/fetchAsyncMovieOrShowDetail",
//   async (id) => {
//     const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
//     return response.data;
//   }
// );

const initialState = {
  movies: {},
  shows: {},
  status: null,
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.status = "loading";
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        state.status = "succeeded";
        state.movies = payload;
        // return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        state.status = "failed";
        console.log("Rejected!");
      });
    //     [fetchAsyncShows.fulfilled]: (state, { payload }) => {
    //       console.log("Fetched Successfully!");
    //       return { ...state, shows: payload };
    //     },
    //     [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
    //       console.log("Fetched Successfully!");
    //       return { ...state, selectMovieOrShow: payload };
    //     },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const selectMovies = (state) => state.movies.movies;
export const selectStatus = (state) => state.movies.status;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
