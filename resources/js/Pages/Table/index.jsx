import Navbar from '@/Components/์์Navbar';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ tables, auth }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
    });
    const [confirmationData, setConfirmationData] = useState(null);
    const { errors } = usePage().props;

    const openPopup = (table) => {
        setSelectedTable(table);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setIsConfirmOpen(false);
        setSelectedTable(null);
        setFormData({ name: '', phone: '', date: '', time: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedTable) return;

        const reservationData = {
            table_id: selectedTable.id,
            customer_name: formData.name,
            customer_phone: formData.phone,
            reservation_time: `${formData.date} ${formData.time}`,
            amount: 100,
            payment_method: 'Credit Card',
        };

        setConfirmationData(reservationData);
        setIsConfirmOpen(true);
        setIsOpen(false); // ปิดฟอร์มจอง
    };

    const confirmReservation = () => {
        if (!confirmationData) return;

        router.post('/tables', confirmationData, {
            onSuccess: () => {
                alert('การจองโต๊ะเสร็จสิ้น!');
                closePopup();
                setIsConfirmOpen(false);
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <>
            <div
                className="fixed inset-0 h-screen w-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/storage/image_welcome/m1.jpg)',
                }}
            ></div>
            <Navbar auth={auth} />
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
                <div className="w-full max-w-6xl">
                    {errors?.error && (
                        <div className="mb-4 rounded-md bg-red-100 p-4 text-red-600">
                            {errors.error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {tables.map((table) => (
                            <div
                                key={table.id}
                                className="transform overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:scale-105"
                            >
                                <div className="flex bg-gray-100">
                                    <div className="w-1/3">
                                        {table.image_table ? (
                                            <img
                                                src={`/storage/${table.image_table}`}
                                                alt={table.name}
                                                className="h-full w-full rounded-l-xl object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-600">
                                                No Photo
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-2/3 bg-white p-6">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            โต๊ะ: {table.name}
                                        </h2>
                                        <p className="text-gray-600">
                                            ที่นั่ง: {table.seats}
                                        </p>
                                        <p className="text-gray-600">
                                            สถานะ: {table.status}
                                        </p>

                                        {table.status !== 'reserved' ? (
                                            <button
                                                onClick={() => openPopup(table)}
                                                className="mt-4 w-full rounded-lg bg-yellow-500 px-6 py-3 text-white shadow-md hover:bg-yellow-600"
                                            >
                                                จองโต๊ะ
                                            </button>
                                        ) : (
                                            <p className="mt-4 font-semibold text-red-500">
                                                ยังไม่ว่าง
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Popup */}
                {isOpen && selectedTable && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                Book Table: {selectedTable.name}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
                                >
                                    Confirm Booking
                                </button>
                            </form>

                            <button
                                onClick={closePopup}
                                className="mt-4 w-full rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Confirmation Popup */}
                {isConfirmOpen && confirmationData && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                Confirm Your Booking
                            </h2>

                            <div className="mb-4">
                                <p>
                                    <strong>Name:</strong>{' '}
                                    {confirmationData.customer_name}
                                </p>
                                <p>
                                    <strong>Phone:</strong>{' '}
                                    {confirmationData.customer_phone}
                                </p>
                                <p>
                                    <strong>Time:</strong>{' '}
                                    {confirmationData.reservation_time}
                                </p>
                                <p>
                                    <strong>จ่ายเงิน:</strong>
                                    <img src='storage\images\QR_code.svg' alt="" />
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={confirmReservation}
                                    className="w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => setIsConfirmOpen(false)}
                                    className="w-full rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
