import React from 'react';
import {Popconfirm, message, Tooltip} from 'antd';

const DeleteButton = ({onConfirm, props, id}) => {
    const handleConfirm = async () => {
        try {
            const res = await onConfirm(id);
            message.success(res.message);
            await props.init();
        } catch (error) {
            message.error('删除失败');
        }
    };
    return (
        <Popconfirm
            title="删除这条记录"
            description="确认删除？"
            onConfirm={handleConfirm}
            onCancel={() => message.warning('取消删除')}
            okText="确定"
            cancelText="取消"
        >
            <Tooltip title={"删除"}>
                <a>删除</a>
            </Tooltip>
        </Popconfirm>
    );
};

export default DeleteButton;