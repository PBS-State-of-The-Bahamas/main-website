import axiosRequest, { QueryParams }  from "@/api/axios";

export default async function getHistory()
 {const endpoint = "/history";

	try {
		const data= await axiosRequest().get(endpoint);
		return [data, null];
	} catch (error) {
		return [null, error];
	} 
}