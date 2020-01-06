import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//pages
import Home from "./pages/home";
import NewMovies from "./pages/new-movies";
import Popular from "./pages/popular";
import Search from "./pages/search";
import Error404 from "./pages/error404";
import Movie from "./pages/movie";

function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Header>Header....</Header>
      <Content>
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/new-movies" exact={true}>
              <NewMovies />
            </Route>
            <Route path="/popular" exact={true}>
              <Popular />
            </Route>
            <Route path="/search" exact={true}>
              <Search />
            </Route>
            <Route path="/movie" exact={true}>
              <Movie />
            </Route>

            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Router>
      </Content>
    </Layout>
  );
}

export default App;
