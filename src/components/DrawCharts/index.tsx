import React, { FunctionComponent, useEffect, useReducer } from "react";
import { fetch, transformData } from "../../utils";
import { RequestState, Reducer, Data, TransformDataFn } from "../../types";
import Error from "../../components/Error";
import StackedBarChart from "../StackedBarChart";
import Loading from "../Loading";
import { act } from "react-dom/test-utils";

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_FAILED":
      return {
        requestState: "error",
        errorCode: action.payload.errorCode as number
      };

    case "REQUEST_SUCCESS":
      return {
        requestState: "ok",
        data: action.payload.data as Data[]
      };

    case "REQUEST_PENDING":
      return {
        requestState: "pending"
      };
  }
};

const DrawCharts: FunctionComponent<Props> = ({ role }) => {
  const [state, dispatch] = useReducer(reducer, {
    requestState: "pending"
  } as RequestState);

  const fetchData = async () => {
    try {
      let { data, nextPage: page } = await fetch({ role });
      let nextPageExists = Boolean(page);
      while (nextPageExists) {
        const { data: latestData, nextPage } = await fetch({
          page,
          role
        });
        data = [...data, ...latestData];
        nextPageExists = Boolean(nextPage);
        page = nextPage;
      }
      dispatch({
        type: "REQUEST_SUCCESS",
        payload: {
          data
        }
      });
    } catch (e) {
      dispatch({
        type: "REQUEST_FAILED",
        payload: { errorCode: e.status }
      });
    }
  };

  // Re fetch data every time role changes
  useEffect(() => {
    dispatch({
      type: "REQUEST_PENDING"
    });
    document.title = `Shoe size charts - ${role}`;
    fetchData();
  }, [role]);

  if (state.requestState === "error") {
    return <Error code={state.errorCode} />;
  }

  if (state.requestState === "ok") {
    console.log(state.data);
    const transformedData = state.data.map(transformData) as ReturnType<
      TransformDataFn
    >[];

    return (
      <main>
        {transformedData.map(({ sizingSystem, gender, data }) => (
          <StackedBarChart
            sizingSystem={sizingSystem}
            gender={gender}
            data={data}
          />
        ))}
      </main>
    );
  }

  return <Loading />;
};

type Props = {
  role: string;
};

export default DrawCharts;
