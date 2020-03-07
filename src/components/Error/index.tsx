import React, { FunctionComponent } from "react";
import styles from "./Error.module.scss";
import Backdrop from "../Backdrop";

// TODO : (ENHANCEMENT) Use custom svg's for different error states

const Error: FunctionComponent<Props> = ({ code }) => {
  const getErrorText = () => {
    switch (code) {
      case 503:
        // TODO: Automatically retry fetching in case of a 503. Show this error only after few failed attempts
        return (
          <p role={"alert"}>
            We are sorry. But looks like the service you are trying to access is
            currently unavailable. Please try again after a while.
          </p>
        );
      case 401:
        return (
          <p role={"alert"}>
            We are sorry. But looks like you don't have the required permissions
            to access this content. Please check your credentials.
          </p>
        );
      default:
        return (
          <p role={"alert"}>
            Oops,something went wrong. Please try again later
          </p>
        );
    }
  };

  return (
    <article className={styles.error}>
      <Backdrop />
      {getErrorText()}
    </article>
  );
};

type Props = {
  code: number;
};

export default Error;
