import { Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PromotionIndex({ promotions }) {
    const { delete: deletePromotion } = useForm();

    const handleDelete = (id) => {
        if (confirm('คุณแน่ใจว่าจะลบโปรโมชั่นนี้?')) {
            deletePromotion(`/promotions/${id}`, {
                method: 'delete',
                onSuccess: () => {
                    alert('ลบโปรโมชั่นสำเร็จ');
                    // ทำการรีเฟรชหน้าใหม่หรือเอาข้อมูลโปรโมชั่นใหม่
                },
            });
        }
    };

    return (
        <AuthenticatedLayout>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">รายการโปรโมชั่น</h1>

            {/* ปุ่มสร้างโปรโมชั่น */}
            <div className="mb-4">
                <Link
                    href="/promotions/create"
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                    สร้างโปรโมชั่นใหม่
                </Link>
            </div>

            {/* แสดงรายการโปรโมชั่น */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {promotions.map((promotion) => (
                    <div key={promotion.id} className="border p-4 rounded-lg shadow-md">
                        {/* แสดงภาพโปรโมชั่น */}
                        <div className="w-full h-40 bg-gray-300 mb-4 flex items-center justify-center">
                            {promotion.image ? (
                                <img
                                    src={`/storage/${promotion.image}`}
                                    alt={promotion.title}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <span className="text-gray-600">ไม่มีรูปภาพ</span>
                            )}
                        </div>

                        {/* แสดงชื่อโปรโมชั่น */}
                        <h2 className="text-xl font-semibold mb-2">{promotion.title}</h2>

                        {/* ปุ่มแก้ไข */}
                        <div className="flex justify-between items-center">
                            <Link
                                href={`/promotions/${promotion.id}/edit`}
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                            >
                                แก้ไข
                            </Link>

                            {/* ปุ่มลบ */}
                            <button
                                onClick={() => handleDelete(promotion.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                ลบ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </AuthenticatedLayout>
    );
}
