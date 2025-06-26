import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(4);

    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: '',
        page: 1,
        limit: 20,
    });

    const loadMoreProducts = () => {
        setVisibleProducts((prevCount) => prevCount + 4);
    };

    if (isLoading) {
        return <div className="text-center py-8">جاري التحميل...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">حدث خطأ أثناء جلب البيانات.</div>;
    }

    return (
        <section className="section__container product__container">
            <h2 className="section__header text-3xl font-bold text-[#CEAE7A] mb-4">
                احدث المنتجات
            </h2>
            <p className="section__subheader text-lg text-gray-900 mb-12" dir='rtl'>
                أصالة تليق بك، بروح عصرية لا تشبه سواك.
            </p>

            <div className="mt-12" dir='rtl'>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.slice(0, visibleProducts).map((product) => (
                        <div key={product._id} className="product__card group relative">
                            {product.oldPrice && (
                                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                    خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                </div>
                            )}
                            <div className="relative">
                                <Link to={`/shop/${product._id}`}>
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={product.image[0]}
                                            alt="product image"
                                            className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/300";
                                                e.target.alt = "Image not found";
                                            }}
                                        />
                                    </div>
                                </Link>
                            </div>

                            <div className="product__card__content text-center mt-4">
                                <h4 className="text-lg font-semibold">{product.name}</h4>
                                <div className="flex justify-center items-center gap-2 mt-2">
                                    <p className="text-[#CEAE7A] font-medium">
                                        {product.price} ر.ع
                                    </p>
                                    {product.oldPrice && (
                                        <p className="text-gray-400 text-sm line-through">
                                            {product.oldPrice} ر.ع
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {visibleProducts < products.length && (
                <div className="text-center mt-8" dir='rtl'>
                    <button
                        onClick={loadMoreProducts}
                        className="bg-[#CEAE7A] hover:bg-yellow-700 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-md"
                    >
                        عرض المزيد
                    </button>
                </div>
            )}
        </section>
    );
};

export default TrendingProducts;