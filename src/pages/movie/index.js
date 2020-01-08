import React from "react";
import {Row, Col, Button} from 'antd';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import useFetch from '../../hooks/useFetch';
import {API_URL, API_TOKEN} from '../../utils/constants';
import Loading from '../../components/Loading';
import "./styles.scss";

export default function Movie() {
  const {id} = useParams();
  const movieInfo = useFetch( `${API_URL}/3/movie/${id}?api_key=${API_TOKEN}&language=en-US&page=1`);

  if (movieInfo.loading || !movieInfo.result) {
    return <Loading />;
  }
  
  return <RenderMovie movie={movieInfo.result} />;
}


function RenderMovie(props){
  const {movie: {title, backdrop_path}} = props;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  return (
    <div 
      className="movie" 
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark"/>
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          Poster
        </Col>
        <Col span={12} className="movie__info">
          Info
        </Col>
      </Row>
    </div>
  )
}