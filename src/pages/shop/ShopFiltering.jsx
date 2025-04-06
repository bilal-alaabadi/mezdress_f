import React from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    const sizes = ['9.5', '9.75', '10', '10.25', '10.5', '10.75', '11', '11.25', '11.5', '11.75'];
    
    const massarTypes = {
        smallPattern: {
            label: 'مصار بالنقشة الصغيرة',
            value: 'صغيرة',
            subTypes: [
                { label: 'مصار باشمينا', value: 'مصار باشمينا صغيرة' },
                { label: 'مصار سوبر تورمة', value: 'مصار سوبر تورمة صغيرة' },
                { label: 'مصار نص تورمة', value: 'مصار نص تورمة صغيرة' }
            ]
        },
        largePattern: {
            label: 'مصار بالنقشة الكبيرة',
            value: 'كبيرة',
            subTypes: [
                { label: 'مصار باشمينا', value: 'مصار باشمينا كبيرة' },
                { label: 'مصار سوبر تورمة', value: 'مصار سوبر تورمة كبيرة' },
                { label: 'مصار نص تورمة', value: 'مصار نص تورمة كبيرة' }
            ]
        }
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setFiltersState({
            ...filtersState,
            category: newCategory,
            massarPatternType: '',
            massarSubType: '',
            size: newCategory === 'كمه' ? filtersState.size : ''
        });
    };

    const handleSizeChange = (e) => {
        setFiltersState({
            ...filtersState,
            size: e.target.value
        });
    };

    const handleMassarPatternChange = (patternType) => {
        setFiltersState({
            ...filtersState,
            massarPatternType: patternType,
            massarSubType: patternType === 'صغيرة' ? 'مصار بالنقشة الصغيرة' : 'مصار بالنقشة الكبيرة'
        });
    };

    const handleMassarSubTypeChange = (subType) => {
        setFiltersState({
            ...filtersState,
            massarSubType: subType,
            massarPatternType: subType.includes('صغيرة') ? 'صغيرة' : 'كبيرة'
        });
    };

    const handleClearFilters = () => {
        setFiltersState({
            category: 'الكل',
            massarPatternType: '',
            massarSubType: '',
            size: ''
        });
    };

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
                            onChange={handleCategoryChange}
                            className="mr-2"
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>

            {/* خيارات المصار */}
            {filtersState.category === 'مصار' && (
                <div className="space-y-4">
                    <div>
                        <h4 className='font-medium text-lg'>نوع النقشة</h4>
                        <hr />
                        <div className="grid grid-cols-1 gap-2 mt-2">
                            {Object.values(massarTypes).map(({ label, value }) => (
                                <label key={value} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="massarPattern"
                                        checked={filtersState.massarPatternType === value}
                                        onChange={() => handleMassarPatternChange(value)}
                                        className="mr-2"
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {filtersState.massarPatternType && (
                        <div>
                            <h4 className='font-medium text-lg'>النوع الفرعي</h4>
                            <hr />
                            <div className="grid grid-cols-1 gap-2 mt-2">
                                {massarTypes[
                                    filtersState.massarPatternType === 'صغيرة' ? 'smallPattern' : 'largePattern'
                                ].subTypes.map((subType) => (
                                    <label key={subType.value} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="massarSubType"
                                            checked={filtersState.massarSubType === subType.value}
                                            onChange={() => handleMassarSubTypeChange(subType.value)}
                                            className="mr-2"
                                        />
                                        <span>{subType.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* المقاسات (تظهر فقط عند اختيار فئة كمه) */}
            {filtersState.category === 'كمه' && (
                <div className='flex flex-col space-y-2'>
                    <h4 className='font-medium text-lg'>المقاسات</h4>
                    <hr />
                    <div className="grid grid-cols-2 gap-2">
                        {sizes.map((size) => (
                            <label key={size} className='cursor-pointer flex items-center'>
                                <input
                                    type="radio"
                                    name="productSize"
                                    value={size}
                                    checked={filtersState.size === size}
                                    onChange={handleSizeChange}
                                    className="mr-2"
                                />
                                <span>{size}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* مسح الفلاتر */}
            <div className="mt-4">
                <button
                    onClick={handleClearFilters}
                    className='bg-primary py-2 px-4 text-white rounded hover:bg-primary-dark transition duration-300'
                >
                    مسح الفلاتر
                </button>
            </div>
        </div>
    );
};

export default ShopFiltering;