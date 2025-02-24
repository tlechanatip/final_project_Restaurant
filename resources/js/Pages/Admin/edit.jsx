import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ menu }) {
    const { data, setData, put, processing, errors } = useForm({
        name: menu?.name || '',
        description: menu?.description || '',
        price: menu?.price || '',
        category: menu?.category || '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(menu.image ? `/storage/${menu.image}` : null);
    const [progress, setProgress] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.name || !data.description || !data.price || !data.category) {
            return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        if (data.image) {
            formData.append('image', data.image);
        }

        put(route('menu.update', menu.id), {
            data: formData,
            onProgress: (event) => {
                if (event.lengthComputable) {
                    setProgress({
                        percentage: (event.loaded / event.total) * 100,
                    });
                }
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // จำกัดขนาด 2MB
                alert("ขนาดไฟล์ใหญ่เกินไป! กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 2MB");
                return;
            }
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">แก้ไขเมนู</h2>

                {/* Responsive Layout */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* แสดงตัวอย่างภาพ (อยู่บนมือถือ, ซ้ายบน Desktop) */}
                    <div className="w-full md:w-2/5 flex justify-center">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Image preview"
                                className="w-full h-30 object-cover border rounded-md shadow"
                            />
                        ) : (
                            <div className="w-full h-48 border border-gray-300 flex items-center justify-center text-gray-400 rounded-md">
                                ไม่มีตัวอย่างภาพ
                            </div>
                        )}
                    </div>

                    {/* ฟอร์ม (อยู่ล่างมือถือ, ขวาบน Desktop) */}
                    <form onSubmit={handleSubmit} className="w-full md:w-3/5 space-y-4" encType="multipart/form-data">
                        <input
                            type="text"
                            placeholder="ชื่อเมนู"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}

                        <textarea
                            placeholder="รายละเอียด"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.description && <div className="text-red-500">{errors.description}</div>}

                        <input
                            type="number"
                            placeholder="ราคา"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.price && <div className="text-red-500">{errors.price}</div>}

                        <input
                            type="text"
                            placeholder="หมวดหมู่"
                            value={data.category}
                            onChange={(e) => setData("category", e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.category && <div className="text-red-500">{errors.category}</div>}



                        {progress && <progress value={progress.percentage} max="100" className="w-full" />}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
                        >
                            {processing ? 'กำลังอัปเดต...' : 'อัปเดตเมนู'}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
