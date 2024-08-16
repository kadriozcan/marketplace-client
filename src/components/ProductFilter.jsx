import React, { useState } from 'react';

const ProductFilter = ({ onFilterChange }) => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCategoryChange = (e) => {
        const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
        setCategories(selectedCategories);
    };


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterSubmit = () => {
        onFilterChange({ categories, searchTerm });
    };

    return (
        <div className="filter">
            <h3>Filter Products</h3>
            <input
                className='search-box'
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <label>
                Category:
                <select multiple value={categories} onChange={handleCategoryChange}>
                    <option value="">Remove Filter</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Sports">Sports</option>
                </select>
            </label>
            <button onClick={handleFilterSubmit}>Apply Filters</button>
        </div>
    );
};

export default ProductFilter;
