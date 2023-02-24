import axios from "axios";

export interface QueryParams {
  [key: string]: string;
}

const axiosRequest = (params?: QueryParams) => {
  let searchParams: URLSearchParams = new URLSearchParams();
  if (params)
    for (const [key, value] of Object.entries(params)) {
      if (key && value) searchParams.append(key, value);
    }
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      withCredentials: true,
      params: searchParams,
    });
    return instance;
};

export default axiosRequest;
