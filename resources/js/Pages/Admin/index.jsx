import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ menufood, auth }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // ดึงประเภทอาหารที่ไม่ซ้ำกัน
    const categories = [
        ...new Set(menufood.map((menu) => menu.category || 'No category')),
    ];

    // ฟิลเตอร์เมนูอาหาร
    const filteredMenu = menufood.filter(
        (menu) =>
            (menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (menu.category &&
                    menu.category.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (selectedCategory === '' || menu.category === selectedCategory),
    );

    const handleDelete = (menu_id) => {
        if (confirm('Are you sure you want to delete this menu?')) {
            router.delete(`/admin/${menu_id}`);
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="relative flex min-h-screen flex-col">
                {/* 🔹 Content */}
                <div className="relative z-10 mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
                    <h2 className="animate-pulse bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 bg-clip-text p-4 text-center text-4xl font-extrabold tracking-wider text-transparent drop-shadow-lg">
                        🍽️ เมนู 🍽️
                    </h2>

                    {/* 🔎 Search Bar */}
                    <div className="z-10 mb-6 flex justify-center">
                        <input
                            type="text"
                            placeholder="ค้นหาเมนูอาหาร..."
                            className="w-full max-w-md rounded-md border px-4 py-2 text-gray-700 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* 🔹 Category Filter */}
                    <div className="mb-6 flex flex-wrap justify-center gap-2">
                        <button
                            className={`px-4 py-2 rounded-md ${
                                selectedCategory === ''
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                            onClick={() => setSelectedCategory('')}
                        >
                            ทั้งหมด
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-md ${
                                    selectedCategory === category
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* 🔹 Grid Menu */}
                    <div className="relative z-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {filteredMenu.length > 0 ? (
                            filteredMenu.map((menu) => (
                                <div
                                    key={menu.id}
                                    className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
                                >
                                    <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-white p-3">
                                        {menu.image ? (
                                            <img
                                                src={`/storage/${menu.image}`}
                                                alt={menu.name}
                                                className="h-full w-full rounded-md object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center rounded-md bg-white text-gray-500">
                                                ไม่มีรูปภาพ
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 flex flex-col justify-between h-full">
                                        <div>
                                            <h3 className="min-h-5 text-lg font-semibold text-gray-700">
                                                {menu.name}
                                            </h3>
                                            <p className="min-h-6">
                                                {menu.category || 'No category'}
                                            </p>
                                            <p className="mt-2 min-h-8 text-sm text-gray-500">
                                                {menu.description ||
                                                    'No description available'}
                                            </p>

                                            <p className="mt-1 text-xl font-bold text-gray-900">
                                                ฿{menu.price}
                                            </p>

                                            <hr />
                                            {/* 🔹 ปุ่มแก้ไข & ลบ */}
                                            <div className="mt-1 flex flex-col">
                                                <button
                                                    className="mt-3 w-full rounded-md bg-yellow-400 px-4 py-2 text-center font-bold text-white shadow-md hover:bg-yellow-500"
                                                    onClick={() =>
                                                        router.get(
                                                            `/admin/edit/${menu.id}`,
                                                        )
                                                    }
                                                >
                                                    ✏️ แก้ไข
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(menu.id)
                                                    }
                                                    className="mt-3 w-full rounded-md bg-red-400 px-4 py-2 text-center font-bold text-white shadow-md hover:bg-red-500"
                                                >
                                                    ลบ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
                                ไม่พบเมนูที่ค้นหา
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
