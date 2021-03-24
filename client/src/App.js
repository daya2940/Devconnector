import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
const App = () => {
  return (
    <div className="App">
      <Fragment>
        <Navbar />
        <Landing />
      </Fragment>
    </div>
  );
};

export default App;
