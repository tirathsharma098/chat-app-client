import { useEffect, useState } from "react";
import { API } from "../config/api/api.config";
import axios from "axios";
import { getApiHeader } from "../config/headers/get-api-header";
import { AXIOS_ERROR_CODE } from "../utils/constants";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
};
export default function useListApi(api, queryString = {}) {
    const [isFetching, setIsFetching] = useState(false);
    const [response, setResponse] = useState(null);
    const [listDetail, setListDetail] = useState({
        currentPage: 1,
        totalPage: 1,
        take: 10,
        skip: 0
    })
    useEffect(() => {
        async function getData() {
            try {
                setIsFetching(true);
                // await new Promise((resolve) => setTimeout(resolve, 4000));
                const response = await axios({
                    url: API.endpoint + api,
                    params: {
                        ...queryString,
                        listDetail
                    },
                    ...getApiHeader,
                });
                if (response.status === 401) {
                    localStorage.clear();
                    toast.error(response.data.message, toastOptions);
                    return redirect("/login");
                } else if (response.data?.success === false) {
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
            }
        }
        getData();
    }, []);
    return {
        response,
        isFetching,
        setListDetail
    };
}
