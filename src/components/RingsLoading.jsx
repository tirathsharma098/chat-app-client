import { Rings } from "react-loader-spinner";

export default function RingsLoading() {
    return (
        <Rings
            height="80"
            width="80"
            color="#4fa94d"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
        />
    );
}
