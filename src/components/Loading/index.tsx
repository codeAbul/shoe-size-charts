import React from "react";
import styles from "./Loading.module.scss";
import Backdrop from "../Backdrop";

// ENHANCEMENT animate the loader
const Loading = () => {
  return (
    <div className={styles.loading}>
      <Backdrop />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
