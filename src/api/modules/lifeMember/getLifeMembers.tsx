import axiosRequest, { QueryParams } from "@/api/axios";

export default async function getLifeMembers() {
  const endpoint = "/members";
  const params: QueryParams = {
    "filters[life_member][$eq]": "true",
    populate: "*",
  };

  try {
    const data = await axiosRequest().get(endpoint, { params: params });
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
