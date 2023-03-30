import axiosRequest, { QueryParams } from "@/api/axios";

export default async function getStateBoardMembers(chapter: string) {
  const endpoint = "/e-boards";
  const params: QueryParams = {
    "filters[chapter][chapter_abbreviation][$eq]": chapter.toUpperCase(),
    "populate[0]": "member",
    "populate[1]": "member.photo",
  };

  try {
    const data = await axiosRequest().get(endpoint, { params: params });
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
