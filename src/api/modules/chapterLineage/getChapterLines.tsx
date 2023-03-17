import axiosRequest, { QueryParams } from "@/api/axios";

export default async function getChapterLines(
  chapterAbbreviation: string,
  start: string,
  limit: string,
  strapiUrl: string | undefined,
  strapiToken: string | undefined
) {
  const endpoint = "/lines";
  const params: QueryParams = {
    "populate[0]": "chapter",
    "filters[chapter][chapter_abbreviation][$eq]":
      chapterAbbreviation.toUpperCase(),
    "pagination[start]": start,
    "pagination[limit]": limit,
  };

  try {
    const data = await axiosRequest(strapiUrl, strapiToken).get(endpoint, {
      params: params,
    });
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
