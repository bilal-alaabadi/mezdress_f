import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBaseUrl } from '../../utils/baseURL';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/features/cart/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [wilayat, setWilayat] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { products, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector(state => state.auth);
  const shippingFee = 2;

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomerPhone(value);
  };

  const createOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (products.length === 0) {
        throw new Error("لا توجد منتجات في السلة");
      }

      if (!customerName || !customerPhone || !wilayat) {
        throw new Error("الرجاء إدخال جميع المعلومات المطلوبة");
      }

      const orderData = {
        products: products.map(product => ({
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          image: Array.isArray(product.image) ? product.image[0] : product.image,
          ...(product.selectedSize && { selectedSize: product.selectedSize })
        })),
        customerName,
        customerPhone,
        wilayat,
        email: user?.email || 'no-email-provided@example.com', // Default email if not provided
        notes,
        amount: totalPrice + shippingFee,
        shippingFee
      };

      const response = await fetch(`${getBaseUrl()}/api/orders/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "فشل إنشاء الطلب");
      }

      const data = await response.json();
      
      // تفريغ السلة قبل الانتقال
      dispatch(clearCart());

      navigate('/success', {
        state: {
          order: data.order,
          products: orderData.products,
          customerName,
          customerPhone,
          wilayat,
          totalAmount: orderData.amount
        }
      });

    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* تفاصيل الفاتورة */}
      <div className="flex-1">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">تفاصيل الطلب</h1>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        
        <form onSubmit={createOrder} className="space-y-4 md:space-y-6" dir="rtl">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">الاسم الكامل *</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">رقم الهاتف *</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md"
                value={customerPhone}
                onChange={handlePhoneChange}
                pattern="[0-9]*"
                inputMode="numeric"
                minLength="8"
                maxLength="15"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">الولاية *</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={wilayat}
                onChange={(e) => setWilayat(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">ملاحظات (اختياري)</label>
              <textarea
                className="w-full p-2 border rounded-md"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#d8bb96] text-white px-6 py-3 rounded-md w-full"
            disabled={isSubmitting || products.length === 0}
          >
            {isSubmitting ? 'جارٍ تأكيد الطلب...' : 'تأكيد الطلب'}
          </button>
        </form>
      </div>

      {/* تفاصيل الطلب */}
      <div className="w-full md:w-1/3 p-4 md:p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800">ملخص الطلب</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <span className="text-gray-700">{product.name} × {product.quantity}</span>
                {product.selectedSize && (
                  <p className="text-sm text-gray-500">الحجم: {product.selectedSize}</p>
                )}
              </div>
              <span className="text-gray-900 font-medium">{(product.price * product.quantity).toFixed(2)} ر.ع.</span>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-gray-800">رسوم الشحن</span>
            <p className="text-gray-900">{shippingFee.toFixed(2)} ر.ع</p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-gray-800 font-semibold">الإجمالي</span>
            <p className="text-gray-900 font-bold">{(totalPrice + shippingFee).toFixed(2)} ر.ع</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;