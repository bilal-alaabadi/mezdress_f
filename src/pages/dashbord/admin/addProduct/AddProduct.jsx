import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';
import { useNavigate } from 'react-router-dom';

const categories = [
    { label: 'الكل', value: 'الكل' },
    { label: 'نظارات', value: 'نظارات' },
    { label: 'محافظ', value: 'محافظ' },
    { label: 'ساعات', value: 'ساعات' },
    { label: 'غتر', value: 'غتر' },
    { label: 'اقلام', value: 'اقلام' },
    { label: 'بوكسات الشهر', value: 'بوكسات الشهر' },
    { label: 'أقمشة', value: 'أقمشة'},
];



const AddProduct = () => {
    const { user } = useSelector((state) => state.auth);

    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        description: ''
    });
    const [image, setImage] = useState([]); // مصفوفة لحفظ روابط الصور

    const [AddProduct, { isLoading, error }] = useAddProductMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.category || !product.price || !product.description ||  image.length === 0) {
            alert('أملأ كل الحقول');
            return;
        }

        try {
            await AddProduct({ ...product, image, author: user?._id }).unwrap();
            alert('تمت أضافة المنتج بنجاح');
            setProduct({
                name: '',
                category: '',
                price: '',
                description: ''
            });
            setImage([]);
            navigate("/shop");
        } catch (error) {
            console.log("Failed to submit product", error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">أضافة منتج جديد</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    setImage={setImage}
                />
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>وصف المنتج</label>
                    <textarea
                        name="description"
                        id="description"
                        className='add-product-InputCSS'
                        value={product.description}
                        placeholder='Write a product description'
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <button type='submit' className='add-product-btn' disabled={isLoading}>
                        {isLoading ? "جاري الإضافة..." : "أضف منتج"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;