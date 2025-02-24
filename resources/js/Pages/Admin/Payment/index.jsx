import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Index() {
    const { customers } = usePage().props;

    const handleDelete = (id) => {
            if (confirm('ต้องการลบจริงๆหรอ?')) {
                router.delete(`/reservations/${id}`);
            }
        };
    console.log("ข้อมูลลูกค้าที่ได้รับ:", customers);

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-6">
                <Head title="รายการชำระเงิน" />
                <h2 className="mb-4 text-center text-2xl font-bold">
                    รายการจอง
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">
                                    ชื่อโต๊ะ
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    ชื่อลูกค้า
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    เบอร์โทรศัพท์
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    เวลาการจอง
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    สถานะการชำระเงิน
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    ลบ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length > 0 ? (
                                customers.map((customer, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="border border-gray-300 px-4 py-2">
                                            {customer.name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {customer.customer_name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {customer.customer_phone}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {customer.reservation_time}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {customer.status === 'completed' ? (
                                                <span className="rounded bg-green-500 px-2 py-1 text-white">
                                                    ชำระแล้ว
                                                </span>
                                            ) : (
                                                <span className="rounded bg-red-500 px-2 py-1 text-white">
                                                    ยังไม่ชำระ
                                                </span>
                                            )}
                                        </td>

                                        {/* ปุ่มลบ */}
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() =>
                                                handleDelete(customer.id)
                                            }
                                            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                        >
                                            ลบ
                                        </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="border border-gray-300 px-4 py-2 text-center"
                                    >
                                        ไม่มีข้อมูลการชำระเงิน
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
