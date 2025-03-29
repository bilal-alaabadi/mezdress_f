import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpeg";
import img4 from "../../assets/4.jpeg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";
import img7 from "../../assets/7.jpeg";
import img8 from "../../assets/8.jpeg";
import img9 from "../../assets/9.jpeg";
import img10 from "../../assets/10.jpg";
import img11 from "../../assets/images (11).jpg";

const cards = [
    { id: 1, image: img1, trend: '', title: 'مصار' },
    { id: 2, image: img2, trend: '', title: 'كمه' }, // تأكد من تطابق الأسماء مع الفئات في ShopPage
    { id: 3, image: img3, trend: '', title: 'نظارات' },
    { id: 4, image: img4, trend: '', title: 'ساعات' },
    { id: 5, image: img5, trend: '', title: 'أقمشة' },
    { id: 6, image: img6, trend: '', title: 'خواتم' },
    { id: 7, image: img7, trend: '', title: 'عطور' },
    { id: 8, image: img8, trend: '', title: 'أحذية' },
    { id: 9, image: img9, trend: '', title: 'بوكسات الهدايا' },
    { id: 10, image: img10, trend: '', title: 'عصي' },
    { id: 11, image: img11, trend: '', title: 'محافظ' },
];

const HeroSection = () => {
    return (
        <section className='section__container grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
            {cards.map((card) => (
                <Link 
                    to={`/Shop?category=${encodeURIComponent(card.title)}`} // إضافة معامل الفئة
                    key={card.id}
                >
                    <div className='hero__card relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center p-2 sm:p-4 cursor-pointer'>
                        <img 
                            src={card.image} 
                            alt={card.title} 
                            className='w-full h-32 sm:h-48 object-cover transform hover:scale-105 transition-transform duration-300'
                        />
                        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent text-white p-2 sm:p-6'>
                            <p className='text-xs sm:text-sm font-semibold text-gray-300'>{card.trend}</p>
                            <h4 className='text-lg sm:text-2xl font-bold mt-1 sm:mt-2'>{card.title}</h4>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
};

export default HeroSection;