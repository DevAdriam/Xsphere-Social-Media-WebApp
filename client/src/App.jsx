import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./Layout/Main";
import AuthForm from "./Components/AuthForm";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import { UserContextProvider } from "./Context/UserContext";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Main />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: "/posts/:id",
                    element: <DetailPage />,
                },
                {
                    path: "/post-edit/:id",
                    element: <EditPage />,
                },
                {
                    path: "/post-create",
                    element: <CreatePage />,
                },
                {
                    path: "/auth",
                    element: <AuthPage />,
                },
            ],
        },
    ]);

    return (
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    );
};

export default App;
