import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCards = ({ products }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product, index) => (
                <div key={index} className='product__card'>
                    <div className='relative'>
                        <Link to={`/shop/${product._id}`}>
                            <div className="aspect-square overflow-hidden"> {/* جعل الصور مربعة الشكل */}
                                <img
                                    src={product.image[0]} // عرض الصورة الأولى من المصفوفة
                                    alt="product image"
                                    className='w-full h-full object-cover hover:scale-105 transition-all duration-300'
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/300"; // صورة بديلة في حالة الخطأ
                                        e.target.alt = "Image not found";
                                    }}
                                />
                            </div>
                        </Link>

                        <div className='hover:block absolute top-3 right-3'>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product);
                                }}
                                className="bg-[#d3ae27] p-1.5 text-white hover:bg-black rounded-full transition duration-300"
                            >
                                <i className="ri-shopping-cart-2-line"></i>
                            </button>
                        </div>
                    </div>

                    {/* product description */}
                    <div className='product__card__content text-center mt-4'>
                        <h4 className="text-lg font-semibold">{product.name}</h4>
                        <p className="text-primary mt-2">
                            {product.price} ر.ع
                            {product?.oldPrice && (
                                <s className="text-gray-500 ml-2">ر.ع{product?.oldPrice}</s>
                            )}
                        </p>
                        {/* <RatingStars rating={product.rating} /> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCards;