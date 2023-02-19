import axios from "axios";

interface Params {
  [key: string]: string;
}

const axiosRequest = (params?: Params) => {
  let searchParams: URLSearchParams = new URLSearchParams();
  if (params)
    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, value);
    }
  if (typeof window !== "undefined") {
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
  }
};

export default axiosRequest;
