import React, {useState} from 'react';
import {Input, Button} from 'antd';
import {debounce} from "lodash/function.js";

const {Search} = Input;

const SearchBox = ({onChange, loading}) => {
    const [searchText, setSearchText] = useState('');

    // 节流以防接口调用次数过多
    const debouncedSearch = debounce(() => {
        onChange(searchText);
    }, 300);
    const handleSearch = () => {
        debouncedSearch()
    };


    return (
        <div style={{marginBottom: 16, width: 300}}>
            <Search
                placeholder="输入搜索内容"
                loading={loading}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={handleSearch}
            />
        </div>
    );
};

export default SearchBox;