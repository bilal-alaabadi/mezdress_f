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
        description: '',
        image: '',
        gender: ''
    });

    const [showGenderField, setShowGenderField] = useState(false);
    const {data: productData, isLoading: isProductLoading, error: fetchError, refetch} = useFetchProductByIdQuery(id);
    const [newImage, setNewImage] = useState(null);
    const {name, category, description, image: imageURL, price, gender} = productData?.product || {};

    const [updateProduct, {isLoading: isUpdating, error: updateError}] = useUpdateProductMutation();

    useEffect(() => {
        if(productData){
            setProduct({
                name: name || '',
                category: category || '',
                price: price || '',
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
        
        // إذا كانت الفئة نظارات أو ساعات، نتحقق من وجود قيمة للنوع
        if (product.category === 'نظارات' || product.category === 'ساعات') {
            requiredFields.gender = product.gender;
        }
        
        // التحقق من أن جميع الحقول المطلوبة مملوءة
        if (Object.values(requiredFields).some(field => !field)) {
            alert('أملأ كل الحقول المطلوبة');
            return;
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('description', product.description);
        if (product.gender) formData.append('gender', product.gender);
        if(newImage) formData.append('image', newImage);
        formData.append('author', user._id);

        try {
            await updateProduct({ 
                id: id, 
                body: formData
            }).unwrap();
            
            alert('تم تحديث المنتج بنجاح');
            await refetch();
            navigate("/dashboard/manage-products");
        } catch (error) {
            console.error('Failed to update product:', error);
            if(error.status === 401) {
                alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
                navigate('/login');
            } else {
                alert('فشل تحديث المنتج: ' + (error.data?.message || error.message));
            }
        }
    };

    if(isProductLoading) return <div>تحميل ...</div>;
    if(fetchError) return <div>Error fetching product!...</div>;

    return (
        <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>تحديث المنتج </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <TextInput
                    label="أسم المنتج"
                    name="name"
                    placeholder="أكتب أسم المنتج"
                    value={product.name}
                    onChange={handleChange}
                />
                <SelectInput
                    label="صنف المنتج"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />
                
                {showGenderField && (
                    <SelectInput
                        label="نوع المنتج"
                        name="gender"
                        value={product.gender}
                        onChange={handleChange}
                        options={genderTypes}
                    />
                )}
                
                <TextInput
                    label="السعر"
                    name="price"
                    type="number"
                    placeholder="50"
                    value={product.price}
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
                        className='add-product-InputCSS'
                        value={product.description}
                        placeholder='أكتب وصف المنتج'
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <button 
                        type='submit'
                        className='add-product-btn'
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'جار التحديث...' : 'تحديث المنتج'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;