import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/ReviewsCard';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, error, isLoading } = useFetchProductByIdQuery(id);
    const { user } = useSelector((state) => state.auth);

    const singleProduct = data?.product || {};
    const productReviews = data?.reviews || [];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToCart = (product) => {
        if (!user) {
            navigate('/login');
            return;
        }
        dispatch(addToCart(product));
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === singleProduct.image.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? singleProduct.image.length - 1 : prevIndex - 1
        );
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
    
    if (error) return (
        <div className="section__container text-center py-20">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
                <strong className="font-bold">خطأ!</strong>
                <span className="block sm:inline"> حدث خطأ أثناء تحميل تفاصيل المنتج.</span>
            </div>
        </div>
    );

    return (
        <>
            {/* Header Section */}
            <section className='bg-[#FAEBD7] py-8 md:py-12'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4'>تفاصيل المنتج</h2>
                    <div className='flex justify-center items-center text-sm md:text-base'>
                        <span className='hover:text-primary transition-colors'><Link to="/">الرئيسية</Link></span>
                        <i className="ri-arrow-left-s-line mx-2"></i>
                        <span className='hover:text-primary transition-colors'><Link to="/shop">المتجر</Link></span>
                        <i className="ri-arrow-left-s-line mx-2"></i>
                        <span className='text-primary'>{singleProduct.name}</span>
                    </div>
                </div>
            </section>

            {/* Product Details Section */}
            <section className='py-8 md:py-12'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col lg:flex-row gap-8 md:gap-12'>
                        {/* Product Images */}
                        <div className='lg:w-1/2 w-full'>
                            <div className='relative bg-white rounded-lg shadow-md overflow-hidden p-4'>
                                {singleProduct.image && singleProduct.image.length > 0 ? (
                                    <>
                                        <div className='relative aspect-square w-full'>
                                            <img
                                                src={singleProduct.image[currentImageIndex]}
                                                alt={singleProduct.name}
                                                className='w-full h-full object-contain rounded-md'
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/500";
                                                    e.target.alt = "Image not found";
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Navigation Arrows */}
                                        {singleProduct.image.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors'
                                                >
                                                    <i className="ri-arrow-left-s-line text-xl"></i>
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors'
                                                >
                                                    <i className="ri-arrow-right-s-line text-xl"></i>
                                                </button>
                                            </>
                                        )}
                                        
                                        {/* Thumbnail Gallery */}
                                        {singleProduct.image.length > 1 && (
                                            <div className='flex justify-center mt-4 space-x-2 overflow-x-auto py-2'>
                                                {singleProduct.image.map((img, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentImageIndex(index)}
                                                        className={`w-16 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                                                    >
                                                        <img
                                                            src={img}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            className='w-full h-full object-cover'
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className='bg-gray-100 rounded-md aspect-square flex items-center justify-center'>
                                        <p className="text-gray-500">لا توجد صور متاحة</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className='lg:w-1/2 w-full' dir='rtl'>
                            <div className='bg-white rounded-lg shadow-md p-6'>
                                <h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>{singleProduct.name}</h3>
{/*                                 
                                <div className="flex items-center mb-4">
                                    <RatingStars rating={singleProduct.rating || 0} />
                                    <span className="text-gray-500 text-sm mr-2">({productReviews.length} تقييمات)</span>
                                </div> */}
                                
                                <div className="mb-6">
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 inline-block mb-4">
                                        <p className="text-xl md:text-2xl font-semibold text-amber-600">
                                            {singleProduct.price} .ر.ع
                                            {singleProduct.oldPrice && (
                                                <s className="mr-2 text-gray-500 text-lg">.ر.ع {singleProduct.oldPrice}</s>
                                            )}
                                        </p>
                                    </div>
                                    
                                    
                                </div>
                                
                                <div className='mb-6'>
                                    <h4 className='text-lg font-bold text-gray-800 mb-2'>الوصف:</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {singleProduct.description}
                                    </p>
                                </div>
                                
                                <div className='grid grid-cols-2 gap-4 mb-6'>
                                    <div>
                                        <h4 className='text-sm font-semibold text-gray-500'>الفئة:</h4>
                                        <p className="text-gray-800 font-medium">{singleProduct.category}</p>
                                    </div>
                                    {/* <div>
                                        <h4 className='text-sm font-semibold text-gray-500'>العلامة التجارية:</h4>
                                        <p className="text-gray-800 font-medium">{singleProduct.brand || 'غير محدد'}</p>
                                    </div> */}
                                </div>
                                
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(singleProduct);
                                    }}
                                    className='w-full md:w-auto px-8 py-3 bg-[#d3ae27] hover:bg-[#c19e22] text-white rounded-md font-medium transition-colors shadow-md'
                                >
                                    إضافة إلى السلة
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className='py-8 md:py-12 bg-gray-50' dir='rtl'>
                <div className='container mx-auto px-4'>
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <h3 className='text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-2'>تقييمات العملاء</h3>
                        <ReviewsCard productReviews={productReviews} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default SingleProduct;