import React from "react";
import { Tooltip } from "antd";

const CustomTooltip = ({ title, children }) => {
    return title ? <Tooltip title={title}>{children}</Tooltip> : "无";
};

export default CustomTooltip;