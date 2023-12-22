import { commonHeader } from "./common-header";

export const getApiHeader = {
    headers: {
        "Content-Type": "application/json",
    ...commonHeader
    }
}