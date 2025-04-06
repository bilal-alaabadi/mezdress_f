import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../../assets/msr.png";
import img2 from "../../assets/Screenshot 2025-04-04 114617.png";
import img3 from "../../assets/3.jpeg";
import img4 from "../../assets/4.jpeg";
import img5 from "../../assets/fabric-textured-layers-background (1).jpg";
import img6 from "../../assets/rang.png";
import img7 from "../../assets/7.jpeg";
import img8 from "../../assets/8.jpeg";
import img9 from "../../assets/High-resolution stock photo of a Gift box Oman; high angle perspective with contrasting chiaroscuro lighting, showing strong contrasts and deep shadows; professional quality, elevated view, commercial style.jpg";
import img10 from "../../assets/stack.png";
import img11 from "../../assets/Wallet depicted with chiaroscuro lighting, smooth gradient transitions, strong contrasts, and deep shadows, seamless color blending.jpg";

const cards = [
    { id: 1, image: img1, trend: '', title: 'مصار' },
    { id: 2, image: img2, trend: '', title: 'كمه' }, // تأكد من تطابق الأسماء مع الفئات في ShopPage
    { id: 3, image: img9, trend: '', title: 'بوكسات الهدايا' },
    { id: 4, image: img5, trend: '', title: 'أقمشة' },
    { id: 5, image: img10, trend: '', title: 'عصي' },
    { id: 6, image: img3, trend: '', title: 'نظارات' },
    { id: 7, image: img4, trend: '', title: 'ساعات' },
    { id: 8, image: img6, trend: '', title: 'خواتم' },
    { id: 9, image: img7, trend: '', title: 'عطور' },
    { id: 10, image: img8, trend: '', title: 'أحذية' },
    { id: 11, image: img11, trend: '', title: 'محافظ' },
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