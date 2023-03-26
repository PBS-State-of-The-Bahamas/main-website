import axios from "axios";

export interface QueryParams {
  [key: string]: string;
}
const axiosRequest = (url?: string, bearerToken?: string) => {
  let searchParams: URLSearchParams = new URLSearchParams();

  const instance = axios.create({
    baseURL: typeof url !== "undefined" ? url : process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${
        typeof bearerToken !== "undefined"
          ? bearerToken
          : process.env.NEXT_PUBLIC_TOKEN
      }`,
    },
    withCredentials: true,
    params: searchParams,
  });
  return instance;
};

export default axiosRequest;
