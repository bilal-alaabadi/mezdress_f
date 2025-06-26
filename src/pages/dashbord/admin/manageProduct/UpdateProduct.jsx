import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useFetchProductByIdQuery, useUpdateProductMutation} from '../../../../redux/features/products/productsApi'
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';

const categories = [
    { label: 'الكل', value: 'الكل' },
    { label: 'نظارات', value: 'نظارات' },
    { label: 'محافظ', value: 'محافظ' },
    { label: 'ساعات', value: 'ساعات' },
    { label: 'غتر', value: 'غتر' },
    { label: 'اقلام', value: 'اقلام' },
    { label: 'بوكسات الشهر', value: 'بوكسات الشهر' },
    { label: 'أقمشة', value: 'أقمشة'},
    { label: 'مسباح', value: 'مسباح'},
];

const genderTypes = [
    { label: 'رجالي', value: 'رجالي' },
    { label: 'نسائي', value: 'نسائي' },
];

const UpdateProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        oldPrice: '',
        description: '',
        image: '',
        gender: ''
    });

    const [showGenderField, setShowGenderField] = useState(false);
    const {data: productData, isLoading: isProductLoading, error: fetchError, refetch} = useFetchProductByIdQuery(id);
    const [newImage, setNewImage] = useState(null);
    const {name, category, description, image: imageURL, price, oldPrice, gender} = productData?.product || {};

    const [updateProduct, {isLoading: isUpdating, error: updateError}] = useUpdateProductMutation();

    useEffect(() => {
        if(productData){
            setProduct({
                name: name || '',
                category: category || '',
                price: price || '',
                oldPrice: oldPrice || '',
                description: description || '',
                image: imageURL || '',
                gender: gender || ''
            });
            setShowGenderField(category === 'نظارات' || category === 'ساعات');
        }
    }, [productData]);

    useEffect(() => {
        setShowGenderField(product.category === 'نظارات' || product.category === 'ساعات');
        if (!(product.category === 'نظارات' || product.category === 'ساعات')) {
            setProduct(prev => ({ ...prev, gender: '' }));
        }
    }, [product.category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleImageChange = (image) => {
        setNewImage(image);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من الحقول المطلوبة
    const requiredFields = {
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description
    };
    
    if (product.category === 'نظارات' || product.category === 'ساعات') {
        requiredFields.gender = product.gender;
    }
    
    if (Object.values(requiredFields).some(field => !field)) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('oldPrice', product.oldPrice || ''); // تأكد من إرسال القيمة حتى لو كانت فارغة
    formData.append('description', product.description);
    if (product.gender) formData.append('gender', product.gender);
    if(newImage) formData.append('image', newImage);
    formData.append('author', user._id);

    // Debug: عرض بيانات FormData قبل الإرسال
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const result = await updateProduct({ 
            id: id, 
            body: formData
        }).unwrap();
        
        console.log('نتيجة التحديث:', result); // Debug
        alert('تم تحديث المنتج بنجاح');
        await refetch();
        navigate("/dashboard/manage-products");
    } catch (error) {
        console.error('فشل تحديث المنتج:', error);
        if(error.status === 401) {
            alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
            navigate('/login');
        } else {
            alert('فشل تحديث المنتج: ' + (error.data?.message || error.message));
        }
    }
};

    if(isProductLoading) return <div>جاري التحميل ...</div>;
    if(fetchError) return <div>خطأ في تحميل بيانات المنتج!</div>;

    return (
        <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>تحديث المنتج</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <TextInput
                    label="اسم المنتج"
                    name="name"
                    placeholder="أكتب اسم المنتج"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <SelectInput
                    label="صنف المنتج"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                    required
                />
                
                {showGenderField && (
                    <SelectInput
                        label="نوع المنتج"
                        name="gender"
                        value={product.gender}
                        onChange={handleChange}
                        options={genderTypes}
                        required={showGenderField}
                    />
                )}
                
                <TextInput
                    label="السعر الحالي"
                    name="price"
                    type="number"
                    placeholder="50"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <TextInput
                    label="السعر القديم (اختياري)"
                    name="oldPrice"
                    type="number"
                    placeholder="100"
                    value={product.oldPrice}
                    onChange={handleChange}
                />
                
                <UploadImage
                    name="image"
                    id="image"
                    value={newImage || product.image}
                    placeholder='صورة المنتج'
                    setImage={handleImageChange}
                />
                
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>الوصف</label>
                    <textarea 
                        name="description" 
                        id="description"
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={product.description}
                        placeholder='أكتب وصف المنتج'
                        onChange={handleChange}
                        required
                        rows={4}
                    ></textarea>
                </div>
                
                <div className='flex justify-end'>
                    <button 
                        type='submit'
                        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50'
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'جاري التحديث...' : 'تحديث المنتج'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;