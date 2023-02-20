import axios from "axios";

export interface QueryParams {
  [key: string]: string;
}

/* 
    axios use

    const endpoint = "/endpoint"
    ***pass query params in an object as name:value pairs
    await axiosRequest({populate: "*", sort: "asc"}).get(endpoint) 
      .catch((err: any) => handle error)

    The request url will look like this: 
    
            GET:http://baseurl.com/endpoint?populate=*&sort=asc

    api module folder structure: 

        api /
            axios.ts
            modules/
                    chapterPages.ts  *routing for chapter page data
                    chapterLines.ts  *routing for chapter line data
                    chapter.ts       *routing for chapter data

*/

const axiosRequest = (params?: QueryParams) => {
  let searchParams: URLSearchParams = new URLSearchParams();
  if (params)
    for (const [key, value] of Object.entries(params)) {
      if (key && value) searchParams.append(key, value);
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
