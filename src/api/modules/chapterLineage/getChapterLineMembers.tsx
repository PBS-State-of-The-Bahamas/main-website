import axiosRequest, { QueryParams } from "@/api/axios";

export default async function getChapterLineMembers(
  chapterAbbreviation: string,
  line_id: string,
  start: string,
  limit: string,
  strapiUrl: string | undefined,
  strapiToken: string | undefined
) {
  const endpoint = "/members";

  const params: QueryParams = {
    "sort[0]": "[line_member][line_number]",
    populate: "*",
    "filters[line_member][line][id][$eq]": line_id,
    "filters[line_member][line][chapter][chapter_abbreviation][$eq]":
      chapterAbbreviation,
    "pagination[start]": start,
    "pagination[limit]": limit,
  };

  try {
    const data = await axiosRequest(strapiUrl, strapiToken).get(endpoint, { params: params });
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
