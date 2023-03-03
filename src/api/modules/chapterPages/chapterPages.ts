import axiosRequest, { QueryParams } from "@/api/axios";

const chapterPageActions = {
  async getChapterPageByAbbreviation(chapterAbbreviation: string) {
    try {
      const endpoint = "/api/chapter-pages";
      const params: QueryParams = {
        populate: "*",
        "filters[chapter][chapter_abbreviation][$eq]": chapterAbbreviation,
      };
      return await axiosRequest().get(endpoint, { params: params });
    } catch (err: any) {
      console.log(err);
    }
  },

  async getCharterMembers(chapterAbbreviation: string) {
    try {
      const endpoint = "/api/line-members";
      const params: QueryParams = {
        "populate": "*",
        "filters[line][chapter][chapter_abbreviation][$eq]": chapterAbbreviation,
        "filters[line][charter_line][$eq]": "true",
      };
      return await axiosRequest().get(endpoint, { params: params });
    } catch (err: any) {
      console.log(err);
    }
  },
};

export default chapterPageActions;
