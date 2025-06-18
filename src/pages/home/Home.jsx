import React from 'react';
import Banner from './Banner';
import TrendingProducts from '../shop/TrendingProducts';
import HeroSection from './HeroSection';
import { FaWhatsapp } from 'react-icons/fa'; // استيراد أيقونة الواتساب

const Home = () => {
  // رقم الهاتف أو رابط الدردشة على الواتساب
  const whatsappNumber = "96894300313"; // استبدل برقم الهاتف المطلوب
  const whatsappMessage = "مرحباً، أريد الاستفسار عن المنتجات"; // الرسالة الافتراضية
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Banner/>
      <HeroSection/>
      <TrendingProducts/>
      
      {/* زر الواتساب العائم - الآن على اليمين */}
      <div className="fixed bottom-6 right-6 z-50">  {/* تغيير من left-6 إلى right-6 */}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
          style={{ width: '60px', height: '60px' }}
        >
          <FaWhatsapp size={30} />
        </a>
      </div>
    </>
  );
} 

export default Home;