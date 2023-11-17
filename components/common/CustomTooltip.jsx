import React from "react";
import { Tooltip } from "antd";

const CustomTooltip = ({ title, children }) => {
    return <Tooltip title={title}>{children}</Tooltip>;
};

export default CustomTooltip;