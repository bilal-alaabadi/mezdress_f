import React, { useState } from 'react';
import { useUpdateUerRoleMutation } from '../../../../redux/features/auth/authApi';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user.role);
    const [updateUerRole] = useUpdateUerRoleMutation();

    const handleUpdateRole = async () => {
        try {
            await updateUerRole({ userId: user?._id, role }).unwrap();
            alert('تم تحديث الدور بنجاح!');
            onRoleUpdate();
            onClose();
        } catch (error) {
            console.error("فشل في تحديث الدور", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 px-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4 text-center">تعديل دور المستخدم</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">الدور</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="user">مستخدم</option>
                        <option value="admin">مسؤول</option>
                    </select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={handleUpdateRole}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
                    >
                        حفظ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
