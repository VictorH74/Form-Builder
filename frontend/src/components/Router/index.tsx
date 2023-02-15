import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Authenticate from "@/pages/Authenticate";
import FormList from "@/pages/FormList";
import Home from "@/pages/Home";
import AddForm from "@/pages/FormList/components/AddForm";
import LoggedLayout from "../Layout";
import Themes from "@/pages/Themes";
import About from "@/pages/About";
import RetrievedForm from "@/pages/RetrievedForm";


const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                element: <LoggedLayout />,
                children: [
                    {
                        path: "",
                        element: <Home />,
                    },
                    {
                        path: "themes",
                        element: <Themes />,
                    },
                    {
                        path: "about",
                        element: <About />,
                    },
                    {
                        path: "my-forms/",
                        children: [
                            {
                                path: "",
                                element: <FormList />
                            },
                            {
                                path: ":formId",
                                element: <RetrievedForm />
                            },
                            {
                                path: "add",
                                element: <AddForm />
                            },
                        ]
                    },
                ]
            },
            {
                path: "authentication",
                element: <Authenticate />,
            },
        ]
        // errorElement: <ErrorPage />,
    },

]);

const Router: React.FC<{}> = () => (<RouterProvider router={router} />)

export default Router