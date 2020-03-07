export type API_RESPONSE = {
  data: Data[];
  "next-page"?: string;
};

export type Data = {
  system: string;
  gender: "Men" | "Women";
  sizes: {
    [sizeKey: string]: object;
  };
};

export type Datum = {
  size: string;
  [sizeKey: string]: number | string;
};

export type TransformedData = Datum[];

interface RequestPending {
  requestState: "pending";
}
interface RequestError {
  requestState: "error";
  errorCode: number;
}
interface RequestSuccess {
  requestState: "ok";
  data: Data[];
}

interface Payload {
  errorCode?: number;
  data?: Data[];
}

interface RequestFailedAction {
  type: "REQUEST_FAILED";
  payload: Payload;
}

interface RequestSuccessAction {
  type: "REQUEST_SUCCESS";
  payload: Payload;
}

interface RequestPendingAction {
  type: "REQUEST_PENDING";
}

type Action = RequestFailedAction | RequestSuccessAction | RequestPendingAction;

export type Reducer = (state: RequestState, action: Action) => RequestState;
export type RequestState = RequestPending | RequestError | RequestSuccess;

export type TransformDataFn = (
  data: Data
) => {
  sizingSystem: string;
  gender: "Men" | "Women";
  data: TransformedData;
};
