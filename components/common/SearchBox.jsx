import React, {useState} from 'react';
import {Input, Button} from 'antd';

const {Search} = Input;

const SearchBox = ({onChange, loading}) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        onChange(searchText);
    };

    return (
        <div style={{marginBottom: 16, width: 300}}>
            <Search
                placeholder="输入搜索内容"
                loading={loading}
                onSearch={handleSearch}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
    );
};

export default SearchBox;