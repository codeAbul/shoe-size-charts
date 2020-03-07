import { API_RESPONSE } from "../types";

/**
 * Fetches data from the endpoint from the provided role and pagination query
 * @param({page, role})
 * page gives the pagination query token (e.g ?page=${page})
 * role helps in getting relevant auth params from env variables
 * @return {data,nextPage}
 * data - gives the data obtained from the endpoint
 * nextPage -
 * if present, is the pagination token
 * if absent, the callee can stop fetching data
 * */

const fetchData = async ({ page = "", role = "admin" } = {}) => {
  const getRoleDetails = () => {
    // Note that REACT_APP is prefix is necessary for create-react-app to load env variables
    return {
      username: process.env[`REACT_APP_${role.toUpperCase()}_USERNAME`],
      password: process.env[`REACT_APP_${role.toUpperCase()}_PASSWORD`]
    };
  };

  // get username and password for the given role

  const { username, password } = getRoleDetails();

  // Add the page query param if given
  const url =
    page === ""
      ? `${process.env.REACT_APP_API_ENDPOINT}`
      : `${process.env.REACT_APP_API_ENDPOINT}?page=${page}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    }
  });

  // if the call fails throw response so each error can be handled appropriately
  if (!response.ok) throw response;

  const {
    data,
    "next-page": nextPage
  } = (await response.json()) as API_RESPONSE;

  return {
    data,
    nextPage
  };
};

export default fetchData;
