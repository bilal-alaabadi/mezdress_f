import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';
import log from "../assets/ChatGPT_Image_Jul_6__2025__08_50_03_PM-removebg-preview.png"

const Navbar = () => {
    // User authentication
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    // Dropdown menus
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const handleDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen);

    // Mobile menu toggle
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // Admin dropdown menus
    const adminDropDownMenus = [
        { label: "لوحة التحكم", path: "/dashboard/admin" },
        { label: "تعديل الفستان", path: "/dashboard/manage-products" },
        { label: "إضافة فستان", path: "/dashboard/add-product" },
    ];

    // User dropdown menus
    const userDropDownMenus = [
        { label: "لوحة التحكم", path: "/dashboard" },
        { label: "الملف الشخصي", path: "/dashboard/profile" },
        { label: "المدفوعات", path: "/dashboard/payments" },
        { label: "الطلبات", path: "/dashboard/orders" },
    ];

    const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <header className='fixed-nav-bar w-full bg-white pb-16 pt-10'>
            <nav className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative'>
                {/* Mobile Menu Button (Hamburger Icon) */}
                <button
                    onClick={handleMobileMenuToggle}
                    className='sm:hidden text-gray-700 hover:text-primary focus:outline-none'
                >
                    <i className="ri-menu-line text-2xl"></i>
                </button>

                {/* Nav Links (Desktop) */}
                <ul className='hidden sm:flex gap-6 md:gap-8' dir='rtl'>
                    <li>
                        <Link to="" className='text-sm sm:text-base md:text-lg hover:text-primary transition-colors duration-300'>
                            الرئيسية
                        </Link>
                    </li>
                    <li>
                        <Link to="/shop" className='text-sm sm:text-base md:text-lg hover:text-primary transition-colors duration-300'>
                            الفساتين
                        </Link>
                    </li>
                </ul>

                {/* Logo (Centered) */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-20">
                    <Link to="/" className="inline-block">
                        <img 
                            src={log} 
                            alt="شعار رؤية" 
                            className="w-48 h-56 pt-6"  
                            loading="lazy" 
                        />
                    </Link>
                </div>
                {/* Nav Icons */}
                <div className='flex items-center gap-4 sm:gap-6'>
                <div className='text-sm sm:text-base md:text-lg hover:text-primary transition-colors duration-300'>
                    <Link to="/search">
                    البحث
                    </Link>
                </div>
                    {user ? (
                        <div className='relative'>
                            <img
                                onClick={handleDropDownToggle}
                                src={user?.profileImage || avatarImg}
                                alt="User Avatar"
                                className='size-8 rounded-full cursor-pointer'
                            />
                            {isDropDownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                    <ul className='space-y-2 p-2'>
                                        {dropdownMenus.map((menu, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={menu.path}
                                                    onClick={() => setIsDropDownOpen(false)}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg'
                                                >
                                                    {menu.label}
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg'
                                            >
                                                تسجيل الخروج
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className='hover:text-primary'>
                            <i className="ri-user-line text-lg"></i>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu (Links for Small Screens) */}
                {isMobileMenuOpen && (
                    <div className='sm:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40'>
                        <ul className='flex flex-col gap-4 p-4'>
                            <li>
                                <Link to="/" className='block text-sm hover:text-primary transition-colors duration-300'>
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop" className='block text-sm hover:text-primary transition-colors duration-300'>
                                    الفساتين
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;