import React, { useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import timing from "../../assets/Bay.jpeg";
import timings from "../../assets/Screenshot 2025-04-10 182716.png";
import '../../../src/App';

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isPressed, setIsPressed] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const images = [timings, timing];

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    const goToNext = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleButtonPress = (direction) => {
        setIsPressed(true);
        if (direction === 'prev') {
            goToPrev();
        } else {
            goToNext();
        }
        setTimeout(() => setIsPressed(false), 200);
    };

    return (
        <div className="py-3 px-4 relative">
            <div className="text-right" dir='rtl'>
                {/* يمكن إضافة محتوى هنا إذا لزم الأمر */}
            </div>
            
            <div 
                className="mt-8 relative overflow-hidden banner-container"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
                onClick={() => setShowControls(!showControls)}
            >
                <SwitchTransition>
                    <CSSTransition
                        key={currentImage}
                        timeout={500}
                        classNames="fade"
                    >
                        <img
                            src={images[currentImage]}
                            alt="صورة البانر"
                            className="w-full h-auto object-contain max-w-[100%] mx-auto"
                            style={{ cursor: 'pointer' }}
                        />
                    </CSSTransition>
                </SwitchTransition>

                {/* أزرار التحكم مع تأثيرات الضغط - تظهر فقط عند showControls = true */}
                {showControls && (
                    <>
                        <button 
                            onClick={() => handleButtonPress('prev')}
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-200 ${isPressed ? 'scale-90' : 'scale-100'}`}
                        >
                            ←
                        </button>
                        <button 
                            onClick={() => handleButtonPress('next')}
                            className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-200 ${isPressed ? 'scale-90' : 'scale-100'}`}
                        >
                            →
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Banner;