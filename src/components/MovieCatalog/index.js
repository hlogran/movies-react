import React from "react";
import { Col, Card, Icon } from "antd";
import { Link } from "react-router-dom";

import "./styles.scss";

export default function MovieCatalog(props) {
  const { movies } = props;

  return movies.map(movie => (
    <Col key={movie.id} xs={4} className="movie-catalog">
      <MovieCard movie={movie} />
    </Col>
  ));
}

function MovieCard(props) {
  const {
    movie: { id, title, poster_path }
  } = props;

  const { Meta } = Card;

  const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <Link to={`/movie/${id}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={title} src={posterPath} />}
      >
        <Meta title={title} />
      </Card>
    </Link>
  );
}
