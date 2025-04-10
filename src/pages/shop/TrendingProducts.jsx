import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(4);

    // جلب البيانات من الخادم
    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: 1,
        limit: 20, // يمكن تغيير الحد الأقصى حسب الحاجة
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
        <section className="section__container product__container" >
            <h2 className="section__header text-3xl font-bold text-[#CEAE7A] mb-4">
                احدث المنتجات
            </h2>
            <p className="section__subheader text-lg text-gray-900 mb-12" dir='rtl'>
                اكتشف أحدث الصيحات: رفع مستوى أناقتك مع مجموعتنا المختارة من منتجات موضة الرجاليه الرائجة.
            </p>

            {/* Product Cards */}
            <div className="mt-12" dir='rtl'>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.slice(0, visibleProducts).map((product) => (
                        <div key={product._id} className="product__card">
                            <div className="relative">
                                <Link to={`/shop/${product._id}`}>
                                    <div className="aspect-square overflow-hidden"> {/* تحديد نسبة العرض إلى الارتفاع */}
                                        <img
                                            src={product.image[0]} // عرض الصورة الأولى من المصفوفة
                                            alt="product image"
                                            className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/300"; // صورة بديلة في حالة الخطأ
                                                e.target.alt = "Image not found";
                                            }}
                                        />
                                    </div>
                                </Link>
                            </div>

                            {/* Product Description */}
                            <div className="product__card__content text-center mt-4">
                                <h4 className="text-lg font-semibold">{product.name}</h4>
                                <p className="text-[#CEAE7A] mt-2">
                                    {product.price}.ر.ع
                                    {product.oldPrice && (
                                        <s className="text-gray-500 ml-2">ر.ع{product.oldPrice}ر.ع</s>
                                    )}
                                </p>
                                {/* <RatingStars rating={product.rating} /> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Load More Products Button */}
            <div className="text-center mt-8" dir='rtl'>
  {visibleProducts < products.length && (
    <button
      onClick={loadMoreProducts}
      className="bg-[#CEAE7A] hover:bg-yellow-700 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-md"
    >
      عرض المزيد
    </button>
  )}
</div>
        </section>
    );
};

export default TrendingProducts;