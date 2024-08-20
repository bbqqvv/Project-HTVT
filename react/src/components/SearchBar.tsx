import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={onSearchChange}
            className="border p-2 mb-4 w-full"
        />
    );
};

export default SearchBar;
