import axiosRequest, { QueryParams } from "@/api/axios";

const chapterPageActions = {
  async sendChapterInterestEmail(emailData: any) {
    try {
      const endpoint = "/email"
      return await axiosRequest().post(endpoint, emailData)
    } 
    catch (err: any) {
      // get error list and send to form component
      console.log(err)
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
