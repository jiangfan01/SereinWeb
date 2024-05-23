// eslint-disable-next-line no-unused-vars
import React from "react"
import ReactDOM from "react-dom/client"
import {
    createBrowserRouter, Navigate,
    RouterProvider, useLocation,
} from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import "./index.css"

// 路由路径
import Root from "./routers/layout/layout.jsx";
import Index from "./routers/home/index.jsx";
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
import UsersList from "./routers/user/index.jsx"
import UsersCreate from "./routers/user/create.jsx"
import UsersEdit from "./routers/user/edit.jsx"
import Login from "./routers/auth/login.jsx";
import ShowArticles from "./routers/pages/ShowArticles.jsx";
import SignUp from "./routers/auth/signUp.jsx";
import {ConfigProvider, message} from "antd";
import {getToken} from "../utils/auth.js";
import ShowChapters from "./routers/pages/ShowChapters.jsx";
import {UserProvider} from "./context/UserContext.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * 路由拦截
 *  */
const RequireAuth = ({children}) => {
    const token = getToken();
    // 如果用户未登录，则重定向到登录页面
    if (!token) {
        return <Navigate to="/login"/>;
    }
    return children;
};

const LoginAuth = ({children}) => {
    const token = getToken();
    const location = useLocation();

    // 如果用户已登录，并输入登录网址，定向到首页
    if (token && ['/login', '/signUp'].includes(location.pathname)) {
        return <Navigate to="/"/>;
    }

    return children;
};

const router = createBrowserRouter([

    {
        path: "login",
        element:
            <LoginAuth>
                <Login/>
            </LoginAuth>
    },
    {
        path: "signUp",
        element:
            <LoginAuth>
                <SignUp/>
            </LoginAuth>
    },
    {
        path: "show_article/:id",
        element: <ShowArticles/>,
    },
    {
        path: "show_chapter/:id",
        element: <ShowChapters/>,
    },
    {
        path: "/",
        element:
            <RequireAuth>
                <UserProvider>
                    <Root/>,
                </UserProvider>
            </RequireAuth>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <Index/>},
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
            {
                path: "users",
                element: <UsersList/>,
            },
            {
                path: "users/create",
                element: <UsersCreate/>,
            },
            {
                path: "users/edit/:id",
                element: <UsersEdit/>,
            },
        ]
    },
]);

root.render(
    <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} locale={zhCN}/>
    </ConfigProvider>
)
