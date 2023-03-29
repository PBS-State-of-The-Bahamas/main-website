import axiosRequest, { QueryParams } from "@/api/axios";

export default async function getStateBoardPageContent() {
  const endpoint = "/state-board";

  try {
    const data = await axiosRequest().get(endpoint);
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
