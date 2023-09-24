import axiosRequest from "@/api/axios";

export default async function getChapterAbbrExcludingState() {
  const endpoint = "/chapters";
  try {
    const chapters = []
    const data = await axiosRequest().get(endpoint);
    for (let i in data.data) {
      if (data.data[i].attributes.chapter_abbreviation == "STATE") continue;
      chapters.push({
        name: data.data[i].attributes.name,
        abbreviation: data.data[i].attributes.chapter_abbreviation
      })
    }
    return [chapters, null];
  } catch (error) {
    return [null, error];
  }
}
