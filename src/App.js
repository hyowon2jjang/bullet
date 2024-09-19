// src/App.js
import React from "react";
import Game from "./components/Game";
import styles from "./App.css";

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Dodge the Bullets!</h1>
      <div className={styles["GameBox"]}>
        <Game />
      </div>
    </div>
  );
};

export default App;
