import React, { useState } from 'react';
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';

const UpdateOrderModal = ({order, isOpen, onClose}) => {
    const [status, setStatus] = useState(order?.status);
    const [updateOrderStatus, {isLoading, error}] = useUpdateOrderStatusMutation();

    const handleUpdateOrderStatus = async () => {
        try {
            await updateOrderStatus({id: order?._id, status}).unwrap();
            onClose();
        } catch (err) {
            console.error("فشل تحديث حالة الطلب:", err);
        }
    }

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80" dir="rtl">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">تحديث حالة الطلب</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="status">الحالة</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                    >
                        <option value="pending">قيد الانتظار</option>
                        <option value="processing">قيد التجهيز</option>
                        <option value="shipped">تم الشحن</option>
                        <option value="completed">مكتمل</option>
                    </select>
                </div>
                
                {error && <p className="text-red-500 mb-4">فشل تحديث الحالة.</p>}
                
                <div className="flex justify-end space-x-2 space-x-reverse">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={handleUpdateOrderStatus}
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {isLoading ? 'جار التحديث...' : 'تحديث'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateOrderModal;