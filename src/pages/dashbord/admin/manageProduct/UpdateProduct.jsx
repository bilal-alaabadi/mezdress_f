import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';

const categories = [
  { label: 'الكل', value: 'الكل' },
  { label: 'مصار', value: 'مصار' },
  { label: 'كمه', value: 'كمه' },
  { label: 'بوكسات الهدايا', value: 'بوكسات الهدايا' },
  { label: 'عصي', value: 'عصي' },
  { label: 'أقمشة', value: 'أقمشة' },
  { label: 'نظارات', value: 'نظارات' },
  { label: 'ساعات', value: 'ساعات' },
  { label: 'خواتم', value: 'خواتم' },
  { label: 'عطور', value: 'عطور' },
  { label: 'أحذية', value: 'أحذية' },
  { label: 'محافظ', value: 'محافظ' },
];

const kumaTypes = [
  { label: 'كمه خياطة اليد', value: 'كمه خياطة اليد' },
  { label: 'كمه ديواني', value: 'كمه ديواني' }
];

const kumaSizes = ['9.5', '9.75', '10', '10.25', '10.5', '10.75', '11', '11.25', '11.5', '11.75'];

const massarTypes = {
  smallPattern: {
    label: 'مصار بالنقشة الصغيرة',
    subTypes: [
      { label: 'مصار باشمينا', value: 'مصار باشمينا صغيرة' },
      { label: 'مصار سوبر تورمة', value: 'مصار سوبر تورمة صغيرة' },
      { label: 'مصار نص تورمة', value: 'مصار نص تورمة صغيرة' }
    ]
  },
  largePattern: {
    label: 'مصار بالنقشة الكبيرة',
    subTypes: [
      { label: 'مصار باشمينا', value: 'مصار باشمينا كبيرة' },
      { label: 'مصار سوبر تورمة', value: 'مصار سوبر تورمة كبيرة' },
      { label: 'مصار نص تورمة', value: 'مصار نص تورمة كبيرة' }
    ]
  }
};

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [product, setProduct] = useState({
    name: '',
    category: '',
    massarPatternType: '',
    massarSubType: '',
    kumaType: '',
    kumaSize: '',
    price: '',
    description: '',
    image: []
  });

  const { data: productData, isLoading: isProductLoading } = useFetchProductByIdQuery(id);
  const [newImages, setNewImages] = useState([]);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (productData?.product) {
      const { name, category, subCategory, price, description, image } = productData.product;
      
      let massarPatternType = '';
      let massarSubType = '';
      let kumaType = '';
      let kumaSize = '';

      if (category === 'مصار' && subCategory) {
        massarSubType = subCategory;
        massarPatternType = subCategory.includes('صغيرة') ? 'مصار بالنقشة الصغيرة' : 'مصار بالنقشة الكبيرة';
      } else if (category === 'كمه' && subCategory) {
        if (subCategory.includes('-')) {
          const [type, size] = subCategory.split('-');
          kumaType = type;
          kumaSize = size;
        } else {
          kumaType = subCategory;
        }
      }

      setProduct({
        name: name || '',
        category: category || '',
        massarPatternType,
        massarSubType,
        kumaType,
        kumaSize,
        price: price || '',
        description: description || '',
        image: image || []
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updates = { ...product, [name]: value };

    if (name === 'category') {
      updates.massarPatternType = '';
      updates.massarSubType = '';
      updates.kumaType = '';
      updates.kumaSize = '';
    }

    if (name === 'massarPatternType') {
      updates.massarSubType = '';
    }

    setProduct(updates);
  };

  const handleKumaTypeChange = (type) => {
    setProduct({
      ...product,
      kumaType: type,
      kumaSize: ''
    });
  };

  const handleKumaSizeChange = (size) => {
    setProduct({
      ...product,
      kumaSize: size
    });
  };

  const handleMassarPatternChange = (patternType) => {
    setProduct({
      ...product,
      massarPatternType: patternType,
      massarSubType: ''
    });
  };

  const handleMassarSubTypeChange = (subType) => {
    setProduct({
      ...product,
      massarSubType: subType
    });
  };

  const handleImageChange = (images) => {
    setNewImages(images);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = {
      name: 'اسم المنتج',
      category: 'الفئة',
      price: 'السعر',
      description: 'الوصف'
    };
  
    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !product[key])
      .map(([_, label]) => label);
  
    if (missingFields.length > 0 || (newImages.length === 0 && product.image.length === 0)) {
      alert(`الرجاء تعبئة الحقول التالية: ${missingFields.join('، ')}${(newImages.length === 0 && product.image.length === 0) ? ' وإضافة صورة' : ''}`);
      return;
    }
  
    if (product.category === 'كمه' && !product.kumaType) {
      alert('الرجاء اختيار نوع الكمه');
      return;
    }
  
    try {
      const productData = {
        name: product.name,
        category: product.category,
        ...(product.category === 'مصار' && { subCategory: product.massarSubType }),
        ...(product.category === 'كمه' && { 
          subCategory: product.kumaSize ? `${product.kumaType}-${product.kumaSize}` : product.kumaType 
        }),
        price: parseFloat(product.price),
        description: product.description,
        image: newImages.length > 0 ? newImages : product.image,
        author: user?._id
      };
  
      await updateProduct({ id, ...productData }).unwrap();
      alert('تم تحديث المنتج بنجاح');
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("فشل في تحديث المنتج:", error);
      if (error.status === 401) {
        alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
        navigate('/login');
      } else {
        alert(`حدث خطأ: ${error.data?.message || 'فشل في تحديث المنتج'}`);
      }
    }
  };

  if (isProductLoading) return <div className="text-center py-8">جاري التحميل...</div>;

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-right">تحديث المنتج</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="اسم المنتج"
          name="name"
          placeholder="مثال: أقراط ماسية"
          value={product.name}
          onChange={handleChange}
          required
        />
        
        <SelectInput
          label="الفئة"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
          required
        />
        
        {product.category === 'مصار' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                نوع نقشة المصار *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(massarTypes).map(([key, { label }]) => (
                  <label key={key} className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="massarPatternType"
                      value={label}
                      checked={product.massarPatternType === label}
                      onChange={() => handleMassarPatternChange(label)}
                      className="h-5 w-5 text-indigo-600"
                      required
                    />
                    <span className="block text-sm font-medium text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {product.massarPatternType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                  النوع الفرعي *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {massarTypes[
                    Object.keys(massarTypes).find(k => massarTypes[k].label === product.massarPatternType)
                  ].subTypes.map((subType) => (
                    <label key={subType.value} className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="massarSubType"
                        value={subType.value}
                        checked={product.massarSubType === subType.value}
                        onChange={() => handleMassarSubTypeChange(subType.value)}
                        className="h-5 w-5 text-indigo-600"
                        required
                      />
                      <span className="block text-sm font-medium text-gray-700">{subType.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {product.category === 'كمه' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                نوع الكمه *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kumaTypes.map((type) => (
                  <label key={type.value} className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="kumaType"
                      value={type.value}
                      checked={product.kumaType === type.value}
                      onChange={() => handleKumaTypeChange(type.value)}
                      className="h-5 w-5 text-indigo-600"
                      required
                    />
                    <span className="block text-sm font-medium text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {product.kumaType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                  مقاس الكمه
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {kumaSizes.map((size) => (
                    <label key={size} className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="kumaSize"
                        value={size}
                        checked={product.kumaSize === size}
                        onChange={() => handleKumaSizeChange(size)}
                        className="h-5 w-5 text-indigo-600"
                      />
                      <span className="block text-sm font-medium text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <TextInput
          label="السعر"
          name="price"
          type="number"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
        
        <UploadImage
          name="image"
          id="image"
          existingImages={product.image}
          setImage={handleImageChange}
          required={product.image.length === 0}
        />
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-right">
            الوصف *
          </label>
          <textarea
            name="description"
            id="description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4}
            value={product.description}
            placeholder="أدخل وصف المنتج هنا"
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/manage-products')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isUpdating}
          >
            {isUpdating ? "جاري التحديث..." : "تحديث المنتج"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;