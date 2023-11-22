import React from 'react';
import {Pagination as AntPagination} from 'antd';

const Pagination = ({total, onChange}) => {
    return (
        <AntPagination
            style={{
                position: "absolute",
                bottom: 20,
                right: 50
            }}
            showSizeChanger
            showQuickJumper
            defaultCurrent={1}
            pageSizeOptions={[1, 10, 20, 30, 40]}
            defaultPageSize={10}
            total={total}
            onChange={onChange}
            locale={{
                items_per_page: '条/页',
                jump_to: '跳至',
                jump_to_confirm: '确定',
                page: '页',
            }}
        />
    );
};

export default Pagination;