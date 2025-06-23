import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShopFiltering = ({ categories, genderTypes, filtersState, setFiltersState, clearFilters }) => {
  const navigate = useNavigate();
  const showGenderFilter = filtersState.category === 'نظارات' || filtersState.category === 'ساعات';

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filtersState,
      [name]: value
    };
    
    // إعادة تعيين فلتر النوع عند تغيير الفئة
    if (name === 'category') {
      newFilters.gender = 'الكل';
    }
    
    setFiltersState(newFilters);
    
    // تحديث URL مع معايير الفلترة
    const params = new URLSearchParams();
    if (newFilters.category !== 'الكل') params.set('category', newFilters.category);
    if (showGenderFilter && newFilters.gender !== 'الكل') params.set('gender', newFilters.gender);
    
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleClearFilters = () => {
    clearFilters();
    navigate('', { replace: true });
  };

  return (
    <div className='space-y-5 flex-shrink-0 w-64'>
        {/* الفئات */}
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium'>الفئة</h4>
            <hr />
            <div className='space-y-2'>
                {categories.map((cat) => (
                    <label key={cat.value} className='flex items-center cursor-pointer'>
                        <input 
                            type="radio" 
                            name="category" 
                            value={cat.value} 
                            checked={filtersState.category === cat.value}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className='mr-2'
                        />
                        <span>{cat.label}</span>
                    </label>
                ))}
            </div>
        </div>

        {/* النوع (عند اختيار نظارات أو ساعات) */}
        {showGenderFilter && (
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium'>النوع</h4>
                <hr />
                <div className='space-y-2'>
                    {genderTypes.map((type) => (
                        <label key={type.value} className='flex items-center cursor-pointer'>
                            <input 
                                type="radio" 
                                name="gender" 
                                value={type.value} 
                                checked={filtersState.gender === type.value}
                                onChange={(e) => handleFilterChange('gender', e.target.value)}
                                className='mr-2'
                            />
                            <span>{type.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        )}

        <div className='mt-4'>
            <h3 className='font-medium text-lg'>الفلاتر</h3>
            <button 
                onClick={handleClearFilters}
                className='bg-[#CEAE7A] py-2 px-4 text-white rounded hover:bg-black transition duration-300'
            >
                مسح الفلاتر
            </button>
        </div>
    </div>
  );
};

export default ShopFiltering;