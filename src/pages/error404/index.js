import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import Footer from "../../components/Footer";
export default function Error404() {
  return (
    <div className={"error404"}>
      <h1>Error 404</h1>
      <h2>Page not found</h2>
      <Link to="/">
        <h3>Go back to home</h3>
      </Link>
      <Footer />
    </div>
  );
}
