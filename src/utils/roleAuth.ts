/**
 * Define and load Authentication information,
 * to be used while accessing the API endpoint,
 * based on the role of the user
 * valid roles are "admin","manager","store"
 */

const roleAuth = {
  admin: {
    username: process.env.REACT_APP_ADMIN_USERNAME,
    password: process.env.REACT_APP_ADMIN_PASSWORD
  },
  manager: {
    username: process.env.REACT_APP_MANAGER_USERNAME,
    password: process.env.REACT_APP_MANAGER_PASSWORD
  },
  store: {
    username: process.env.REACT_APP_STORE_USERNAME,
    password: process.env.REACT_APP_STORE_PASSWORD
  }
};

export default roleAuth;
