import { NavLink } from "react-router-dom";
import React from "react";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  // ENAHANCEMENT: Refetch data on clicking the navigation link
  // if the current request state is error
  return (
    <header className={styles.header}>
      <h1>Shoe sizes Charts</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"} exact>Admin</NavLink>
          </li>
          <li>
            <NavLink to={"/manager"}>Manager</NavLink>
          </li>
          <li>
            <NavLink to={"/store"}>Store</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
