import { useRouteError } from "react-router-dom";
import { CloseCircleOutlined} from "@ant-design/icons";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <CloseCircleOutlined className='error-icon'/>
            <h1>天啊</h1>
            <p>出现意料之外的错误</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
