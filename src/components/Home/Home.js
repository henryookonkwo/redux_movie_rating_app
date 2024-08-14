import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";

import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
  fetchAsyncMovieOrShowDetail,
  // selectMovies,
  // selectStatus,
} from "../../features/movies/moviesSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows());
    dispatch(fetchAsyncMovieOrShowDetail());
  }, [dispatch]);
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
