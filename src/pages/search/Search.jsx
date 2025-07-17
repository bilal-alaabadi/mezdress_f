import React, { useState } from 'react';
import { useSearchProductsQuery } from '../../redux/features/products/productsApi';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: products, isLoading, error } = useSearchProductsQuery(searchQuery, {
        skip: searchQuery.length < 2
    });

    return (
        <div className="container mx-auto px-4 py-8" dir="rtl">
            {/* Search Header */}
            <section className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">البحث عن المنتجات</h2>
                <p className="text-gray-600">تصفح مجموعة متنوعة من الفساتين والإكسسوارات لتحديث إطلالتك</p>
            </section>

            {/* Search Bar */}
            <section className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="ابحث عن منتجات..."
                    />
                </div>
            </section>

            {/* Results Section */}
            <section>
                {isLoading ? (
                    <div className="text-center py-12">جاري التحميل...</div>
                ) : error ? (
                    <div className="text-center py-12 text-red-500">حدث خطأ أثناء جلب المنتجات</div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {products?.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصورة</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التفاصيل</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src={product.image?.[0] || '/placeholder.jpg'}
                                                    alt={product.name}
                                                    className="h-16 w-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {product.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.price} ر.س
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <Link
                                                    to={`/Shop/${product._id}`} // تم التعديل هنا ليتوافق مع مسارك
                                                    className="text-primary hover:text-primary-dark"
                                                >
                                                    عرض التفاصيل
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                {searchQuery.length > 1 ? 'لا توجد نتائج للبحث' : 'اكتب كلمة البحث (حرفين على الأقل)'}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Search;