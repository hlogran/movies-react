import React from "react";
import SliderMovies from "../components/SliderMovies";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";
import {Col, Row} from "antd"
import { API_URL, API_TOKEN } from "../utils/constants";

export default function Home() {
  const newMovies = useFetch( `${API_URL}/3/movie/now_playing?api_key=${API_TOKEN}&language=en-US&page=1`);
  const popularMovies = useFetch( `${API_URL}/3/movie/popular?api_key=${API_TOKEN}&language=en-US&page=1`);
  const topRatedMovies = useFetch( `${API_URL}/3/movie/top_rated?api_key=${API_TOKEN}&language=en-US&page=1`);
  return (
    <div>
      <SliderMovies movies={newMovies}/>
      <Row>
        <Col span={12}><MovieList movies={popularMovies} title="Popular Movies"/></Col>
        <Col span={12}><MovieList movies={topRatedMovies} title="Top Rated Movies"/></Col>
      </Row>
      <Footer/>
    </div>
  );
}
