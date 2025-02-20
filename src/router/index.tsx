import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../containers/homePage";
import ChatPage from "../containers/chatPage";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/chat",
                element: <ChatPage />
            }
        ]
    }
]);


