import axiosRequest, { QueryParams } from "@/api/axios";

export default async function getLifeMembersPageContent() {
  const endpoint = "/life-member";

  try {
    const data = await axiosRequest().get(endpoint);
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
