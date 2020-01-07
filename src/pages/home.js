import React from "react";
import SliderMovies from "../components/SliderMovies";
import useFetch from "../hooks/useFetch";
import { API_URL, API_TOKEN } from "../utils/constants";

export default function Home() {
  const newMovies = useFetch( `${API_URL}/3/movie/now_playing?api_key=${API_TOKEN}&language=en-US&page=1`);
  return (
    <SliderMovies movies={newMovies}/>
  );
}
