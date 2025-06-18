import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../../assets/Asset 8.png";
import img2 from "../../assets/Asset 10.png";
import img3 from "../../assets/Asset 8.png";
import img4 from "../../assets/Asset 12.png";
import img5 from "../../assets/Asset 11.png";
import img6 from "../../assets/Asset 13.png";
import img7 from "../../assets/لايت1.png";


const cards = [
    { id: 1, image: img1, trend: '', title: 'نظارات' },
    { id: 2, image: img2, trend: '', title: 'محافظ' }, // تأكد من تطابق الأسماء مع الفئات في ShopPage
    { id: 3, image: img3, trend: '', title: ' ساعات' },
    { id: 4, image: img4, trend: '', title: 'غتر' },
    { id: 5, image: img5, trend: '', title: 'اقلام' },
    { id: 6, image: img6, trend: '', title: 'بوكسات الشهر' },
    { id: 7, image: img7, trend: '', title: 'أقمشة' },
    
];

const HeroSection = () => {
    return (
<section className='section__container grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
  {cards.map((card) => (
    <Link 
      to={`/Shop?category=${encodeURIComponent(card.title)}`}
      key={card.id}
      className='block aspect-square group'
    >
      <div className='hero__card relative w-full h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'>
        {/* الصورة مع تأثير التكبير */}
        <img 
          src={card.image} 
          alt={card.title} 
          className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        
        {/* طبقة التدرج اللوني مع النص في المنتصف السفلي */}
        <div className='absolute inset-0 flex flex-col justify-end'>
          <div className='bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 text-white text-center'>
            <p className='text-xs sm:text-sm font-semibold text-gray-300'>{card.trend}</p>
            <h4 className='text-lg sm:text-xl font-bold mt-1'>{card.title}</h4>
          </div>
        </div>
      </div>
    </Link>
  ))}
</section>
    );
};

export default HeroSection;