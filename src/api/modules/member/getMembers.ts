import axiosRequest, { QueryParams } from "@/api/axios";

export default async function getMembers(memberNames: string[]) {
  const endpoint = "/members";
  let params: QueryParams = {
    "populate": "*",
  };

  params = appendMemberFilters(params,memberNames)

  try {
    const data = await axiosRequest().get(endpoint, { params: params });
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

function appendMemberFilters(params: QueryParams, memberNames: string[]): QueryParams {
    memberNames.map((memberName, index) => {
        params[`filters[name][$in][${index}]`] = memberName
    })
    return params
}