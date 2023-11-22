// import {useEffect, useState} from "react";
// // import {fetchArticle} from "../../api/pages.js";
// import {useParams} from "react-router-dom";
// import {message} from "antd";
// import 'react-markdown-editor-lite/lib/index.css';
// // import hljs from "highlight.js";
// import 'highlight.js/styles/github.css'
//
// const App = () => {
//     const [article, setArticle] = useState({})
//     const [contentHtml, setContentHtml] = useState("")
//     const [title, setTitle] = useState("")
//     const ArticleId = useParams()
//     const init = async () => {
//         const res = await fetchArticle(ArticleId.id)
//         setArticle(res.data.article)
//         setContentHtml(res.data.article.contentHtml)
//         setTitle(res.data.article.title)
//         if (res.code !== 20000) {
//             return message.error(res.message)
//         }
//     }
//
//     useEffect(() => {
//         init().then();
//     }, []);
//
//     useEffect(() => {
//         document.querySelectorAll('pre code').forEach((el) => {
//             hljs.highlightElement(el)
//         })
//     }, [article])
//
//
//     return (
//         <>
//             <div className="container" style={{marginBottom: 50}}>
//                 <div className='title'>{title}</div>
//                 <div dangerouslySetInnerHTML={{__html: contentHtml}} className='custom-html-style'></div>
//             </div>
//         </>
//     )
// }
// export default App