import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function PromotionEdit({ promotion }) {
    const { data, setData, put, processing, errors } = useForm({
        title: promotion?.title || '',
        image: null, // ตั้งค่าเริ่มต้นเป็น null
    });

    const [imagePreview, setImagePreview] = useState(promotion.image ? `/storage/${promotion.image}` : null);
    const [progress, setProgress] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // ตรวจสอบว่า title ไม่ว่าง
        if (!data.title) {
            return alert('กรุณากรอกชื่อโปรโมชั่น');
        }

        const formData = new FormData();
        formData.append('title', data.title); // ส่งข้อมูล title

        // ส่งไฟล์ภาพถ้ามี
        if (data.image) {
            formData.append('image', data.image);
        }

        // ส่งข้อมูลไปที่ controller สำหรับการอัปเดต
        put(route('promotions.update', promotion.id), {
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
            // ตรวจสอบขนาดไฟล์
            if (file.size > 2 * 1024 * 1024) { // จำกัดขนาดไฟล์ไม่เกิน 2MB
                alert("ขนาดไฟล์ใหญ่เกินไป! กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 2MB");
                return;
            }

            setData('image', file); // เก็บข้อมูลไฟล์ที่เลือก
            setImagePreview(URL.createObjectURL(file)); // แสดงตัวอย่างภาพ
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">แก้ไขโปรโมชั่น</h2>

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
                        placeholder="ชื่อโปรโมชั่น"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.title && <div className="text-red-500">{errors.title}</div>}



                    {progress && <progress value={progress.percentage} max="100" className="w-full" />}

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
                    >
                        {processing ? 'กำลังอัปเดต...' : 'อัปเดตโปรโมชั่น'}
                    </button>
                </form>
            </div>
        </div>
    );
}
