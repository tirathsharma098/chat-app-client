import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage, { action as loginAction } from "./Login";
import NotFound from "./NotFound";
import RootLayout from "../layouts/Root";
import { checkAuthLoader } from "../utils/auth.js";
import SystemError from "./error/SystemError";
import Logout, { action as logoutAction } from "./Logout";
import Home from "./home/Home";
import Chat from "./chat/Chat";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        action: loginAction,
    },
    {
        path: "/",
        element: <RootLayout />,
        loader: checkAuthLoader,
        errorElement: <SystemError />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/chat',
                element: <Chat/>
            }
        ],
    },
    {
        path: "/logout",
        element: <Logout />,
        action: logoutAction,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const MainPage = () => {
    return <RouterProvider router={router} />;
};

export default MainPage;
