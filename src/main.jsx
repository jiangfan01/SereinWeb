// eslint-disable-next-line no-unused-vars
import React from "react"
import ReactDOM from "react-dom/client"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import "./index.css"

// 路由路径
import Root from "./routers/layout/layout.jsx";
import ErrorPage from "./routers/errors/error-page.jsx";
import CategoriesList from "./routers/categories/index.jsx"
import CategoriesCreate from "./routers/categories/create.jsx"
import CategoriesEdit from "./routers/categories/edit.jsx"
import ArticlesList from "./routers/articles/index.jsx"
import ArticlesCreate from "./routers/articles/create.jsx"
import ArticlesEdit from "./routers/articles/edit.jsx"
import CoursesList from "./routers/courses/index.jsx"
import CoursesCreate from "./routers/courses/create.jsx"
import CoursesEdit from "./routers/courses/edit.jsx"
import ChaptersList from "./routers/chapters/index.jsx"
import ChaptersEdit from "./routers/chapters/edit.jsx"
import ChaptersCreate from "./routers/chapters/create.jsx"

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
            {
                path: "courses/create",
                element: <CoursesCreate/>,
            },
            {
                path: "courses/edit/:id",
                element: <CoursesEdit/>,
            },
            {
                path: "chapters",
                element: <ChaptersList/>,
            },
            {
                path: "chapters/create",
                element: <ChaptersCreate/>,
            },
            {
                path: "chapters/edit/:id",
                element: <ChaptersEdit/>,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} locale={zhCN}/>
)
