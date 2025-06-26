import React, { useState } from 'react';
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi';
import { formatDate } from '../../../../utils/formateDate';
import UpdateOrderModal from './UpdateOrderModal';
import html2pdf from 'html2pdf.js';

const ManageOrders = () => {
    const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewOrder, setViewOrder] = useState(null);
    const [deleteOrder] = useDeleteOrderMutation();

    // const handleEditOrder = (order) => {
    //     setSelectedOrder(order);
    //     setIsModalOpen(true);
    // };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleDeleteOder = async (orderId) => {
        try {
            await deleteOrder(orderId).unwrap();
            alert("تم حذف الطلب بنجاح");
            refetch();
        } catch (error) {
            console.error("فشل حذف الطلب:", error);
        }
    };

    const handleViewOrder = (order) => {
        setViewOrder(order);
    };

    const handleCloseViewModal = () => {
        setViewOrder(null);
    };

    const handlePrintOrder = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById('order-details');
        const options = {
            margin: [10, 10],
            filename: `طلب_${viewOrder._id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().from(element).set(options).save();
    };

    const formatPrice = (price) => {
        return (parseFloat(price) || 0).toFixed(2);
    };

    if (isLoading) return <div className="p-4 text-center">جار التحميل...</div>;
    if (error) return <div className="p-4 text-center text-red-500">لا توجد طلبات</div>;

    return (
        <div className='section__container p-4 md:p-6' dir='rtl'>
            <h2 className='text-xl md:text-2xl font-semibold mb-4'>إدارة الطلبات</h2>
            
            <div className="overflow-x-auto">
                <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='py-3 px-2 md:px-4 border-b text-right'>رقم الطلب</th>
                            <th className='py-3 px-2 md:px-4 border-b text-right'>العميل</th>
                            <th className='py-3 px-2 md:px-4 border-b text-right'>التاريخ</th>
                            <th className='py-3 px-2 md:px-4 border-b text-right'>الإجراءات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders?.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                    <td className='py-3 px-2 md:px-4 border-b'>{order?.orderId || '--'}</td>
                                    <td className='py-3 px-2 md:px-4 border-b'>{order?.email || 'غير محدد'}</td>
                                    <td className='py-3 px-2 md:px-4 border-b'>{formatDate(order?.updatedAt)}</td>
                                    <td className='py-3 px-2 md:px-4 border-b'>
                                        <div className="flex flex-wrap gap-2 justify-end">
                                            <button
                                                className="text-blue-500 hover:underline text-sm md:text-base"
                                                onClick={() => handleViewOrder(order)}
                                            >
                                                عرض
                                            </button>
                                            {/* <button
                                                className="text-green-500 hover:underline text-sm md:text-base"
                                                onClick={() => handleEditOrder(order)}
                                            >
                                                تعديل
                                            </button> */}
                                            <button
                                                className="text-red-500 hover:underline text-sm md:text-base"
                                                onClick={() => handleDeleteOder(order?._id)}
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">
                                    لا توجد طلبات متاحة
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <UpdateOrderModal
                    order={selectedOrder}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}

            {viewOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
                    <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto print-modal" id="order-details" dir="rtl">
                        <style>
                            {`
                                @media print {
                                    body * {
                                        visibility: hidden;
                                    }
                                    .print-modal, .print-modal * {
                                        visibility: visible;
                                    }
                                    .print-modal {
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        width: 100%;
                                        max-width: 100%;
                                        box-shadow: none;
                                        border: none;
                                        padding: 20px;
                                    }
                                    .print-modal button {
                                        display: none;
                                    }
                                }
                            `}
                        </style>
                        <h2 className="text-lg md:text-xl font-semibold mb-4">تفاصيل الطلب #{viewOrder.orderId}</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-md">
                                <h3 className="font-medium text-base md:text-lg mb-2">معلومات العميل</h3>
                                <div className="space-y-2 text-sm md:text-base">
                                    <p><strong>الاسم:</strong> {viewOrder.customerName || 'غير محدد'}</p>
                                    <p><strong>البريد الإلكتروني:</strong> {viewOrder.email || 'غير محدد'}</p>
                                    <p><strong>رقم الهاتف:</strong> {viewOrder.customerPhone || 'غير محدد'}</p>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-md">
                                <h3 className="font-medium text-base md:text-lg mb-2">معلومات التوصيل</h3>
                                <div className="space-y-2 text-sm md:text-base">
                                    <p><strong>الولاية:</strong> {viewOrder.wilayat || 'غير محدد'}</p>
                                    <p><strong>تاريخ الطلب:</strong> {formatDate(viewOrder.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="font-medium text-base md:text-lg mb-2">المنتجات المطلوبة</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 text-right">المنتج</th>
                                            <th className="py-2 px-4 text-right">الكمية</th>
                                            <th className="py-2 px-4 text-right">سعر الوحدة</th>
                                            <th className="py-2 px-4 text-right">المجموع</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewOrder.products?.map((product, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="py-3 px-4">
                                                    <div>
                                                        <p className="font-medium">{product.name || 'منتج غير محدد'}</p>
                                                        {product.selectedSize && (
                                                            <p className="text-xs text-gray-500">الحجم: {product.selectedSize}</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">{product.quantity || 0}</td>
                                                <td className="py-3 px-4">{formatPrice(product.price)} ر.ع</td>
                                                <td className="py-3 px-4 font-medium">
                                                    {formatPrice((product.price || 0) * (product.quantity || 0))} ر.ع
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center border-b pb-2 mb-2">
                                <span>الإجمالي الجزئي:</span>
                                <span>{formatPrice(viewOrder.amount - 2)} ر.ع</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2 mb-2">
                                <span>رسوم الشحن:</span>
                                <span>2.00 ر.ع</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="font-bold">الإجمالي النهائي:</span>
                                <span className="font-bold text-lg">{formatPrice(viewOrder.amount)} ر.ع</span>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3 justify-end">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm md:text-base"
                                onClick={handleCloseViewModal}
                            >
                                إغلاق
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm md:text-base"
                                onClick={handlePrintOrder}
                            >
                                طباعة الفاتورة
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm md:text-base"
                                onClick={handleDownloadPDF}
                            >
                                تحميل PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;