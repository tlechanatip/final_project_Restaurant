import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ menufood }) {
    const { data, setData, post, progress, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null); // เก็บ URL ของไฟล์ภาพที่เลือก

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('image', data.image);

        post(route('menu.store'), {
            body: formData,
            onSuccess: () => {
                alert('เมนูถูกเพิ่มเรียบร้อยแล้ว!');
                reset(); // รีเซ็ตฟอร์ม
                setImagePreview(null); // รีเซ็ตตัวอย่างภาพ
            },
            onError: (error) => {
                console.error('เกิดข้อผิดพลาด:', error);
                alert('เกิดข้อผิดพลาด โปรดลองอีกครั้ง!');
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        setImagePreview(URL.createObjectURL(file)); // สร้าง URL สำหรับแสดงตัวอย่างภาพ
    };

    return (
        <AuthenticatedLayout>
            <div className='p-6'>
                <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-xl">
                    <h2 className="mb-4 text-xl font-bold">เพิ่มเมนูใหม่</h2>

                    {/* Responsive Layout */}
                    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                        {/* แสดงตัวอย่างภาพ (อยู่บนมือถือ, ซ้ายบน Desktop) */}
                        <div className="flex w-full justify-center md:w-2/5">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Image preview"
                                    className="h-48 w-full rounded-md border object-cover shadow"
                                />
                            ) : (
                                <div className="flex h-48 w-full items-center justify-center rounded-md border border-gray-300 text-gray-400">
                                    ไม่มีตัวอย่างภาพ
                                </div>
                            )}
                        </div>

                        {/* ฟอร์ม (อยู่ล่างมือถือ, ขวาบน Desktop) */}
                        <form
                            onSubmit={handleSubmit}
                            className="w-full space-y-4 md:w-3/5"
                            encType="multipart/form-data"
                        >
                            <input
                                type="text"
                                placeholder="ชื่อเมนู"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.name && (
                                <div className="text-red-500">
                                    {errors.name}
                                </div>
                            )}

                            <textarea
                                placeholder="รายละเอียด"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.description && (
                                <div className="text-red-500">
                                    {errors.description}
                                </div>
                            )}

                            <input
                                type="number"
                                placeholder="ราคา"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.price && (
                                <div className="text-red-500">
                                    {errors.price}
                                </div>
                            )}

                            <input
                                type="text"
                                placeholder="หมวดหมู่"
                                value={data.category}
                                onChange={(e) =>
                                    setData('category', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.category && (
                                <div className="text-red-500">
                                    {errors.category}
                                </div>
                            )}


                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full rounded border p-2"
                            />

                            {progress && (
                                <progress
                                    value={progress.percentage}
                                    max="100"
                                    className="w-full"
                                />
                            )}

                            <button
                                type="submit"
                                className="w-full rounded bg-yellow-500 py-2 text-white hover:bg-yellow-600"
                            >
                                เพิ่มเมนู
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
