import { useState } from "react";

export default function Index({ tables }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [formData, setFormData] = useState({ name: "", phone: "", date: "", time: "", image: null });
    const [newTableData, setNewTableData] = useState({ name: "", seats: "", status: "" });
    const [confirmOpen, setConfirmOpen] = useState(false);

    // เปิด Popup สำหรับจองโต๊ะ
    const openPopup = (table) => {
        setSelectedTable(table);
        setIsOpen(true);
    };

    // ปิด Popup
    const closePopup = () => {
        setIsOpen(false);
        setSelectedTable(null);
        setConfirmOpen(false);
    };

    // ฟังก์ชันจัดการการเปลี่ยนแปลงฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData) {
            setFormData({ ...formData, [name]: value });
        } else {
            setNewTableData({ ...newTableData, [name]: value });
        }
    };

    // ฟังก์ชันเพิ่มโต๊ะใหม่
    const handleAddTable = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/tables", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(newTableData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Table Added!");
                setNewTableData({ name: "", seats: "", status: "" }); // รีเซ็ตฟอร์ม
            } else {
                alert(data.error || "Failed to add table.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    // ฟังก์ชันลบโต๊ะ
    const handleDeleteTable = async (tableId) => {
        if (window.confirm("Are you sure you want to delete this table?")) {
            try {
                const response = await fetch(`/tables/${tableId}`, {
                    method: "DELETE",
                    headers: {
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
                    },
                });

                if (response.ok) {
                    alert("Table deleted!");
                } else {
                    alert("Failed to delete table.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong!");
            }
        }
    };

    // ฟังก์ชันจองโต๊ะ
    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservationData = {
            table_id: selectedTable.id,
            customer_name: formData.name,
            customer_phone: formData.phone,
            reservation_time: `${formData.date} ${formData.time}`,
            amount: 100, // เปลี่ยนตามต้องการ
            payment_method: "Credit Card"
        };

        try {
            const response = await fetch("/tables/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(reservationData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Booking Confirmed!");
                closePopup(); // ปิด popup
            } else {
                alert(data.error || "Booking failed!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-6xl">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Table Booking</h1>

                {/* ฟอร์มเพิ่มโต๊ะ */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add New Table</h2>
                    <form onSubmit={handleAddTable}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Table Name</label>
                            <input type="text" name="name" value={newTableData.name} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Seats</label>
                            <input type="number" name="seats" value={newTableData.seats} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Status</label>
                            <select name="status" value={newTableData.status} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
                                <option value="">Select Status</option>
                                <option value="Available">Available</option>
                                <option value="Booked">Booked</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                            Add Table
                        </button>
                    </form>
                </div>

                {/* แสดงรายชื่อโต๊ะที่มี */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tables.map((table) => (
                        <div key={table.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <div className="flex bg-gray-100">
                                <div className="w-1/3">
                                    {table.image_table ? (
                                        <img
                                            src={`/storage/${table.image_table}`}
                                            alt={table.name}
                                            className="h-full w-full object-cover rounded-l-xl"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-600">
                                            No Photo
                                        </div>
                                    )}
                                </div>
                                <div className="w-2/3 p-6 bg-white">
                                    <h2 className="text-xl font-semibold text-gray-900">Table: {table.name}</h2>
                                    <p className="text-gray-600">Seats: {table.seats}</p>
                                    <p className="text-gray-600">Status: {table.status}</p>
                                    <button
                                        onClick={() => openPopup(table)}
                                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full shadow-md"
                                    >
                                        Book Now
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTable(table.id)}
                                        className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full shadow-md"
                                    >
                                        Delete Table
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup สำหรับจองโต๊ะ */}
            {isOpen && selectedTable && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book Table: {selectedTable.name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Phone</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Date</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Time</label>
                                <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                            </div>
                            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                                Confirm Booking
                            </button>
                        </form>
                        <button onClick={closePopup} className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {confirmOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Confirm Your Booking</h2>
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>Date:</strong> {formData.date}</p>
                        <p><strong>Time:</strong> {formData.time}</p>
                        <div className="mt-4 flex justify-center">
                            <img src={formData.image} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
                        </div>
                        <button
                        className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700">
                            Confirm
                        </button>
                        <button onClick={() => setConfirmOpen(false)} className="w-full bg-gray-600 text-white py-2 mt-2 rounded-lg hover:bg-gray-700">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
