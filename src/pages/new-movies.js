import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { API_URL, API_TOKEN } from "../utils/constants";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";

export default function NewMovies() {
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${API_URL}/3/movie/now_playing?api_key=${API_TOKEN}&language=en-US&page=${page}`
      );
      const json = await res.json();
      setMoviesList(json);
    })();
  }, [page]);

  return (
    <Row>
      <Col span={24} style={{ textAlign: "center", marginTop: "25px" }}>
        <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>Now Playing</h1>
      </Col>
      <Col span={24}>{moviesList.results ? "The movies..." : <Loading />}</Col>

      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
}
