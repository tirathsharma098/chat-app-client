import { getAuthToken } from "../utils/auth";

export default function useHeaders () {
    const headers =  {
        headers: {
            "Content-Type": "application/json",
            Authorization: getAuthToken(),
        }
    }
    return headers;
}