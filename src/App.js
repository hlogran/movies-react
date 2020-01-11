import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuTop from "./components/MenuTop";

//pages
import Home from "./pages/home";
import MoviesIndex from "./pages/movies-index";
import Search from "./pages/search";
import Error404 from "./pages/error404";
import Movie from "./pages/movie";

function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Router>
        <Header>
          <MenuTop />
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/new-movies" exact={true}>
              <MoviesIndex title={"New Movies"} apiResource="now_playing" />
            </Route>
            <Route path="/popular" exact={true}>
              <MoviesIndex title={"Popular Movies"} apiResource="popular" />
            </Route>
            <Route path="/search" exact={true}>
              <Search />
            </Route>
            <Route path="/movie/:id" exact={true}>
              <Movie />
            </Route>

            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
