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
                <div key={index} className='product__card group relative'>
                    {product.oldPrice && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                            خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </div>
                    )}
                    
                    <div className='relative'>
                        <Link to={`/shop/${product._id}`}>
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={product.image[0]}
                                    alt="product image"
                                    className='w-full h-full object-cover hover:scale-105 transition-all duration-300'
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/300";
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
                                className="bg-[#CEAE7A] p-1.5 text-white hover:bg-black rounded-full transition duration-300"
                            >
                                <i className="ri-shopping-cart-2-line"></i>
                            </button>
                        </div>
                    </div>

                    {/* product description */}
                    <div className='product__card__content text-center mt-4'>
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
                        {/* <RatingStars rating={product.rating} /> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCards;