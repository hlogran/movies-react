import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import MovieCatalog from "../../components/MovieCatalog";
import Footer from "../../components/Footer";
import { API_URL, API_TOKEN } from "../../utils/constants";

import "./styles.scss";

function Search(props) {
  const { location, history } = props;
  const [moviesList, setmoviesList] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      const searchValue = queryString.parseUrl(location.search);
      const { s } = searchValue.query;
      const response = await fetch(
        `${API_URL}/3/search/movie?api_key=${API_TOKEN}&language=es-ES&query=${s}&page=1`
      );
      const movies = await response.json();

      setSearchValue(s);
      setmoviesList(movies);
    })();
  }, [location.search]);

  const onChangeSerach = e => {
    setSearchValue(e.target.value);
  };

  const onPressEnter = e => {
    const urlParams = queryString.parse(location.search);
    urlParams.s = e.target.value;
    history.push(`?${queryString.stringify(urlParams)}`);
  };

  return (
    <Row>
      <Col span={12} offset={6} className="search">
        <h1>Search a Movie</h1>
        <Input
          value={searchValue}
          onChange={onChangeSerach}
          onPressEnter={onPressEnter}
        />
      </Col>
      {moviesList && moviesList.results && (
        <Row>
          <Col span={24}>
            <MovieCatalog movies={moviesList.results} />
          </Col>
        </Row>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
}

export default withRouter(Search);
