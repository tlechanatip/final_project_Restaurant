import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function PromotionCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        post(route('promotions.store')); // ส่งข้อมูลไปที่เส้นทาง promotions (store)
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setData('image', file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function handleBack() {
        window.history.back();
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">สร้างโปรโมชั่นใหม่</h2>

            {/* ปุ่มย้อนกลับ */}
            <button
                onClick={handleBack}
                className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
                ⬅ ย้อนกลับ
            </button>

            {/* Responsive Layout */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* แสดงตัวอย่างภาพ (อยู่บนมือถือ, ซ้ายบน Desktop) */}
                <div className="w-full md:w-2/3 flex justify-center">
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
                <form onSubmit={handleSubmit} className="w-full md:w-1/3 space-y-4" encType="multipart/form-data">
                    {/* ชื่อโปรโมชั่น */}
                    <input
                        type="text"
                        placeholder="ชื่อโปรโมชั่น"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.title && <div className="text-red-500">{errors.title}</div>}

                    {/* อัปโหลดรูปภาพ */}
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded"
                    />

                    {errors.image && <div className="text-red-500">{errors.image}</div>}

                    {/* ปุ่มบันทึก */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
                    >
                        {processing ? 'กำลังบันทึก...' : 'บันทึกโปรโมชั่น'}
                    </button>
                </form>
            </div>
        </div>
    );
}
