import axiosRequest, { QueryParams } from "@/api/axios";

const chapterPageActions = {
  async sendChapterInterestEmail(emailData: any) {
    try {
      const endpoint = "/email";
      const res = await axiosRequest().post(endpoint, emailData);
      return [res.data, null];
    } catch (err: any) {
      let errs: string[] = [];
      if (err.response.data.error.details.errors.length) {
        errs = [...err.response.data.error.details.errors];
        return [null, errs];
      }
      errs.push("Cannot send email. Please try again later.")
      return [null, errs];
    }
  },

  async getChapterPageByAbbreviation(chapterAbbreviation: string) {
    try {
      const endpoint = "/chapter-pages";
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
      const endpoint = "/line-members";
      const params: QueryParams = {
        "populate[member][populate][0]": "photo",
        "filters[line][chapter][chapter_abbreviation][$eq]":
          chapterAbbreviation,
        "filters[line][charter_line][$eq]": "true",
      };
      return await axiosRequest().get(endpoint, { params: params });
    } catch (err: any) {
      console.log(err);
    }
  },
};

export default chapterPageActions;
