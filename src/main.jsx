// eslint-disable-next-line no-unused-vars
import React from "react"
import ReactDOM from "react-dom/client"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import "./index.css"

// 路由路劲
import Root from "./routers/layout/layout.jsx";
import ErrorPage from "./routers/errors/error-page.jsx";
import CategoriesList from "./routers/categories/index.jsx"
import CategoriesCreate from "./routers/categories/create.jsx"
import CategoriesEdit from "./routers/categories/edit.jsx"
import ArticlesList from "./routers/articles/index.jsx"
import ArticlesCreate from "./routers/articles/create.jsx"
import ArticlesEdit from "./routers/articles/edit.jsx"
import CoursesList from "./routers/courses/index.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "categories",
                element: <CategoriesList/>,
            },
            {
                path: "categories/create",
                element: <CategoriesCreate/>,
            },
            {
                path: "categories/edit/:id",
                element: <CategoriesEdit/>,
            },
            {
                path: "articles",
                element: <ArticlesList/>,
            },
            {
                path: "articles/create",
                element: <ArticlesCreate/>,
            },
            {
                path: "articles/edit/:id",
                element: <ArticlesEdit/>,
            },
            {
                path: "courses",
                element: <CoursesList/>,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} locale={zhCN}/>
)
