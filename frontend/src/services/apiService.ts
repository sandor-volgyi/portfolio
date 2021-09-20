import { history } from "../App";

type method = "GET" | "POST" | "PUT" | "DELETE";
type URI = `/${string}`;
const token: string = localStorage.getItem("token") || "";
interface apInterface {
  URI: URI;
  method: method;
  body?: object;
  isAuthorized: boolean;
}

export type ApiError = {
  message: string;
  status: "error";
};

export interface apiServiceOutput {
  response: Response;
  parsedBody: object;
}

export const get = (
  URI: URI,
  isAuthorized = true
): Promise<apiServiceOutput> => {
  return apiCall({ URI, method: "GET", isAuthorized });
};

export const post = (
  URI: URI,
  body: object,
  isAuthorized = true
): Promise<apiServiceOutput> => {
  return apiCall({ URI, method: "POST", body, isAuthorized });
};

export const put = (
  URI: URI,
  body: object,
  isAuthorized = true
): Promise<apiServiceOutput> => {
  return apiCall({ URI, method: "PUT", body, isAuthorized });
};

export const del = (
  URI: URI,
  body: object,
  isAuthorized = true
): Promise<apiServiceOutput> => {
  return apiCall({ URI, method: "DELETE", body, isAuthorized });
};

async function apiCall(props: apInterface): Promise<apiServiceOutput> {
  const fetchURL = process.env.REACT_APP_BACKEND_BASEURL + props.URI;
  const fetchHeaders = new Headers();
  fetchHeaders.append("Content-Type", "application/json");
  fetchHeaders.append("Accept", "application/json");
  if (props.isAuthorized) {
    fetchHeaders.append("Authorization", `Bearer: ${token}`);
  }

  const fetchParams: RequestInit = {
    method: props.method,
    headers: fetchHeaders,
  };
  if (props.body) {
    fetchParams.body = JSON.stringify(props.body);
  }

  const response = await fetch(fetchURL, { ...fetchParams });

  const body = await response.json();

  if (response.status === 401) {
    localStorage.removeItem("token");
    setTimeout(() => history.push("/login"), 5000);
    return Promise.reject(body.message);
  }

  const data: apiServiceOutput = {
    response: response,
    parsedBody: body,
  };

  return data;
}
