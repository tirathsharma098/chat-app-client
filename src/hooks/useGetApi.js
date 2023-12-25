import { useEffect, useState } from "react";
import { API } from "../config/api/api.config";
import axios from "axios";
import { AXIOS_ERROR_CODE } from "../utils/constants";
import { toast } from "react-toastify";
import useHeaders from "./useHeaders";
const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
};
export default function useGetApi(api, queryString = {}) {
    const [isFetching, setIsFetching] = useState(false);
    const [response, setResponse] = useState(null);
    const headers = useHeaders();
    useEffect(() => {
        async function getData() {
            try {
                setIsFetching(true);
                // await new Promise((resolve) => setTimeout(resolve, 4000));
                const response = await axios({
                    url: API.endpoint + api,
                    params: {
                        ...queryString,
                    },
                    ...headers,
                });
                if (response.data?.success === false) {
                    toast.error(response.data.message, toastOptions);
                } else if (response.data?.success === true) {
                    setResponse(response.data.data);
                } else throw new Error("Something went wrong");
                setIsFetching(false);
            } catch (err) {
                console.log("ERROR occurred while fetching data");
                setIsFetching(false);
                if (err?.code === AXIOS_ERROR_CODE.ERR_NETWORK)
                    toast.error(err?.message, toastOptions);
                    toast.error("Something went wrong", toastOptions);
            }
        }
        getData();
    }, []);
    return {
        response,
        isFetching,
    };
}
