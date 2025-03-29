import React from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    return (
        <div className='space-y-5 flex-shrink-0'>
            <h3 className='text-xl font-semibold'>الفلاتر</h3>

            {/* الفئات */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg'>الفئة</h4>
                <hr />
                {filters.categories.map((category) => (
                    <label key={category} className='capitalize cursor-pointer flex items-center'>
                        <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={filtersState.category === category}
                            onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
                            className="mr-2"
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>

            {/* مسح الفلاتر */}
            <div className="mt-4">
                <button
                    onClick={clearFilters}
                    className='bg-primary py-2 px-4 text-white rounded hover:bg-primary-dark transition duration-300'
                >
                    مسح الفلاتر
                </button>
            </div>
        </div>
    );
};

export default ShopFiltering;
