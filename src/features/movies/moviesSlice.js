import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // const movieText = "Harry";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = "Friends";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
  loader: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Pending");
        // state.loader = true;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Movies Fetched Successfully!");
        state.movies = payload; //immer.js allows us to update state in this manner
        // return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        console.log("Rejected!");
      })

      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Shows Fetched Successfully!");
        state.shows = payload;
        // return { ...state, shows: payload };
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("selectMovieOrShow Fetched Successfully!");
        state.selectMovieOrShow = payload;
        // return { ...state, shows: payload };
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getLoader = (state) => state.movies.loader;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
