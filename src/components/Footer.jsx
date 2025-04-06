import React from 'react';
import { FaInstagram, FaTwitter, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* قسم ABOUT IVY */}
          <div className="footer__col">
            <h4 className="text-lg font-bold text-gray-800 mb-4">عن المتجر</h4>
            <ul className="space-y-2">
              {/* <li><a href="#" className="text-gray-600 hover:text-primary transition">من نحن</a></li> */}
              <li><a href="#" className="text-gray-600 hover:text-primary transition">المتجر</a></li>
            </ul>
          </div>
          
          {/* قسم LEGAL */}
          <div className="footer__col">
            <h4 className="text-lg font-bold text-gray-800 mb-4">الشروط والأحكام</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition">سياسة الإرجاع</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition">شروط الخصوصية</a></li>
            </ul>
          </div>
          
          {/* قسم SOCIAL */}
          <div className="footer__col">
            <h4 className="text-lg font-bold text-gray-800 mb-4">وسائل التواصل</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/genuine__man/following/" className="text-gray-600 hover:text-primary transition">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=96877401491&text&type=phone_number&app_absent=0" className="text-gray-600 hover:text-primary transition">
                <FaWhatsapp className="text-xl" />
              </a>
              {/* <a href="#" className="text-gray-600 hover:text-primary transition">
                <FaFacebookF className="text-xl" />
              </a> */}
            </div>
          </div>
        </div>
        
        {/* حقوق النشر */}
        <div className="border-t border-gray-200 pt-5 text-center text-gray-500">
            <p>تم التطوير من قبل شركة  <a href="https://www.royasow.shop/?fbclid=PAZXh0bgNhZW0CMTEAAaYTcIg4_sRbdjE3amvbI83W5Q4NOvdbIjEIaiT4MZ-HXH2O1_MxVVeaoEc_aem_eOjZi6aO7vV9S3ervc71QQ">رؤية</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;