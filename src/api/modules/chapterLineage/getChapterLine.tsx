import axiosRequest, { QueryParams } from "@/api/axios";

export default async function getChapterLine(
  chapterAbbreviation: string,
  lineID: string
) {
  const endpoint = "/lines";
  const params: QueryParams = {
    "populate[0]": "chapter",
    "filters[chapter][chapter_abbreviation][$eq]":
      chapterAbbreviation.toUpperCase(),
    "filters[id][$eq]": lineID,
  };
  try {
    const data = await axiosRequest().get(endpoint, { params: params });
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
