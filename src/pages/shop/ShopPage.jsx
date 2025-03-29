import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // استيراد useSearchParams
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
    categories: ['الكل', 'مصار', 'كمه', 'نظارات', 'ساعات', 'أقمشة', 'خواتم', 'عطور', 'أحذية', 'بوكسات الهدايا', 'عصي', 'محافظ'],
};

const ShopPage = () => {
    const [searchParams] = useSearchParams(); // قراءة معاملات الرابط
    const [filtersState, setFiltersState] = useState({
        category: 'الكل',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);
    const [showFilters, setShowFilters] = useState(false);

    // تحديث الفلتر عند تغيير معامل الرابط
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam && filters.categories.includes(categoryParam)) {
            setFiltersState({ category: categoryParam });
            setCurrentPage(1); // إعادة التعيين لصفحة 1 عند تغيير الفئة
        }
    }, [searchParams]);

    const { category } = filtersState;

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'الكل' ? category : '',
        page: currentPage,
        limit: ProductsPerPage,
    });

    const clearFilters = () => {
        setFiltersState({ category: 'الكل' });
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (isLoading) return <div>Loading....</div>;
    if (error) return <div>Error loading products.</div>;

    const startProduct = (currentPage - 1) * ProductsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    return (
        <>
            <section className='section__container bg-[#eff6ff]'>
                <h2 className='section__header capitalize'>صفحة المتجر</h2>
                <p className='section__subheader'>
                    اكتشف أحدث الاختيارات: رفع مستوى أناقتك مع مجموعتنا المختارة من منتجات الموضة الرجالية الأكثر رواجًا.
                </p>
            </section>

            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className='md:hidden bg-primary py-1 px-4 text-white rounded mb-4'
                    >
                        {showFilters ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}
                    </button>

                    <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
                        <ShopFiltering
                            filters={filters}
                            filtersState={filtersState}
                            setFiltersState={setFiltersState}
                            clearFilters={clearFilters}
                        />
                    </div>

                    <div className='flex-1'>
                        <h3 className='text-xl font-medium mb-4'>
                            عرض المنتجات من {startProduct} إلى {endProduct} من أصل {totalProducts} منتج
                        </h3>
                        <ProductCards products={products} />

                        <div className='mt-6 flex justify-center'>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
                            >
                                سابق
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'
                            >
                                التالي
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopPage;