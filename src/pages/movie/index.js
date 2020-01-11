import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { API_URL, API_TOKEN } from "../../utils/constants";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";

import "./styles.scss";

export default function Movie() {
  const { id } = useParams();
  const movieInfo = useFetch(
    `${API_URL}/3/movie/${id}?api_key=${API_TOKEN}&language=en-US&page=1`
  );

  if (movieInfo.loading || !movieInfo.result) {
    return <Loading />;
  }

  return <RenderMovie movie={movieInfo.result} />;
}

function RenderMovie(props) {
  const {
    movie,
    movie: { backdrop_path, poster_path }
  } = props;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>
        <Col span={12} className="movie__info">
          <MovieInfo movieInfo={movie} />
        </Col>
      </Row>
    </div>
  );
}

function PosterMovie(props) {
  const { image } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;
  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
}

function MovieInfo(props) {
  const {
    movieInfo: { id, title, release_date, overview, genres }
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const videoMovie = useFetch(
    `${API_URL}/3/movie/${id}/videos?api_key=${API_TOKEN}&language=en-US`
  );
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const renderVideo = () => {
    if (videoMovie.result && videoMovie.result.results.length > 0) {
      const trailer = videoMovie.result.results[0];
      return (
        <>
          <Button icon="play-circle" onClick={openModal}>
            Play trailer
          </Button>
          <ModalVideo
            videoKey={trailer.key}
            videoPlatform={trailer.site}
            isOpen={isModalVisible}
            close={closeModal}
          />
        </>
      );
    }
  };

  return (
    <>
      <div className="movie__info-header">
        <h1>
          {title}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        {renderVideo()}
      </div>
      <div className="movie__info-content">
        <h3>General</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <ul>
          {genres.map(x => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
