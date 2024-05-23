import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {message} from "antd";
import 'react-markdown-editor-lite/lib/index.css';
import hljs from "highlight.js";
import 'highlight.js/styles/github.css'
import {fetchChapter} from "../../api/pages.js";

const App = (props) => {
    const [chapter, setChapter] = useState({})
    const [contentHtml, setContentHtml] = useState("")
    const [title, setTitle] = useState("")
    const ChapterId = useParams()
    const init = async () => {
        const res = await fetchChapter(ChapterId.id)
        setChapter(res.data.chapter)
        setContentHtml(res.data.chapter.contentHtml)
        setTitle(res.data.chapter.title)
        if (res.code !== 200) {
            return message.error(res.message)
        }
    }

    useEffect(() => {
        init().then();
    }, []);

    useEffect(() => {
        document.querySelectorAll('pre code').forEach((el) => {
            hljs.highlightElement(el)
        })
    }, [chapter])


    return (
        <>
            <div className="container" style={{marginBottom: 50}}>
                <div className='title'>{title}</div>
                <div dangerouslySetInnerHTML={{__html: contentHtml}} className='custom-html-style'></div>
            </div>
        </>
    )
}
export default App