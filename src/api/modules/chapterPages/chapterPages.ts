import axiosRequest, { QueryParams } from "@/api/axios";

const chapterPageActions = {
  async getChapterPageByAbbreviation(chapterAbbreviation: string) {
    const endpoint = "/chapter-pages";
    const params: QueryParams = {
      populate: "*",
      "filters[chapter][chapter_abbreviation][$eq]": chapterAbbreviation?.toUpperCase(),
    };
    return await axiosRequest(params)
      .get(endpoint)
      .catch((err: any) => null);
  },
};

export default chapterPageActions;
