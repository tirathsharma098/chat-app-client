import { getAuthToken } from "../../utils/auth";

export const commonHeader = {
    Authorization: getAuthToken(),
}